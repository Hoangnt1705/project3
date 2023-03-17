const formPostLogin = document.getElementById('formPostLogin');
const username = document.getElementById('formPostLogin').username;
const password = document.getElementById('formPostLogin').password;
const API = 'http://localhost:3000/router/api/v1/admin-login/';
formPostLogin.addEventListener('submit', e => {
    e.preventDefault();
    fetchPostLogin(API);
});
let fetchPostLogin = (file) => {
    fetch(file, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username.value, password: password.value })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // localStorage.setItem('tokenAdmin', data.token);
            setTimeout(() => {
                window.location.href = 'http://localhost:3000/router/admin-dashboard/';
            }, 500);
        })
        .catch(err => alert(err));
};
// const APITokenAdmin = 'http://localhost:3000/router/admin-dashboard/'
// let getTokenAdmin = (file) => {
//     fetch(file, {
//         headers: {
//             'Authorization': `${localStorage.getItem('tokenAdmin')}`,
//             'Content-Type': 'application/json',
//         }
//     })
//         .then(response => console.log(response))
//         .catch(err => console.log(err));
// };
// APITokenAdmin(APITokenAdmin);