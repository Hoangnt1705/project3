let clickviewExercise = document.querySelectorAll(".clickviewExercise");
let listExerciseRun = document.getElementById("listExerciseRun");
clickviewExercise.forEach(element => {
    element.addEventListener('click', e => {
        e.preventDefault();
        if (element.style.transform === "rotate(90deg)")
         {
            element.style.transform = "rotate(0deg)";
            element.style.transition = "0.2s linear";
            listExerciseRun.style.display ="none";
          } else {
            element.style.transform = "rotate(90deg)";
            element.style.transition = "0.2s linear";
            listExerciseRun.style.display ="block";
          };
    });
});
