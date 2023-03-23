"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var house = document.getElementById('house');
  var className = document.getElementById('className');
  var placeholder = document.querySelector('.placeholder');
  var getClassName = document.getElementById('getClassName').innerText;
  house.addEventListener('click', function () {
    className.textContent = getClassName; // Replace 'Your Class Name' with the actual class name from your data
    className.style.display = 'block';
    placeholder.style.display = 'none';
  });
});