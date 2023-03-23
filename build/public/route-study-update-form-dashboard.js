"use strict";

var API = 'http://localhost/router/api/admin-dashboard/route-study/update/';
var APIImageChange = 'http://localhost/router/api/admin-dashboard/route-study/post/image-change';
var formUpdate = document.getElementById('formUpdate');
var routeNameUpdate = document.getElementById('formUpdate').routeNameUpdate;
var descriptionUpdate = document.getElementById('formUpdate').descriptionUpdate;
var totalTimeUpdate = document.getElementById('formUpdate').totalTimeUpdate;
var stepImage = document.getElementById('formUpdate').stepImage;
var container = document.getElementById('container');
var id = document.getElementById('id');
var formDataUpdate = new FormData();
var formImageUpdate = new FormData();
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
    htmlImage.innerHTML = "<div>\n            <label for=\"imageUpdate\">Image Route:</label>\n            <input type=\"file\" id=\"imageUpdate\" name=\"imageUpdate\" accept=\"image/png, image/jpeg, image/jpg\" required>\n            </div>\n            <div>\n            <button id=\"stepUpdateImage\">Step</button>\n            </div>";
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
    // validateEmptys()
    console.log('id>>', API + id.innerText);
    validateEmptys();
  });
  var validateEmptys = function validateEmptys() {
    if (_.isEmpty(routeNameUpdate.value)) return showError('Không được để trống tên lộ trình'); else if (_.isEmpty(descriptionUpdate.value)) return showError('Không được để trống phần mô tả'); else if (_.isEmpty(totalTimeUpdate.value)) return showError('Không được để trống tổng thời gian học');
    // else if (_.isEmpty(imageUpdate.value)) return showError("Không được để trống Image");
    if (routeNameUpdate.value && descriptionUpdate.value && totalTimeUpdate.value) {
      formDataUpdate.append('routeNameUpdate', routeNameUpdate.value);
      formDataUpdate.append('descriptionUpdate', descriptionUpdate.value);
      formDataUpdate.append('totalTimeUpdate', totalTimeUpdate.value);
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

///////////////////////////..................................................................
var updateHasImageFunc = function updateHasImageFunc(container, stepUpdateImage, imageUpdate) {
  var nextBtnUpdateImage = function nextBtnUpdateImage() {
    stepUpdateImage.addEventListener('click', function (e) {
      e.preventDefault();
      validateEmptys();
    });
  };
  var validateEmptys = function validateEmptys() {
    if (_.isEmpty(routeNameUpdate.value)) return showError('Không được để trống tên lộ trình'); else if (_.isEmpty(descriptionUpdate.value)) return showError('Không được để trống phần mô tả'); else if (_.isEmpty(totalTimeUpdate.value)) return showError('Không được để trống tổng thời gian học'); else if (_.isEmpty(imageUpdate.value)) return showError('Không được để trống Image');
    if (routeNameUpdate.value && descriptionUpdate.value && totalTimeUpdate.value) {
      formDataUpdate.append('routeNameUpdate', routeNameUpdate.value);
      formDataUpdate.append('descriptionUpdate', descriptionUpdate.value);
      formDataUpdate.append('totalTimeUpdate', totalTimeUpdate.value);
      console.log(formDataUpdate.get('totalTimeUpdate'));
      PostRouteImageChangeFunc(APIImageChange);
      return showSuccess('Tải ảnh lên thành công');
    }
  };
  var PostRouteImageChangeFunc = function PostRouteImageChangeFunc(file) {
    fetch(file, {
      method: 'POST',
      body: formImageUpdate
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
      btnUpdateRoute(btnUpdate);
      console.log(imagePut.innerText);
      console.log(routeNameUpdate.value);
      console.log(descriptionUpdate.value);
      console.log(totalTimeUpdate.value);
    })["catch"](function (err) {
      return console.log(err);
    });
  };
  var validateImage = function validateImage() {
    imageUpdate.addEventListener('change', function (e) {
      e.preventDefault();
      var file = e.target.files[0];
      if (file.size > 20000000) return showError('Limit 20mb'); else if (!file) return showError('Not a valid file'); else if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
        formImageUpdate.append('imageUpdate', file);
        console.log(formImageUpdate.get('imageUpdate'));
        return showSuccess('Chọn ảnh thành công');
      } else return showError('Valid format Image');
    });
  };
  var PutRouteFunc = function PutRouteFunc(file) {
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
  var btnUpdateRoute = function btnUpdateRoute(btnUpdate) {
    btnUpdate.addEventListener('click', function (e) {
      e.preventDefault();
      PutRouteFunc(API);
      showSuccess('Đăng lộ trình thành công');
    });
  };
  nextBtnUpdateImage();
  validateImage();
};