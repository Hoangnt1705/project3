let clickviewExercise = document.querySelectorAll('.clickviewExercise');
let clickviewExerciseParrent = document.querySelectorAll('.clickviewExerciseParrent');
let displayListDoc = document.querySelectorAll('.displayListDoc');
let dataPDF = document.querySelectorAll('.dataPDF');
let docName = document.querySelectorAll('.docName');
let parentContainPdfs = document.getElementById('parentContainPdfs');
let printPDF = document.createElement('div');
var listExerciseRun = document.querySelectorAll('.listExerciseRun');
var materialItem = document.querySelectorAll('.materialItem');
let idDocPool;
let learnIdPool;
let arrangeIdPool;
let courseIdPool;
let checkButtonCompleted;
let lockedPool;
let classIdPool;
for (let i = 0; i < listExerciseRun.length; i++) {
    listExerciseRun[i].addEventListener('click', e => {
        console.log(listExerciseRun[i].childNodes);
        idDocPool = listExerciseRun[i].childNodes[1].innerText;
        learnIdPool = listExerciseRun[i].childNodes[3].innerText;
        arrangeIdPool = listExerciseRun[i].childNodes[5].innerText;
        courseIdPool = listExerciseRun[i].childNodes[7].innerText;
        checkButtonCompleted = listExerciseRun[i].childNodes[9].innerHTML;
        lockedPool = listExerciseRun[i].childNodes[11].innerHTML;
        classIdPool = listExerciseRun[i].childNodes[17].innerHTML;
        console.log(idDocPool);
        console.log(learnIdPool);
        console.log(checkButtonCompleted);
        e.preventDefault();
        printPDF.innerHTML = `<div>
        <center>
        <iframe src="${dataPDF[i].innerText}" width="950" height="700">
        </iframe>
        </center>
        </div>
        <div class="handleLearns">
        <form id="formHandleDocs">
        <div disabled="" class="handles learn-name-course d-flex align-items-center justify-content-between p-2" style="display: flex">
          <h4 class="ant-typography">${docName[i].innerText}</h4>
          <div class="buttonHandleLearns ant-space ant-space-horizontal ant-space-align-center learn__btn-option" style="gap: 8px;margin-left: 180px;">
            <div class="ant-space-item" style=""></div>
            <div class="ant-space-item" style=""><button type="button" id="completedDoc" name="completedDoc" class="ant-btn ant-btn-default btn-common" style="width: 120px;"><span>Hoàn thành bài</span></button></div>
            <div class="ant-space-item" style=""><button type="button" id="backDoc" name="backDoc" class="ant-btn ant-btn-default btn-common" style="width: 120px;"><span>Bài trước</span></button></div>
            <div class="ant-space-item"><button type="button" id="nextDoc" name="nextDoc" class="ant-btn ant-btn-default btn-common" style="width: 120px;"><span>Bài tiếp theo</span></button></div>
          </div>
        </div>
        </form>
        <div class="ant-row">
          <div class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-lg-24"></div>
        </div>
      </div>`;
        parentContainPdfs.append(printPDF);
        toggleClickControl(listExerciseRun[i]);
        let completedDoc = document.getElementById('formHandleDocs').completedDoc;
        let nextDoc = document.getElementById('formHandleDocs').nextDoc;
        let backDoc = document.getElementById('formHandleDocs').backDoc;
        if (listExerciseRun[i] === listExerciseRun[0]) {
            backDoc.style.pointerEvents = 'none';
            backDoc.disabled = true;
        }
        // if (listExerciseRun[i] === listExerciseRun[listExerciseRun.length - 1]) {
        //     completedDoc.disabled = true;
        //     console.log(listExerciseRun[i] === listExerciseRun[listExerciseRun.length - 1]);
        // }
        checkButtonCompleted.trim() === 'true' ? completedDoc.disabled = true : listExerciseRun[i] === listExerciseRun[listExerciseRun.length - 1] ? completedDoc.disabled = true : completedDoc.disabled = false;
        checkButtonCompleted.trim() === 'true' ? completedDoc.style.pointerEvents = 'none' : completedDoc.style.pointerEvents = 'all';
        backDoc.addEventListener('click', () => {
            // nếu đã dự định khi click thì sẽ lấy i - 1 để lùi lại rồi thì khi so sánh cũng phải đặt điều kiện trừ y hệt như thế
            if (listExerciseRun[i] !== listExerciseRun[0]) {
                backDoc.disabled = false;
                backDoc.style.pointerEvents = 'all';
                return listExerciseRun[i - 1].click();
            }
        });
        nextDoc.addEventListener('click', () => {
            nextDoc.style.pointerEvents = 'all';
            return listExerciseRun[i + 1].click();
        });
        handleDocsFunc(completedDoc);
        handleLearnsFunc(completedDoc, backDoc, nextDoc, listExerciseRun);
    });
}
let handleLearnsFunc = (completedDoc, backDoc, nextDoc, listExerciseRun) => {
    checkButtonCompleted.trim() === 'true' ? nextDoc.disabled = false : nextDoc.disabled = true;
    checkButtonCompleted.trim() === 'true' ? nextDoc.style.pointerEvents = 'all' : nextDoc.style.pointerEvents = 'none';
};
let handleDocsFunc = (completedDoc) => {
    completedDoc.addEventListener('click', (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/router/api/v1/pool-doc-completed/post', { idDocPool: idDocPool, learnIdPool: learnIdPool, arrangeIdPool: arrangeIdPool, courseIdPool: courseIdPool, classIdPool: classIdPool })
            .then(response => {
                console.log(response);
                showSuccess('Thành công');
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })
            .catch(err => console.log(err));

    });
};
let toggleClickControl = (node) => {
    for (let i = 0; i < listExerciseRun.length; i++) {
        if (listExerciseRun[i] === node) {
            materialItem[i].style.color = '#f00';
        }
        else {
            materialItem[i].style.color = '#333';
        }
    }
};
for (let i = 0; i < clickviewExerciseParrent.length; i++) {
    clickviewExerciseParrent[i].addEventListener('click', e => {
        e.preventDefault();
        console.log(e.target);
        if (clickviewExercise[i].style.transform === 'rotate(90deg)') {
            clickviewExercise[i].style.transform = 'rotate(0deg)';
            clickviewExercise[i].style.transition = '0.2s linear';
            displayListDoc[i].classList.add('noneDisplayListDoc');
            displayListDoc[i].classList.remove('blockDisplayListDoc');
            setTimeout(() => {
                displayListDoc[i].style.display = 'none';
            }, 200);
            // listExerciseRunFunc(clickviewExercise[i], "none");
        } else {
            clickviewExercise[i].style.transform = 'rotate(90deg)';
            clickviewExercise[i].style.transition = '0.2s linear';
            displayListDoc[i].style.display = 'block';
            displayListDoc[i].classList.add('blockDisplayListDoc');
            displayListDoc[i].classList.remove('noneDisplayListDoc');
            // listExerciseRunFunc(clickviewExercise[i], "block");
        }
    });
}
document.getElementById('successCourse').classList.add('animate');
document.getElementById('successCourse').classList.remove('animate');

document.getElementById('successCourse').addEventListener('click', function () {
    document.getElementById('popup').classList.add('show');
});

document.getElementById('close_popup').addEventListener('click', function () {
    document.getElementById('popup').classList.remove('show');
    setTimeout(() => {
        window.location.reload();
    }, 50);
});

const successCourseForm = document.getElementById('successCourseForm');
const idClassPoolCourse = document.getElementById('idClassPoolCourse').innerText;
const idRoutePoolCourse = document.getElementById('idRoutePoolCourse').innerText;
const idCoursePoolCourse = document.getElementById('idCoursePoolCourse').innerText;
successCourseForm.addEventListener('submit', e => {
    e.preventDefault();
    axios.post('http://localhost:3000/router/api/v1/pool-course-completed/post', {
        idClassPoolCourse: idClassPoolCourse, idRoutePoolCourse: idRoutePoolCourse, idCoursePoolCourse: idCoursePoolCourse
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => console.log(err));
});
const animationContainer = document.getElementById('lottie-animation');
const animationURL = 'https://assets2.lottiefiles.com/temp/lf20_5tgmik.json';

lottie.loadAnimation({
    container: animationContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: animationURL,
});
