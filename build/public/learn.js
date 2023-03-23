"use strict";

var clickviewExercise = document.querySelectorAll('.clickviewExercise');
var clickviewExerciseParrent = document.querySelectorAll('.clickviewExerciseParrent');
var displayListDoc = document.querySelectorAll('.displayListDoc');
var dataPDF = document.querySelectorAll('.dataPDF');
var docName = document.querySelectorAll('.docName');
var parentContainPdfs = document.getElementById('parentContainPdfs');
var printPDF = document.createElement('div');
var listExerciseRun = document.querySelectorAll('.listExerciseRun');
var materialItem = document.querySelectorAll('.materialItem');
var idDocPool;
var learnIdPool;
var arrangeIdPool;
var courseIdPool;
var checkButtonCompleted;
var lockedPool;
var classIdPool;
var _loop = function _loop(i) {
  listExerciseRun[i].addEventListener('click', function (e) {
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
    printPDF.innerHTML = "<div>\n        <center>\n        <iframe src=\"".concat(dataPDF[i].innerText, "\" width=\"950\" height=\"700\">\n        </iframe>\n        </center>\n        </div>\n        <div class=\"handleLearns\">\n        <form id=\"formHandleDocs\">\n        <div disabled=\"\" class=\"handles learn-name-course d-flex align-items-center justify-content-between p-2\" style=\"display: flex\">\n          <h4 class=\"ant-typography\">").concat(docName[i].innerText, "</h4>\n          <div class=\"buttonHandleLearns ant-space ant-space-horizontal ant-space-align-center learn__btn-option\" style=\"gap: 8px;margin-left: 180px;\">\n            <div class=\"ant-space-item\" style=\"\"></div>\n            <div class=\"ant-space-item\" style=\"\"><button type=\"button\" id=\"completedDoc\" name=\"completedDoc\" class=\"ant-btn ant-btn-default btn-common\" style=\"width: 120px;\"><span>Ho\xE0n th\xE0nh b\xE0i</span></button></div>\n            <div class=\"ant-space-item\" style=\"\"><button type=\"button\" id=\"backDoc\" name=\"backDoc\" class=\"ant-btn ant-btn-default btn-common\" style=\"width: 120px;\"><span>B\xE0i tr\u01B0\u1EDBc</span></button></div>\n            <div class=\"ant-space-item\"><button type=\"button\" id=\"nextDoc\" name=\"nextDoc\" class=\"ant-btn ant-btn-default btn-common\" style=\"width: 120px;\"><span>B\xE0i ti\u1EBFp theo</span></button></div>\n          </div>\n        </div>\n        </form>\n        <div class=\"ant-row\">\n          <div class=\"ant-col ant-col-xs-24 ant-col-sm-24 ant-col-lg-24\"></div>\n        </div>\n      </div>");
    parentContainPdfs.append(printPDF);
    toggleClickControl(listExerciseRun[i]);
    var completedDoc = document.getElementById('formHandleDocs').completedDoc;
    var nextDoc = document.getElementById('formHandleDocs').nextDoc;
    var backDoc = document.getElementById('formHandleDocs').backDoc;
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
    backDoc.addEventListener('click', function () {
      // nếu đã dự định khi click thì sẽ lấy i - 1 để lùi lại rồi thì khi so sánh cũng phải đặt điều kiện trừ y hệt như thế
      if (listExerciseRun[i] !== listExerciseRun[0]) {
        backDoc.disabled = false;
        backDoc.style.pointerEvents = 'all';
        return listExerciseRun[i - 1].click();
      }
    });
    nextDoc.addEventListener('click', function () {
      nextDoc.style.pointerEvents = 'all';
      return listExerciseRun[i + 1].click();
    });
    handleDocsFunc(completedDoc);
    handleLearnsFunc(completedDoc, backDoc, nextDoc, listExerciseRun);
  });
};
for (var i = 0; i < listExerciseRun.length; i++) {
  _loop(i);
}
var handleLearnsFunc = function handleLearnsFunc(completedDoc, backDoc, nextDoc, listExerciseRun) {
  checkButtonCompleted.trim() === 'true' ? nextDoc.disabled = false : nextDoc.disabled = true;
  checkButtonCompleted.trim() === 'true' ? nextDoc.style.pointerEvents = 'all' : nextDoc.style.pointerEvents = 'none';
};
var handleDocsFunc = function handleDocsFunc(completedDoc) {
  completedDoc.addEventListener('click', function (e) {
    e.preventDefault();
    axios.post('http://localhost/router/api/v1/pool-doc-completed/post', {
      idDocPool: idDocPool,
      learnIdPool: learnIdPool,
      arrangeIdPool: arrangeIdPool,
      courseIdPool: courseIdPool,
      classIdPool: classIdPool
    }).then(function (response) {
      console.log(response);
      showSuccess('Thành công');
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    })["catch"](function (err) {
      return console.log(err);
    });
  });
};
var toggleClickControl = function toggleClickControl(node) {
  for (var _i = 0; _i < listExerciseRun.length; _i++) {
    if (listExerciseRun[_i] === node) {
      materialItem[_i].style.color = '#f00';
    } else {
      materialItem[_i].style.color = '#333';
    }
  }
};
var _loop2 = function _loop2(_i2) {
  clickviewExerciseParrent[_i2].addEventListener('click', function (e) {
    e.preventDefault();
    console.log(e.target);
    if (clickviewExercise[_i2].style.transform === 'rotate(90deg)') {
      clickviewExercise[_i2].style.transform = 'rotate(0deg)';
      clickviewExercise[_i2].style.transition = '0.2s linear';
      displayListDoc[_i2].classList.add('noneDisplayListDoc');
      displayListDoc[_i2].classList.remove('blockDisplayListDoc');
      setTimeout(function () {
        displayListDoc[_i2].style.display = 'none';
      }, 200);
      // listExerciseRunFunc(clickviewExercise[i], "none");
    } else {
      clickviewExercise[_i2].style.transform = 'rotate(90deg)';
      clickviewExercise[_i2].style.transition = '0.2s linear';
      displayListDoc[_i2].style.display = 'block';
      displayListDoc[_i2].classList.add('blockDisplayListDoc');
      displayListDoc[_i2].classList.remove('noneDisplayListDoc');
      // listExerciseRunFunc(clickviewExercise[i], "block");
    }
  });
};
for (var _i2 = 0; _i2 < clickviewExerciseParrent.length; _i2++) {
  _loop2(_i2);
}
document.getElementById('successCourse').classList.add('animate');
document.getElementById('successCourse').classList.remove('animate');
document.getElementById('successCourse').addEventListener('click', function () {
  document.getElementById('popup').classList.add('show');
});
document.getElementById('close_popup').addEventListener('click', function () {
  document.getElementById('popup').classList.remove('show');
  setTimeout(function () {
    window.location.reload();
  }, 50);
});
var successCourseForm = document.getElementById('successCourseForm');
var idClassPoolCourse = document.getElementById('idClassPoolCourse').innerText;
var idRoutePoolCourse = document.getElementById('idRoutePoolCourse').innerText;
var idCoursePoolCourse = document.getElementById('idCoursePoolCourse').innerText;
successCourseForm.addEventListener('submit', function (e) {
  e.preventDefault();
  axios.post('http://localhost/router/api/v1/pool-course-completed/post', {
    idClassPoolCourse: idClassPoolCourse,
    idRoutePoolCourse: idRoutePoolCourse,
    idCoursePoolCourse: idCoursePoolCourse
  }).then(function (response) {
    console.log(response);
  })["catch"](function (err) {
    return console.log(err);
  });
});
var animationContainer = document.getElementById('lottie-animation');
var animationURL = 'https://assets2.lottiefiles.com/temp/lf20_5tgmik.json';
lottie.loadAnimation({
  container: animationContainer,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: animationURL
});