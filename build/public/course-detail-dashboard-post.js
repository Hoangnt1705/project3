"use strict";

var API = 'http://localhost/router/api/admin-dashboard/course-detail/post';
var formPostCourse = document.getElementById('formPostCourse');
var id = document.getElementById('id');
var formDataUpdate = new FormData();
var addInCourse = document.getElementById('formPostCourse').addInCourse;
var descriptionDetail = document.getElementById('formPostCourse').descriptionDetail;
var weLearn = document.getElementById('formPostCourse').weLearn;
var teacher = document.getElementById('formPostCourse').teacher;
var ta = document.getElementById('formPostCourse').ta;
var save = document.getElementById('formPostCourse').save;
var postNotImageFunc = function postNotImageFunc(buttonUpdate) {
  buttonUpdate.addEventListener('click', function (e) {
    e.preventDefault();
    // validateEmptys()
    validateEmptys();
  });
  var validateEmptys = function validateEmptys() {
    if (_.isEmpty(addInCourse.value)) return showError('Không được để trống tên khóa học'); else if (_.isEmpty(descriptionDetail.value)) return showError('Không được để trống phần mô tả'); else if (_.isEmpty(weLearn.value)) return showError('Không được để trống phần chúng ta học gì'); else if (_.isEmpty(teacher.value)) return showError('Không được để trống phần giảng viên'); else if (_.isEmpty(ta.value)) return showError('Không được để trống phần trợ giảng');
    // else if (_.isEmpty(imageUpdate.value)) return showError("Không được để trống Image");
    if (addInCourse.value && descriptionDetail.value && weLearn.value && teacher.value && ta.value) {
      var addInCourseChunkArray = addInCourse.value.split(':');
      formDataUpdate.append('addInCourse', addInCourseChunkArray[1]);
      formDataUpdate.append('descriptionDetail', descriptionDetail.value);
      formDataUpdate.append('weLearn', weLearn.value);
      formDataUpdate.append('teacher', teacher.value);
      formDataUpdate.append('ta', ta.value);
      postCourseDetailFunc(API);
      return showSuccess('Đăng lộ trình học thành công');
    }
  };
  var postCourseDetailFunc = function postCourseDetailFunc(file) {
    var APIPut = file;
    fetch(APIPut, {
      method: 'POST',
      body: formDataUpdate
    }).then(function (response) {
      return console.log(response);
    })["catch"](function (err) {
      return console.log(err);
    });
  };
};
postNotImageFunc(save);