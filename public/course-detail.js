const API = 'http://localhost:3000/router/learn/';
let clickviewExercise = document.querySelectorAll(".clickviewExercise");
let displayListDoc = document.querySelectorAll(".displayListDoc");
let level = document.querySelectorAll('.level');
let color = document.querySelectorAll('.color');
let inJoinLearn = document.getElementById("inJoinLearn");
let redirectLearn = document.getElementById("redirectLearn");

inJoinLearn.addEventListener('click', e => {
  e.preventDefault();
  let id = redirectLearn.innerText;
  let idAll = API + id
  window.location.href = idAll;
});
for (let i = 0; i < clickviewExercise.length; i++) {
  clickviewExercise[i].addEventListener('click', e => {
    e.preventDefault();
    console.log(e.target);
    if (clickviewExercise[i].style.transform === "rotate(90deg)") {
      clickviewExercise[i].style.transform = "rotate(0deg)";
      clickviewExercise[i].style.transition = "0.2s linear";
      displayListDoc[i].style.display = "none";
      // listExerciseRunFunc(clickviewExercise[i], "none");

    } else {
      clickviewExercise[i].style.transform = "rotate(90deg)";
      clickviewExercise[i].style.transition = "0.2s linear";
      displayListDoc[i].style.display = "block";
      // listExerciseRunFunc(clickviewExercise[i], "block");

    };
  });
};
for (let i = 0; i < level.length; i++) {
  if (level[i].value === 'Normal') {
    color[i].style.width = '30%';
    color[i].style.background = '#95FF39';
    console.log(color[i]);
  }
  else if (level[i].value === 'Intermediate') {
    color[i].style.width = '65%';
    color[i].style.background = '#ff0';
  }
  else if (level[i].value === 'Advanced') {
    color[i].style.width = '100%';
    color[i].style.background = '#FF0000';
  };
};

