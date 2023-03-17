let updateUser = document.querySelectorAll('.updateUser');
let idUpdate = document.querySelectorAll('.idUpdate');
const API = 'http://localhost:3000/router/admin-dashboard/user-management/';
for (let i = 0; i < updateUser.length; i++) {
    updateUser[i].addEventListener('click', e => {
        e.preventDefault();
        let id = idUpdate[i].innerText;
        let idAll = API + id;
        window.location.href = idAll;
    });
}

