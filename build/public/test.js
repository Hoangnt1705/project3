"use strict";

// const form = document.querySelector('#upload-form');
// const pdfFileInput = document.querySelector('#pdf-file');

// form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('pdfFile', pdfFileInput.files[0]);

//     fetch('http://localhost/router/test1', {
//         method: 'POST',
//         body: { 'Content-Type': 'multipart/form-data'},
//         body: formData
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.statusText);
//             }
//         })
//         .then(data => console.log(data))
//         .catch(err => console.log(err));
// });

var form = document.getElementById('pdf-form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  var pdfFile = form.querySelector('input[name="pdfFile"]').files[0];

  // You can also check for file size or type here before uploading
  if (pdfFile.size > 10000000) {
    // 10mb limit
    alert('File size is too large, please select a file less than 10mb');
    return;
  }
  // if (pdfFile.type !== 'application/pdf') {
  //     alert('Please select a PDF file');
  //     return;
  // }

  var formData = new FormData();
  formData.append('pdfFile', pdfFile);
  console.log(formData);

  // send formData to the server
  fetch('http://localhost/router/test1', {
    method: 'POST',
    body: formData
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    // do something with the response from the server
  })["catch"](function (error) {
    console.log(error);
  });
});