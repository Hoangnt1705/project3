"use strict";

var API = 'http://localhost/router/api/admin-dashboard/route-study/post';
var APIImage = 'http://localhost/router/api/admin-dashboard/route-study/post/image';
var formSubmit = document.getElementById('formSubmit');
var artReturnText = document.getElementById('artReturnText');
var mainImage = document.getElementById('mainImage');
var artImage = document.getElementById('artImage');
var formSubmitImage = document.getElementById('formSubmitImage');
var nameRouteStudy = document.getElementById('formSubmit').nameRouteStudy;
var descriptionRouteStudy = document.getElementById('formSubmit').descriptionRouteStudy;
var totalLearnTime = document.getElementById('formSubmit').totalLearnTime;
var imageRouteStudy = document.getElementById('formSubmitImage').imageRouteStudy;
var nextFormImage = document.getElementById('formSubmitImage').nextFormImage;
var mainFormText = document.getElementById('mainFormText');
var nextFormText = document.getElementById('formSubmit').nextFormText;
var reader = new FileReader();
var formData = new FormData();
var formImage = new FormData();
mainImage.style.display = 'none';
// let getBase64 = (file) => {
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//         console.log(reader.result);
//     }
//     reader.onerror = (err) => {
//         console.log("Error:", err);
//     }
// }
// form text......................................................................................
var nextBtnText = function nextBtnText() {
  nextFormText.addEventListener('click', function (e) {
    e.preventDefault();
    validateEmptys();
  });
};
var validateEmptys = function validateEmptys() {
  if (_.isEmpty(nameRouteStudy.value)) return showError('Không được để trống tên lộ trình'); else if (_.isEmpty(descriptionRouteStudy.value)) return showError('Không được để trống phần mô tả'); else if (_.isEmpty(totalLearnTimeRouteStudy.value)) return showError('Không được để trống tổng thời gian học');
  if (nameRouteStudy.value && descriptionRouteStudy.value && totalLearnTimeRouteStudy.value) {
    formData.append('nameRouteStudy', nameRouteStudy.value);
    formData.append('descriptionRouteStudy', descriptionRouteStudy.value);
    formData.append('totalLearnTimeRouteStudy', totalLearnTimeRouteStudy.value);
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
  createTableReturnFormText.innerHTML = "<thead>\n          <tr>\n            <th class=\"thReturnData\">Name Route Study</th>\n            <th class=\"thReturnData\">Title Route Study</th>\n            <th class=\"thReturnData\">Total Learn Time</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>".concat(nameRouteStudy.value, "</td>\n            <td>").concat(descriptionRouteStudy.value, "</td>\n            <td>").concat(totalLearnTimeRouteStudy.value, "</td>\n          </tr>\n        </tbody>");
  return artReturnText.append(createTableReturnFormText);
};
// form image...................................................................................
var nextBtnImage = function nextBtnImage() {
  nextFormImage.addEventListener('click', function (e) {
    e.preventDefault();
    if (_.isEmpty(imageRouteStudy.value)) return showError('Không được để trống Image'); else {
      PostRouteImageFunc(APIImage);
    }
  });
};
var validateImage = function validateImage() {
  imageRouteStudy.addEventListener('change', function (e) {
    e.preventDefault();
    var file = e.target.files[0];
    // let id = document.getElementById('idRoute').innerText;
    if (file.size > 20000000) return showError('Limit 20mb'); else if (!file) return showError('Not a valid file'); else if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
      formImage.append('imageRouteStudy', file);
      console.log(formImage.get('imageRouteStudy'));
      return showSuccess('Chọn ảnh thành công');
    } else return showError('Valid format Image');
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
    formData.append('imagePost', imagePost.innerText);
    btnUpRoute(btnUp);
    console.log(imagePost.innerText);
    console.log(nameRouteStudy.value);
    console.log(descriptionRouteStudy.value);
    console.log(totalLearnTimeRouteStudy.value);
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