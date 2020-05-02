export default async function authorize(){
  //first send access token to be authenticated
  let accessToken = await window.sessionStorage.accessToken;
  console.log('Sending: ' + accessToken);

  //send server token
  let response = await fetch('http://localhost:5000/authorize', {
    method: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + accessToken
    },
  });

  response = await response.json();

  //if has expired call refreshToken()
  if(response.reason === 'expired'){
    console.log('refreshing');
    return await refreshToken();
  }
  //if malformed token return response
  else if(response.reason === 'invalid token'){
    return response;
  }
  //token is valid return response from server
  else{
    return response;
  }
}

//refreshes tokens
async function refreshToken(){
  //use refresh token to ask for new token
  let token = await window.sessionStorage.refreshToken;
  let response = await fetch('http://localhost:5000/authorize', {
    method: 'POST',
    headers:
      {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({token: token})
  });

  //store token then reauthorize and return result
  response = await response.json();
  console.log(response);
  window.sessionStorage.accessToken = await response['accessToken'];
  return authorize();
}

export async function getToken(){
  console.log('getting token for user');
  return await window.sessionStorage.accessToken;
}

