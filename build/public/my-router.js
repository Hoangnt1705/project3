"use strict";

// var dashBoardSiderItem = document.querySelectorAll('.dashBoardSiderItem');
// var dashboardContent = document.querySelectorAll('.dashboardContent');
// for (let i = 0; i < dashBoardSiderItem.length; i++) {
//     dashBoardSiderItem[i].addEventListener('click', e => {
//         toggleClickControl(dashBoardSiderItem[i]);
//         toggleClickInControl(dashboardContent[i]);
//     });
// }
// let toggleClickControl = (node) => {
//     for (let i = 0; i < dashBoardSiderItem.length; i++) {
//         if (dashBoardSiderItem[i] === node) {
//             node.style.background = 'rgb(255 237 237)';
//             node.style.borderRadius = '10px';
//         }
//         else {
//             dashBoardSiderItem[i].style.background = '#fff';
//         }
//     }
// };
// let toggleClickInControl = (node) => {
//     for (let i = 0; i < dashboardContent.length; i++) {
//         if (dashboardContent[i] === node) {
//             node.style.display = 'block';
//         }
//         else {
//             dashboardContent[i].style.display = 'none';
//         }
//     }
// };

var completedCourseNumbers = document.getElementById('completedCourseNumbers').innerText;
var totalCourseNumbers = document.getElementById('totalCourseNumbers').innerText;
var colorEnergyCourse = document.getElementById('colorEnergyCourse');
var completionPercentage = parseInt(completedCourseNumbers) / parseInt(totalCourseNumbers) * 100;
console.log(completionPercentage);
colorEnergyCourse.style.width = "".concat(completionPercentage, "%");