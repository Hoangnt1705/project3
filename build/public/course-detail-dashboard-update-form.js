"use strict";

var API = 'http://localhost/router/api/admin-dashboard/course-detail/update/';
var formUpdate = document.getElementById('formUpdate');
var id = document.getElementById('id');
var formDataUpdate = new FormData();
var addInCourseChange = document.getElementById('formUpdate').addInCourseChange;
var courseNameUpdate = document.getElementById('formUpdate').courseNameUpdate;
var weLearn = document.getElementById('formUpdate').weLearn;
var teacher = document.getElementById('formUpdate').teacher;
var ta = document.getElementById('formUpdate').ta;
var save = document.getElementById('formUpdate').save;
var updateNotImageFunc = function updateNotImageFunc(buttonUpdate) {
  buttonUpdate.addEventListener('click', function (e) {
    e.preventDefault();
    // validateEmptys()
    console.log('id>>', API + id.innerText);
    validateEmptys();
  });
  var validateEmptys = function validateEmptys() {
    if (_.isEmpty(addInCourseChange.value)) return showError('Không được để trống tên khoá học'); else if (_.isEmpty(courseNameUpdate.value)) return showError('Không được để trống phần mô tả khóa học'); else if (_.isEmpty(weLearn.value)) return showError('Không được để trống phần chúng ta học gì'); else if (_.isEmpty(teacher.value)) return showError('Không được để trống phần giảng viên'); else if (_.isEmpty(ta.value)) return showError('Không được để trống phần trợ giảng');
    // else if (_.isEmpty(imageUpdate.value)) return showError("Không được để trống Image");
    if (addInCourseChange.value && courseNameUpdate.value && weLearn.value && teacher.value && ta.value) {
      var addInCourseChunkArray = addInCourseChange.value.split(':');
      formDataUpdate.append('addInCourseChange', addInCourseChunkArray[1]);
      formDataUpdate.append('courseNameUpdate', courseNameUpdate.value);
      formDataUpdate.append('weLearn', weLearn.value);
      formDataUpdate.append('teacher', teacher.value);
      formDataUpdate.append('ta', ta.value);
      console.log(formDataUpdate.get('addInCourseChange'));
      updateCourseDetailFunc(API);
      return showSuccess('Đăng lộ trình học thành công');
    }
  };
  var updateCourseDetailFunc = function updateCourseDetailFunc(file) {
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
updateNotImageFunc(save);