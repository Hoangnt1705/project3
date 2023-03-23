let updateRoute = document.querySelectorAll('.updateCourse');
let idUpdate = document.querySelectorAll('.idUpdate');
const API = 'http://localhost/router/admin-dashboard/learn/update/';
for (let i = 0; i < updateRoute.length; i++) {
    updateRoute[i].addEventListener('click', e => {
        e.preventDefault();
        let id = idUpdate[i].innerText;
        let idAll = API + id;
        window.location.href = idAll;
    });
}

