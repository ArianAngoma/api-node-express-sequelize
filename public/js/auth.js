function onSignIn(googleUser) {
    const url = (window.location.hostname.includes('localhost'))
        ? 'http://localhost:3000/api/auth/google'
        : 'https://api-node-express-mongodb.herokuapp.com/api/auth/google'

    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    const id_token = googleUser.getAuthResponse().id_token;
    const data = {id_token};
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(result => result.json()).then(data => console.log(data)).catch(console.log);

}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}