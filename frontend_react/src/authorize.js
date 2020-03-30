export default async function authorize(){
    let accessToken = await window.sessionStorage.accessToken;
    console.log('Sending: ' + accessToken);

    let response = await fetch('http://localhost:5000/authorize', {
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + accessToken},
    });

    response = await response.json();

    if(response.reason == 'expired'){
        console.log('refreshing');
        return await refreshToken();
    }
    else if(response.reason == 'invalid token'){
        return response;
    }
    else{
        return response;
    }
}

async function refreshToken(){
    refreshToken = await window.sessionStorage.refreshToken;
    let response = await fetch('http://localhost:5000/authorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({token: refreshToken})
    });

    response = await response.json();
    window.sessionStorage.accessToken = await response['accessToken'];
    return authorize();
}

