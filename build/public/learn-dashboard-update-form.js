"use strict";

var API = 'http://localhost/router/api/admin-dashboard/learn/update/';
var formUpdate = document.getElementById('formUpdate');
var titleLearn = document.getElementById('formUpdate').titleLearn;
var ratingContent = document.getElementById('formUpdate').ratingContent;
var ratingNumber = document.getElementById('formUpdate').ratingNumber;
var addInCourse = document.getElementById('formUpdate').addInCourse;
var btnUpdate = document.getElementById('formUpdate').btnUpdate;
var id = document.getElementById('id');
var formDataUpdate = new FormData();
var updateFunc = function updateFunc(btnUpdate) {
  btnUpdate.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('id>>', API + id.innerText);
    validateEmptys();
  });
  var validateEmptys = function validateEmptys() {
    if (_.isEmpty(titleLearn.value)) return showError('Không được để trống tên bài học'); else if (_.isEmpty(ratingContent.value)) return showError('Không được để trống phần nội dung đánh giá'); else if (_.isEmpty(ratingNumber.value)) return showError('Không được để trống phần số sao đánh giá'); else if (_.isEmpty(addInCourse.value)) return showError('Không được để trống phần thêm bài học vào khóa học');
    if (titleLearn.value && ratingContent.value && ratingNumber.value && addInCourse.value) {
      var addInCourseChunkArray = addInCourse.value.split(':');
      formDataUpdate.append('addInCourse', addInCourseChunkArray[1]);
      formDataUpdate.append('titleLearn', titleLearn.value);
      formDataUpdate.append('ratingContent', ratingContent.value);
      formDataUpdate.append('ratingNumber', ratingNumber.value);
      console.log(formDataUpdate.get('totalTimeUpdate'));
      updateRouteStudyFunc(API);
      return showSuccess('Đăng lộ trình học thành công');
    }
  };
  var updateRouteStudyFunc = function updateRouteStudyFunc(file) {
    var APIPut = file + id.innerText;
    fetch(APIPut, {
      method: 'PUT',
      body: formDataUpdate
    }).then(function (response) {
      return console.log(response);
    })["catch"](function (err) {
      return console.log(err);
    });
  };
};
updateFunc(btnUpdate);