"use strict";

var API = 'http://localhost/router/api/admin-dashboard/class/create';
var formCreateClass = document.getElementById('formCreateClass');
var className = document.getElementById('formCreateClass').className;
var typeClass = document.getElementById('formCreateClass').typeClass;
var startCeremony = document.getElementById('formCreateClass').startCeremony;
var save = document.getElementById('formCreateClass').save;
var formDataUpdate = new FormData();
var updateFunc = function updateFunc(save) {
  save.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('id>>', API + id.innerText);
    validateEmptys();
  });
  var validateEmptys = function validateEmptys() {
    if (_.isEmpty(className.value)) return showError('Không được để trống phần tên lớp'); else if (_.isEmpty(typeClass.value)) return showError('Không được để trống phần loại lớp học'); else if (_.isEmpty(startCeremony.value)) return showError('Không được để trống phần thời gian bắt đầu lớp học');
    if (className.value && typeClass.value && startCeremony.value) {
      formDataUpdate.append('className', className.value);
      formDataUpdate.append('typeClass', typeClass.value);
      formDataUpdate.append('startCeremony', startCeremony.value);
      updateRouteStudyFunc(API);
      return showSuccess('Đăng lộ trình học thành công');
    }
  };
  var updateRouteStudyFunc = function updateRouteStudyFunc(file) {
    fetch(file, {
      method: 'POST',
      body: formDataUpdate
    }).then(function (response) {
      console.log(response);
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    })["catch"](function (err) {
      return console.log(err);
    });
  };
};
updateFunc(save);