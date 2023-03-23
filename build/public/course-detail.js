"use strict";

var API = 'http://localhost/router/learn/';
var clickviewExercise = document.querySelectorAll('.clickviewExercise');
var displayListDoc = document.querySelectorAll('.displayListDoc');
var level = document.querySelectorAll('.level');
var color = document.querySelectorAll('.color');
var inJoinLearn = document.getElementById('inJoinLearn');
var redirectLearn = document.getElementById('redirectLearn');
if (inJoinLearn) {
  inJoinLearn.addEventListener('click', function (e) {
    e.preventDefault();
    var id = redirectLearn.innerText;
    var idAll = API + id;
    window.location.href = idAll;
  });
}
var _loop = function _loop(i) {
  clickviewExercise[i].addEventListener('click', function (e) {
    e.preventDefault();
    console.log(e.target);
    if (clickviewExercise[i].style.transform === 'rotate(90deg)') {
      clickviewExercise[i].style.transform = 'rotate(0deg)';
      clickviewExercise[i].style.transition = '0.2s linear';
      displayListDoc[i].style.display = 'none';
      // listExerciseRunFunc(clickviewExercise[i], "none");
    } else {
      clickviewExercise[i].style.transform = 'rotate(90deg)';
      clickviewExercise[i].style.transition = '0.2s linear';
      displayListDoc[i].style.display = 'block';
      // listExerciseRunFunc(clickviewExercise[i], "block");
    }
  });
};
for (var i = 0; i < clickviewExercise.length; i++) {
  _loop(i);
}
for (var _i = 0; _i < level.length; _i++) {
  if (level[_i].value === 'Normal') {
    color[_i].style.width = '30%';
    color[_i].style.background = '#95FF39';
    console.log(color[_i]);
  } else if (level[_i].value === 'Intermediate') {
    color[_i].style.width = '65%';
    color[_i].style.background = '#ff0';
  } else if (level[_i].value === 'Advanced') {
    color[_i].style.width = '100%';
    color[_i].style.background = '#FF0000';
  }
}