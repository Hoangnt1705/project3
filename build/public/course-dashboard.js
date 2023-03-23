"use strict";

var API = 'http://localhost/router/api/admin-dashboard/course/post/';
var APIImage = 'http://localhost/router/api/admin-dashboard/course/post/image';
var formPostCourse = document.getElementById('formPostCourse');
var formSubmitImage = document.getElementById('formSubmitImage');
var courseName = document.getElementById('formPostCourse').courseName;
var descriptionCourse = document.getElementById('formPostCourse').descriptionCourse;
var levelCourse = document.getElementById('formPostCourse').levelCourse;
var timeLearnCourse = document.getElementById('formPostCourse').timeLearnCourse;
var addInrouteStudy = document.getElementById('formPostCourse').addInrouteStudy;
var imageCourse = document.getElementById('formSubmitImage').imageCourse;
var nextFormText = document.getElementById('formPostCourse').nextFormText;
var nextFormImage = document.getElementById('formSubmitImage').nextFormImage;
var artReturnText = document.getElementById('artReturnText');
var footerImage = document.getElementById('footerImage');
var mainFormText = document.getElementById('mainFormText');
var artImage = document.getElementById('artImage');
var optRoute = document.querySelectorAll('.optRoute');
var formData = new FormData();
var formImage = new FormData();
footerImage.style.display = 'none';
var nextBtnText = function nextBtnText() {
  nextFormText.addEventListener('click', function (e) {
    e.preventDefault();
    return validateEmptys();
  });
};
var validateEmptys = function validateEmptys() {
  if (_.isEmpty(courseName.value)) return showError('Không được để trống tên lộ trình'); else if (_.isEmpty(descriptionCourse.value)) return showError('Không được để trống phần mô tả'); else if (_.isEmpty(levelCourse.value)) return showError('Không được để trống cấp độ học'); else if (_.isEmpty(timeLearnCourse.value)) return showError('Không được để trống thời gian học'); else if (_.isEmpty(addInrouteStudy.value)) return showError('Không được để trống thêm khóa học vào lộ trình');
  if (courseName.value && descriptionCourse.value && levelCourse.value && timeLearnCourse.value && addInrouteStudy.value) {
    formData.append('courseName', courseName.value);
    formData.append('descriptionCourse', descriptionCourse.value);
    formData.append('levelCourse', levelCourse.value);
    formData.append('timeLearnCourse', timeLearnCourse.value);
    var addInrouteStudyChunkArray = addInrouteStudy.value.split(':');
    formData.append('addInrouteStudy', addInrouteStudyChunkArray[1]);
    setTimeout(function () {
      mainFormText.style.display = 'none';
      footerImage.style.display = 'block';
      return dataAfterUploadText();
    }, 2000);
    return showSuccess('Nhập thông tin Lộ trình học thành công');
  }
};
var dataAfterUploadText = function dataAfterUploadText() {
  var createTableReturnFormText = document.createElement('table');
  createTableReturnFormText.innerHTML = "<thead>\n          <tr>\n            <th class=\"thReturnData\">Add Route Study</th>\n            <th class=\"thReturnData\">Name Route Study</th>\n            <th class=\"thReturnData\">Description Course</th>\n            <th class=\"thReturnData\">Level Learn</th>\n            <th class=\"thReturnData\">Time LearnTime</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n          <td>".concat(addInrouteStudy.value, "</td>\n            <td>").concat(courseName.value, "</td>\n            <td>").concat(descriptionCourse.value, "</td>\n            <td>").concat(levelCourse.value, "</td>\n            <td>").concat(timeLearnCourse.value, "</td>\n          </tr>\n        </tbody>");
  return artReturnText.append(createTableReturnFormText);
};
var nextBtnImage = function nextBtnImage() {
  nextFormImage.addEventListener('click', function (e) {
    e.preventDefault();
    if (_.isEmpty(imageCourse.value)) return showError('Không được để trống Image'); else {
      PostCourseImageFunc(APIImage);
    }
  });
};
var validateImage = function validateImage() {
  imageCourse.addEventListener('change', function (e) {
    e.preventDefault();
    var file = e.target.files[0];
    // let id = document.getElementById('idRoute').innerText;
    if (file.size > 20000000) return showError('Limit 20mb'); else if (!file) return showError('Not a valid file'); else if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
      formImage.append('imageCourse', file);
      console.log(formImage.get('imageCourse'));
      return showSuccess('Chọn ảnh thành công');
    } else return showError('Valid format Image');
  });
};
var PostCourseImageFunc = function PostCourseImageFunc(file) {
  fetch(file, {
    method: 'POST',
    body: formImage
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    var createTableReturnImage = document.createElement('table');
    footerImage.style.display = 'none';
    createTableReturnImage.innerHTML = "<thead>\n          <tr>\n            <th>Image</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td id=\"imagePost\" style=\"display:none\">".concat(data.url, "</td>\n            <td>\u0110\u01B0\u1EDDng link c\u1EE7a \u1EA3nh <a href=\"").concat(data.url.trim(), "\">Click!</a></td>\n          </tr>\n        </tbody>\n        <button id=\"btnUp\">Finish</button>");
    artImage.append(createTableReturnImage);
    var btnUp = document.getElementById('btnUp');
    var imagePost = document.getElementById('imagePost');
    formData.append('imagePost', imagePost.innerText);
    console.log('success!');
    return btnUpCourse(btnUp);
  })["catch"](function (err) {
    return console.log(err);
  });
};
var PostCourseFunc = function PostCourseFunc(file) {
  fetch(file, {
    method: 'POST',
    body: formData
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
  })["catch"](function (err) {
    return console.log(err);
  });
};
var btnUpCourse = function btnUpCourse(btnUp) {
  btnUp.addEventListener('click', function (e) {
    e.preventDefault();
    PostCourseFunc(API);
    showSuccess('Đăng lộ trình thành công');
  });
};
nextBtnImage();
nextBtnText();
validateImage();

// console.log(courseName, descriptionCourse, addInrouteStudy, levelCourse, timeLearnCourse, imageCourse, optRoute, saveCourse);