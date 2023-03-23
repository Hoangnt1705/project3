"use strict";

var API = 'http://localhost/router/api/admin-dashboard/doc/post';
var APIImage = 'http://localhost/router/api/admin-dashboard/doc/post/pdf';
var formSubmit = document.getElementById('formSubmit');
var artReturnText = document.getElementById('artReturnText');
var mainImage = document.getElementById('mainImage');
var artImage = document.getElementById('artImage');
var formSubmitImage = document.getElementById('formSubmitImage');
var docName = document.getElementById('formSubmit').docName;
var locking = document.getElementById('formSubmit').locking;
var active = document.getElementById('formSubmit').active;
var detail = document.getElementById('formSubmit').detail;
var course = document.getElementById('formSubmit').course;
var pdfDoc = document.getElementById('formSubmitImage').pdfDoc;
var nextFormImage = document.getElementById('formSubmitImage').nextFormImage;
var mainFormText = document.getElementById('mainFormText');
var nextFormText = document.getElementById('formSubmit').nextFormText;
var reader = new FileReader();
var formData = new FormData();
var formImage = new FormData();
mainImage.style.display = 'none';
var nextBtnText = function nextBtnText() {
  nextFormText.addEventListener('click', function (e) {
    e.preventDefault();
    validateEmptys();
  });
};
var validateEmptys = function validateEmptys() {
  if (_.isEmpty(docName.value)) return showError('Không được để trống tên tài liệu'); else if (_.isEmpty(active.value)) return showError('Không được để trống phần mô tả'); else if (_.isEmpty(locking.value)) return showError('Không được để trống phần chế độ mở khóa tài liệu'); else if (_.isEmpty(detail.value)) return showError('Không được để trống tổng thời gian học'); else if (_.isEmpty(course.value)) return showError('Không được để trống phần tên khóa học');
  if (docName.value && active.value && detail.value && locking.value && course.value) {
    var detailChunkArray = detail.value.split('!$');
    formData.append('detail', detailChunkArray[1].trim());
    var courseChunkArray = course.value.split('!$');
    formData.append('course', courseChunkArray[1].trim());
    formData.append('docName', docName.value);
    formData.append('active', active.value);
    locking.value === 'lock' ? formData.append('locking', 1) : formData.append('locking', 0);
    setTimeout(function () {
      mainFormText.style.display = 'none';
      mainImage.style.display = 'block';
      dataAfterUploadText();
    }, 2000);
    return showSuccess('Nhập thông tin Lộ trình học thành công');
  }
};
var dataAfterUploadText = function dataAfterUploadText() {
  var createTableReturnFormText = document.createElement('table');
  createTableReturnFormText.innerHTML = "<thead>\n          <tr>\n            <th class=\"thReturnData\">Route name</th>\n            <th class=\"thReturnData\">Active Doc</th>\n            <th class=\"thReturnData\">Add In Course</th>\n            <th class=\"thReturnData\">Add In Learn</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>".concat(docName.value, "</td>\n            <td>").concat(active.value, "</td>\n            <td>").concat(course.value, "</td>\n            <td>").concat(detail.value, "</td>\n          </tr>\n        </tbody>");
  return artReturnText.append(createTableReturnFormText);
};

// form image...................................................................................
var nextBtnImage = function nextBtnImage() {
  nextFormImage.addEventListener('click', function (e) {
    e.preventDefault();
    if (_.isEmpty(pdfDoc.value)) return showError('Không được để trống PDF'); else {
      PostRouteImageFunc(APIImage);
    }
  });
};
var validateImage = function validateImage() {
  pdfDoc.addEventListener('change', function (e) {
    e.preventDefault();
    var file = e.target.files[0];
    // let id = document.getElementById('idRoute').innerText;
    if (file.size > 20000000) return showError('Limit 20mb'); else if (!file) return showError('Not a valid file'); else if (file.type === 'application/pdf') {
      formImage.append('pdfDoc', file);
      console.log(formImage.get('pdfDoc'));
      return showSuccess('Chọn file thành công');
    } else return showError('Valid format PDF');
  });
};
var PostRouteImageFunc = function PostRouteImageFunc(file) {
  fetch(file, {
    method: 'POST',
    body: formImage
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    var createTableReturnImage = document.createElement('table');
    mainImage.style.display = 'none';
    createTableReturnImage.innerHTML = "<thead>\n          <tr>\n            <th>Image</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td id=\"imagePost\" style=\"display:none\">".concat(data.url, "</td>\n            <td>\u0110\u01B0\u1EDDng link c\u1EE7a \u1EA3nh <a href=\"").concat(data.url.trim(), "\">Click!</a></td>\n          </tr>\n        </tbody>\n        <button id=\"btnUp\">Finish</button>");
    artImage.append(createTableReturnImage);
    var btnUp = document.getElementById('btnUp');
    var imagePost = document.getElementById('imagePost');
    formData.append('pdfDoc', imagePost.innerText);
    btnUpRoute(btnUp);
  })["catch"](function (err) {
    return console.log(err);
  });
};
var PostRouteFunc = function PostRouteFunc(file) {
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
var btnUpRoute = function btnUpRoute(btnUp) {
  btnUp.addEventListener('click', function (e) {
    e.preventDefault();
    PostRouteFunc(API);
    showSuccess('Đăng lộ trình thành công');
  });
};
nextBtnImage();
validateImage();
nextBtnText();