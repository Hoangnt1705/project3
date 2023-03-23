"use strict";

var API = 'http://localhost/router/api/admin-dashboard/user-management/';
var APIImageChange = 'http://localhost/router/api/admin-dashboard/user-management/post/image-change';
var formUpdate = document.getElementById('formUpdate');
var username = document.getElementById('formUpdate').username;
var fullName = document.getElementById('formUpdate').fullName;
var email = document.getElementById('formUpdate').email;
var dob = document.getElementById('formUpdate').dob;
var phoneNumber = document.getElementById('formUpdate').phoneNumber;
var gender = document.getElementById('formUpdate').gender;
var role = document.getElementById('formUpdate').role;
var classBelongs = document.getElementById('formUpdate').classBelongs;
var setRoute = document.getElementById('formUpdate').setRoute;
var stepImage = document.getElementById('formUpdate').stepImage;
var container = document.getElementById('container');
var id = document.getElementById('id');
var formDataUpdate = new FormData();
var formAvataUserUpdate = new FormData();
stepImage.addEventListener('click', function (e) {
  e.preventDefault();
  var DIVStepImage = document.createElement('div');
  DIVStepImage.innerHTML = "\n    <h2> B\u1EA1n c\xF3 mu\u1ED1n th\xEAm Image ?</h2>\n    <button id=\"yes\">Yes</button>\n    <button id=\"no\">No</button>\n    ";
  container.append(DIVStepImage);
  stepImage.style.display = 'none';
  var yes = document.getElementById('formUpdate').yes;
  var no = document.getElementById('formUpdate').no;
  return htmlUpdate(container, yes, no, DIVStepImage);
});
var htmlUpdate = function htmlUpdate(container, yes, no, DIVStepImage) {
  yes.addEventListener('click', function (e) {
    e.preventDefault();
    var htmlImage = document.createElement('div');
    htmlImage.innerHTML = "<div>\n            <label for=\"imageUpdate\">Avatar User:</label>\n            <input type=\"file\" id=\"imageUpdate\" name=\"imageUpdate\" accept=\"image/png, image/jpeg, image/jpg\" required>\n            </div>\n            <div>\n            <button id=\"stepUpdateImage\">Step</button>\n            </div>";
    container.append(htmlImage);
    DIVStepImage.style.display = 'none';
    var imageUpdate = document.getElementById('formUpdate').imageUpdate;
    var stepUpdateImage = document.getElementById('formUpdate').stepUpdateImage;
    return updateHasImageFunc(container, stepUpdateImage, imageUpdate);
  });
  no.addEventListener('click', function (e) {
    e.preventDefault();
    var htmlSubmit = document.createElement('div');
    htmlSubmit.innerHTML = '<button id="buttonUpdate">Save</button>';
    container.append(htmlSubmit);
    DIVStepImage.style.display = 'none';
    var buttonUpdate = document.getElementById('formUpdate').buttonUpdate;
    return updateNotImageFunc(buttonUpdate);
  });
};
var updateNotImageFunc = function updateNotImageFunc(buttonUpdate) {
  buttonUpdate.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('id>>', API + id.innerText);
    validateEmptys();
  });
  var validateEmptys = function validateEmptys() {
    if (_.isEmpty(username.value)) return showError('Không được để trống tên tài khoản'); else if (_.isEmpty(fullName.value)) return showError('Không được để trống họ và tên'); else if (_.isEmpty(email.value)) return showError('Không được để trống email'); else if (_.isEmpty(dob.value)) return showError('Không được để trống ngày sinh'); else if (_.isEmpty(phoneNumber.value)) return showError('Không được để trống số điện thoại'); else if (_.isEmpty(gender.value)) return showError('Không được để trống giới tính'); else if (_.isEmpty(role.value)) return showError('Không được để trống phân quyền'); else if (_.isEmpty(classBelongs.value)) return showError('Không được để trống lớp của học sinh'); else if (_.isEmpty(setRoute.value)) return showError('Không được để trống lộ trình học của học viên');
    // else if (_.isEmpty(imageUpdate.value)) return showError("Không được để trống Image");
    if (username.value && fullName.value && email.value && dob.value && phoneNumber.value && gender.value && role.value && setRoute.value) {
      var setRouteChunkArray = setRoute.value.split(':');
      formDataUpdate.append('username', username.value);
      formDataUpdate.append('fullName', fullName.value);
      formDataUpdate.append('email', email.value);
      formDataUpdate.append('dob', dob.value);
      formDataUpdate.append('phoneNumber', phoneNumber.value);
      formDataUpdate.append('gender', gender.value);
      formDataUpdate.append('role', role.value);
      formDataUpdate.append('classBelongs', classBelongs.value);
      formDataUpdate.append('setRoute', setRouteChunkArray[1]);
      console.log(formDataUpdate.get('username'));
      updateUserFunc(API);
      return showSuccess('Đăng lộ trình học thành công');
    }
  };
  var updateUserFunc = function updateUserFunc(file) {
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

///////////////////////////..................................................................
var updateHasImageFunc = function updateHasImageFunc(container, stepUpdateImage, imageUpdate) {
  var nextBtnUpdateImage = function nextBtnUpdateImage() {
    stepUpdateImage.addEventListener('click', function (e) {
      e.preventDefault();
      validateEmptys();
    });
  };
  var validateEmptys = function validateEmptys() {
    if (_.isEmpty(username.value)) return showError('Không được để trống tên tài khoản'); else if (_.isEmpty(fullName.value)) return showError('Không được để trống họ và tên'); else if (_.isEmpty(email.value)) return showError('Không được để trống email'); else if (_.isEmpty(dob.value)) return showError('Không được để trống ngày sinh'); else if (_.isEmpty(phoneNumber.value)) return showError('Không được để trống số điện thoại'); else if (_.isEmpty(gender.value)) return showError('Không được để trống giới tính'); else if (_.isEmpty(role.value)) return showError('Không được để trống phân quyền'); else if (_.isEmpty(classBelongs.value)) return showError('Không được để trống lớp của học sinh'); else if (_.isEmpty(setRoute.value)) return showError('Không được để trống lộ trình học của học viên');
    // else if (_.isEmpty(imageUpdate.value)) return showError("Không được để trống Image");
    if (username.value && fullName.value && email.value && dob.value && phoneNumber.value && gender.value && role.value && setRoute.value) {
      var setRouteChunkArray = setRoute.value.split(':');
      formDataUpdate.append('username', username.value);
      formDataUpdate.append('fullName', fullName.value);
      formDataUpdate.append('email', email.value);
      formDataUpdate.append('dob', dob.value);
      formDataUpdate.append('phoneNumber', phoneNumber.value);
      formDataUpdate.append('gender', gender.value);
      formDataUpdate.append('role', role.value);
      formDataUpdate.append('classBelongs', classBelongs.value);
      formDataUpdate.append('setRoute', setRouteChunkArray[1]);
      console.log(formDataUpdate.get('username'));
      PostAvataUserChangeFunc(APIImageChange);
      return showSuccess('Tải ảnh lên thành công');
    }
  };
  var validateImage = function validateImage() {
    imageUpdate.addEventListener('change', function (e) {
      e.preventDefault();
      var file = e.target.files[0];
      if (file.size > 20000000) return showError('Limit 20mb'); else if (!file) return showError('Not a valid file'); else if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
        formAvataUserUpdate.append('avataUserUpdate', file);
        console.log(formAvataUserUpdate.get('avataUserUpdate'));
        return showSuccess('Chọn ảnh thành công');
      } else return showError('Valid format Image');
    });
  };
  var PostAvataUserChangeFunc = function PostAvataUserChangeFunc(file) {
    fetch(file, {
      method: 'POST',
      body: formAvataUserUpdate
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      var createTableReturnImage = document.createElement('table');
      createTableReturnImage.innerHTML = "<thead>\n              <tr>\n                <th>Image</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td id=\"imagePut\" style=\"display:none\">".concat(data.url, "</td>\n                <td>\u0110\u01B0\u1EDDng link c\u1EE7a \u1EA3nh <a href=\"").concat(data.url.trim(), "\">Click!</a></td>\n              </tr>\n            </tbody>\n            <button id=\"btnUpdate\">Finish</button>");
      container.append(createTableReturnImage);
      var btnUpdate = document.getElementById('formUpdate').btnUpdate;
      var imagePut = document.getElementById('imagePut');
      formDataUpdate.append('imageUpdate', imagePut.innerText);
      btnUpdateAvataUser(btnUpdate);
    })["catch"](function (err) {
      return console.log(err);
    });
  };
  var PutUserFunc = function PutUserFunc(file) {
    var APIPut = file + id.innerText;
    fetch(APIPut, {
      method: 'PUT',
      body: formDataUpdate
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
    })["catch"](function (err) {
      return console.log(err);
    });
  };
  var btnUpdateAvataUser = function btnUpdateAvataUser(btnUpdate) {
    btnUpdate.addEventListener('click', function (e) {
      e.preventDefault();
      PutUserFunc(API);
      showSuccess('Đăng lộ trình thành công');
      // return window.location.reload();
    });
  };

  nextBtnUpdateImage();
  validateImage();
};