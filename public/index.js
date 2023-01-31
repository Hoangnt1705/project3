const API = 'http://localhost:3000/router/course-detail/';
let buttonLogin = document.getElementById('buttonLogin');
let level = document.querySelectorAll('.level');
let color = document.querySelectorAll('.color');
let itemRoute = document.querySelectorAll('.itemRoute');
let itemCourse = document.querySelectorAll('.itemCourse');
let idCourse = document.querySelectorAll('.idCourse');
for (let i = 0; i < itemCourse.length; i++) {
    itemCourse[i].addEventListener('click', e => {
        e.preventDefault();
        let id = idCourse[i].innerText;
        let idAll = API + id
        window.location.href = idAll;
    });
};
itemRoute.forEach(element => {
    element.addEventListener('click', e => {
        e.preventDefault();
        window.location.href = 'http://localhost:3000/router/route-study';
    });
});
for (let i = 0; i < level.length; i++) {
    if (level[i].value === 'Normal') {
        color[i].style.width = '30%';
        color[i].style.background = '#95FF39';
        console.log(color[i]);
    }
    else if (level[i].value === 'Intermediate') {
        color[i].style.width = '65%';
        color[i].style.background = '#ff0';
    }
    else if (level[i].value === 'Advanced') {
        color[i].style.width = '100%';
        color[i].style.background = '#FF0000';
    };
};

if (buttonLogin) {
    buttonLogin.addEventListener('click', () => {
        window.location.href = 'http://localhost:3000/router/login/';
    })
};


