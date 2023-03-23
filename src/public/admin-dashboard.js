const APITokenAdmin = 'http://localhost/router/admin-dashboard/';
let getTokenAdmin = (file) => {
    fetch(file, {
        headers: {
            'Authorization': `${localStorage.getItem('tokenAdmin')}`,
            'Content-Type': 'application/json',
        }
    })
        .then(response => console.log(response))
        .catch(err => console.log(err));
};
getTokenAdmin(APITokenAdmin);