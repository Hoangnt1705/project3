const API = 'http://localhost:3000/router/course-detail/';
const APICourse = 'http://localhost:3000/router/course/';
let buttonLogin = document.getElementById('buttonLogin');
let level = document.querySelectorAll('.level');
let color = document.querySelectorAll('.color');
let itemRoute = document.querySelectorAll('.itemRoute');
let itemCourse = document.querySelectorAll('.itemCourse');
let idCourse = document.querySelectorAll('.idCourse');
let idRoute = document.querySelectorAll('.idRoute');
let btnSearchSuggestion = document.getElementById('submitSuggest').btnSearchSuggestion;
let title = '<div class="wrapInTitleSuggestion">Tham gia buổi show talk online <i class="fa-solid fa-fire" style="color: #FF5F1F"></i> cầm về notebook RA !! <img src="https://cdn.iconscout.com/icon/free/png-256/codepen-3771364-3149472.png" alt="5318477.png" width="28px" class="colorWrapInTitleSuggestion"></div> ';
for (let i = 0; i < itemCourse.length; i++) {
    itemCourse[i].addEventListener('click', e => {
        e.preventDefault();
        let id = idCourse[i].innerText;
        let idAll = API + id;
        window.location.href = idAll;
    });
}
for (let i = 0; i < itemRoute.length; i++) {
    itemRoute[i].addEventListener('click', e => {
        e.preventDefault();
        let id = idRoute[i].innerText;
        let idAll = APICourse + id;
        window.location.href = idAll;
    });
}
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
    }
}

if (buttonLogin) {
    buttonLogin.addEventListener('click', () => {
        window.location.href = 'http://localhost:3000/router/login/';
    });
}
let parentTagA = document.createElement('div');
parentTagA.classList.add('ItemProduct');
let textFind = document.getElementById('textFind');
let createSuggestion = document.getElementById('createSuggestion');
textFind.innerHTML = title;
createSuggestion.style.height = '150px';
let valueInputSearch = document.getElementById('inputSearch');
valueInputSearch.addEventListener('input', (e) => {
    textFind.innerText = `Bạn đang tìm kiếm "${valueInputSearch.value}"`;
    viewSuggestion();
});
document.addEventListener('click', (evt) => {
    const getSuggest = document.getElementById('inputSearch');
    const createSuggestion = document.getElementById('createSuggestion');
    let targetEl = evt.target; // clicked element 
    do {
        if (targetEl == getSuggest || targetEl == btnSearchSuggestion) {
            // This is a click inside, does nothing, just return.
            createSuggestion.style.display = 'block';
            return;
        }
        // Go up the DOM
        targetEl = targetEl.parentNode;
    } while (targetEl);
    // This is a click outside. 
    if (createSuggestion == '' || createSuggestion == null) {

    } else {
        document.getElementById('createSuggestion').style.display = 'none';
    }
});

let viewSuggestion = () => {
    let inputSearch = document.getElementById('inputSearch').value;
    var APISearch = `http://localhost:3000/router/api/course/query?nameCourse=${inputSearch}`;
    var pageimage = [];
    if (inputSearch == '') {
        textFind.innerHTML = title;
        createSuggestion.style.height = '150px';
        console.log('nothing');
        parentTagA.style.visibility = 'hidden';
    }
    else {
        parentTagA.style.visibility = 'visible';
        createSuggestion.style.height = '435px';
        //đây là function fetch API
        async function funcSearch(url) {
            // *{ thằng này là kết quả của API DATA
            const response = await fetch(url);
            let dataParse = await response.json();
            let { data } = dataParse;
            //}*    
            try {
                renderSearch = '';
                console.log(data);
                for (let i = 0; i < 6; i++) {
                    renderSearch += await `<a class="itemListSuggest" style="color:black;text-decoration: none;" href="http://localhost:3000/router/course-detail/${data[i].id_course}" style="display: flex;">
                <div class="itemWrap">
                  <p>${data[i].course_name.substring(0, 55)} <img class="imageItemSuggest" style="width:30px;margin-right:30px;background-size:cover;" src="${data[i].image_course}" alt=""></p>
              </div>
              </a>`;
                    parentTagA.innerHTML = renderSearch;
                    let createSuggestion = document.querySelector('#createSuggestion');
                    createSuggestion.append(parentTagA);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        funcSearch(APISearch);
    }
};

btnSearchSuggestion.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = 'http://localhost:3000/router/course/';
});
