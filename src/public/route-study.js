const APICourse = 'http://localhost/router/course/';
let itemRoute = document.querySelectorAll('.itemRoute');
let idRoute = document.querySelectorAll('.idRoute');

for (let i = 0; i < itemRoute.length; i++) {
    itemRoute[i].addEventListener('click', e => {
        e.preventDefault();
        let id = idRoute[i].innerText;
        let idAll = APICourse + id;
        window.location.href = idAll;
    });
}

setTimeout(() => {
    let nestedLoading = document.getElementById('nestedLoading');
    let spinHomeFirst = document.getElementById('spinHomeFirst');
    let spinnerCourse = document.createElement('div');
    spinnerCourse.setAttribute('id', 'spinnerCourse');
    spinnerCourse.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
    nestedLoading.append(spinnerCourse);
    return setTimeout(() => {
        spinHomeFirst.style.display = 'block';
        spinnerCourse.remove();
    }, 1000);
}, 1);