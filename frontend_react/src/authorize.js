export default async function authorize(){
    let token = await window.sessionStorage.accessToken;
    // console.log('Sending: ' + token);

    let response = await fetch('http://localhost:5000/authorize', {
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + token},
    });

    response = await response.json();
    // console.log(response['access'])
    // console.log(response['admin'])

    return response;
}
