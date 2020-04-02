export default async function authorize(){
  // first send access token to be authenticated
  let accessToken = await window.sessionStorage.accessToken;
  console.log('Sending: ' + accessToken);

  //send server token
  let response = await fetch('http://localhost:5000/authorize', {
    method: 'GET',
    headers:
      {
        'Authorization': 'Bearer ' + accessToken
      },
  });

  response = await response.json();

  //if has expired call refreshToken()
  if(response.reason === 'expired'){
    console.log('refreshing');
    return await refreshToken();
  } else if(response.reason === 'invalid token'){ //if malformed token return response
    return response;
  } else {//token is valid return response from server
    return response;
  }
}

//refreshses tokens
async function refreshToken(){
  //use refresh token to ask for new token
  refreshToken = await window.sessionStorage.refreshToken;
  let response = await fetch('http://localhost:5000/authorize', {
    method: 'POST',
    headers:
      {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(
      {
        token: refreshToken
      })
  });

  //store token then reauthorize and return result
  response = await response.json();
  window.sessionStorage.accessToken = await response['accessToken'];
  return authorize();
}

