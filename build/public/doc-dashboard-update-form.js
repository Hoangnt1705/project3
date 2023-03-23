"use strict";

var API = 'http://localhost/router/api/admin-dashboard/doc/update/';
var APIImageChange = 'http://localhost/router/api/admin-dashboard/doc/post/image-change';
var formUpdate = document.getElementById('formUpdate');
var addInLearnChange = document.getElementById('formUpdate').addInLearnChange;
var addInCourseChange = document.getElementById('formUpdate').addInCourseChange;
var docNameUpdate = document.getElementById('formUpdate').docNameUpdate;
var locking = document.getElementById('formUpdate').locking;
var arrange = document.getElementById('formUpdate').arrange;
var stepImage = document.getElementById('formUpdate').stepImage;
var container = document.getElementById('container');
var id = document.getElementById('id');
var formDataUpdate = new FormData();
var formImageCourseUpdate = new FormData();
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
    htmlImage.innerHTML = "<div>\n            <label for=\"imageUpdate\">Image Course:</label>\n            <input type=\"file\" id=\"imageUpdate\" name=\"imageUpdate\" accept=\"application/pdf,application/vnd.ms-excel\" required>\n            </div>\n            <div>\n            <button id=\"stepUpdateImage\">Step</button>\n            </div>";
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
    if (_.isEmpty(addInLearnChange.value)) return showError('Không được để trống tên bài học'); else if (_.isEmpty(addInCourseChange.value)) return showError('Không được để trống phần khóa học'); else if (_.isEmpty(docNameUpdate.value)) return showError('Không được để trống phần tên bài đọc'); else if (_.isEmpty(locking.value)) return showError('Không được để trống phần mở khóa bài đọc'); else if (_.isEmpty(arrange.value)) return showError('Không được để trống phần sắp xếp bài đọc');
    // else if (_.isEmpty(imageUpdate.value)) return showError("Không được để trống Image");
    if (addInLearnChange.value && docNameUpdate.value && locking.value && arrange.value && addInCourseChange.value) {
      var addInLearnChunkArray = addInLearnChange.value.split('$');
      formDataUpdate.append('addInLearnChange', addInLearnChunkArray[1]);
      var addInCourseChunkArray = addInCourseChange.value.split('$');
      formDataUpdate.append('addInCourseChange', addInCourseChunkArray[1]);
      formDataUpdate.append('docNameUpdate', docNameUpdate.value);
      locking.value === 'lock' ? formDataUpdate.append('locking', 0) : formDataUpdate.append('locking', 1);
      formDataUpdate.append('arrange', arrange.value);
      updateDocFunc(API);
      return showSuccess('Đăng lộ trình học thành công');
    }
  };
  var updateDocFunc = function updateDocFunc(file) {
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
    if (_.isEmpty(addInLearnChange.value)) return showError('Không được để trống tên bài học'); else if (_.isEmpty(addInCourseChange.value)) return showError('Không được để trống phần khóa học'); else if (_.isEmpty(docNameUpdate.value)) return showError('Không được để trống phần tên bài đọc'); else if (_.isEmpty(locking.value)) return showError('Không được để trống phần mở khóa bài đọc'); else if (_.isEmpty(arrange.value)) return showError('Không được để trống phần sắp xếp bài đọc'); else if (_.isEmpty(imageUpdate.value)) return showError('Không được để trống Image');
    if (addInLearnChange.value && docNameUpdate.value && locking.value && arrange.value && addInCourseChange.value) {
      var addInLearnChunkArray = addInLearnChange.value.split('$');
      formDataUpdate.append('addInLearnChange', addInLearnChunkArray[1]);
      var addInCourseChunkArray = addInCourseChange.value.split('$');
      formDataUpdate.append('addInCourseChange', addInCourseChunkArray[1]);
      formDataUpdate.append('docNameUpdate', docNameUpdate.value);
      locking.value === 'lock' ? formDataUpdate.append('locking', 0) : formDataUpdate.append('locking', 1);
      formDataUpdate.append('arrange', arrange.value);
      PostRouteImageChangeFunc(APIImageChange);
      return showSuccess('Tải ảnh lên thành công');
    }
  };
  var validateImage = function validateImage() {
    imageUpdate.addEventListener('change', function (e) {
      e.preventDefault();
      var file = e.target.files[0];
      // let id = document.getElementById('idRoute').innerText;
      if (file.size > 20000000) return showError('Limit 20mb'); else if (!file) return showError('Not a valid file'); else if (file.type === 'application/pdf') {
        formImageCourseUpdate.append('pdfDocUpdate', file);
        return showSuccess('Chọn file thành công');
      } else return showError('Valid format PDF');
    });
  };
  var PostRouteImageChangeFunc = function PostRouteImageChangeFunc(file) {
    fetch(file, {
      method: 'POST',
      body: formImageCourseUpdate
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
      btnUpdateCourse(btnUpdate);
    })["catch"](function (err) {
      return console.log(err);
    });
  };
  var PutCourseFunc = function PutCourseFunc(file) {
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
  var btnUpdateCourse = function btnUpdateCourse(btnUpdate) {
    btnUpdate.addEventListener('click', function (e) {
      e.preventDefault();
      PutCourseFunc(API);
      showSuccess('Đăng lộ trình thành công');
      // return window.location.reload();
    });
  };

  nextBtnUpdateImage();
  validateImage();
};