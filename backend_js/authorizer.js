async function createToken(email, admin, donor, requester){
    const accessToken = await jwt.sign(
        {
          email: email,
          isAdmin: admin,
          isDonor: donor,
          isRequester: requester,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '5s'
        }
    );
    
    const refreshToken = await jwt.sign(
        {
          email: email,
          isAdmin: admin,
          isDonor: donor,
          isRequester: requester,
        },
        process.env.REFRESH_TOKEN_SECRET
      );

    await database.StoreToken(email, refreshToken);

    return(
        {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    )
}

async function verifyToken(token){
    return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
          if(err.name === 'TokenExpiredError'){
            console.log('expired');
            return(
                  {
                    access: false, 
                    reason: 'expired'
                  }
            );
          } 
          else {
            console.log('invalid token');
            return(
                {
                    access: false,
                    reason: 'invalid token'
                }
            );
          }
    
        } else {
          //console.log(user.email)
          //console.log(user.isAdmin)
          console.log('valid token');
          return(
            {
              access: true,
              email: user.email,
              admin: user.isAdmin,
              donor: user.isDonor,
              requester: user.isRequester,
            });
        }
    });
}

async function refreshToken(refreshToken){
      return await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async function(err, user){
        if(err) return({access:false});
        let email = user.email;
        let isAdmin = user.isAdmin;
        let isDonor = user.isDonor;
        let isRequester = user.isRequester;
        //second verify token is valid according to our database
        if(await database.ValidateToken(email, refreshToken)){
          //finally issue new access token
          console.log("refreshing token")
          const accessToken = await jwt.sign(
            {
              access: true,
              email: email,
              isAdmin: isAdmin,
              isDonor: isDonor,
              isRequester: isRequester,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: '20m'
            }
          );
          return({accessToken: accessToken})
        }
        return({access:false})
    });
}

async function removeToken(token){
    return await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async function(err, user){
        if(err) return false;
    
        database.RemoveToken(user.email, refreshToken);
        return true;
    });

}

module.exports = 
                {
                    createToken,
                    verifyToken,
                    refreshToken,
                    removeToken
                }