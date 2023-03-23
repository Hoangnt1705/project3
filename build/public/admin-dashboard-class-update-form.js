"use strict";

var API = 'http://localhost/router/api/admin-dashboard/class/update/';
var formUpdate = document.getElementById('formUpdate');
var className = document.getElementById('formUpdate').className;
var typeClass = document.getElementById('formUpdate').typeClass;
var startCeremony = document.getElementById('formUpdate').startCeremony;
var endDate = document.getElementById('formUpdate').endDate;
var setRoute = document.getElementById('formUpdate').setRoute;
var save = document.getElementById('formUpdate').save;
var idClass = document.getElementById('idClass');
var idCheckUpdateRouterStudy = document.getElementById('idCheckUpdateRouterStudy');
var test1 = document.getElementsByClassName('test1');
var formDataUpdate = new FormData();
idCheckUpdateRouterStudy.innerText ? setRoute.value = idCheckUpdateRouterStudy.innerText : setRoute.value = '';
var updateFunc = function updateFunc(save) {
  save.addEventListener('click', function (e) {
    e.preventDefault();
    validateEmptys();
  });
  var validateEmptys = function validateEmptys() {
    if (_.isEmpty(className.value)) return showError('Không được để trống phần tên lớp');else if (_.isEmpty(typeClass.value)) return showError('Không được để trống phần loại lớp học');else if (_.isEmpty(startCeremony.value)) return showError('Không được để trống phần thời gian bắt đầu lớp học');else if (_.isEmpty(endDate.value)) return showError('Không được để trống phần thời gian kết thúc lớp học');else if (_.isEmpty(setRoute.value)) return showError('Không được để trống phần thêm lộ trình lớp học');
    if (className.value && typeClass.value && startCeremony.value) {
      formDataUpdate.append('className', className.value);
      formDataUpdate.append('typeClass', typeClass.value);
      formDataUpdate.append('startCeremony', startCeremony.value);
      formDataUpdate.append('endDate', endDate.value);
      formDataUpdate.append('setRoute', setRoute.value);
      updateRouteStudyFunc(API);
      return showSuccess('Đăng lộ trình học thành công');
    }
  };
  var updateRouteStudyFunc = function updateRouteStudyFunc(file) {
    fetch(file + idClass.innerText, {
      method: 'PUT',
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