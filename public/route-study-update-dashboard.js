let updateRoute = document.querySelectorAll('.updateRoute');
let idUpdate = document.querySelectorAll('.idUpdate');
const API = 'http://localhost:3000/router/admin-dashboard/route-study/update/';
for (let i = 0; i < updateRoute.length; i++) {
    updateRoute[i].addEventListener('click', e => {
        e.preventDefault();
        let id = idUpdate[i].innerText;
        let idAll = API + id
        window.location.href = idAll;
    });
};

