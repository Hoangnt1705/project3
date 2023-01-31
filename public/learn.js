let clickviewExercise = document.querySelectorAll(".clickviewExercise");
let displayListDoc = document.querySelectorAll(".displayListDoc");
let dataPDF = document.querySelectorAll(".dataPDF");
let docName =document.querySelectorAll(".docName");
let parentContainPdfs = document.getElementById("parentContainPdfs");
let printPDF = document.createElement("div");
var listExerciseRun = document.querySelectorAll(".listExerciseRun");
var materialItem = document.querySelectorAll(".materialItem");
for (let i = 0; i < listExerciseRun.length; i++) {
    console.log(listExerciseRun[i]);
    listExerciseRun[i].addEventListener("click", e => {
        e.preventDefault();
        console.log(dataPDF[i].innerText);
        printPDF.innerHTML = `<div>
        <center>
        <iframe src="${dataPDF[i].innerText}" width="950" height="700">
        </iframe>
        </center>
        </div>
        <div>
        <div class="learn-name-course d-flex align-items-center justify-content-between p-2" style="display: flex">
          <h4 class="ant-typography">${docName[i].innerText}</h4>
          <div class="ant-space ant-space-horizontal ant-space-align-center learn__btn-option" style="gap: 8px;margin-left: 180px;">
            <div class="ant-space-item" style=""></div>
            <div class="ant-space-item" style=""><button type="button" class="ant-btn ant-btn-default btn-common" style="width: 120px;" disabled=""><span>Hoàn thành bài</span></button></div>
            <div class="ant-space-item" style=""><button type="button" class="ant-btn ant-btn-default btn-common" style="width: 120px;"><span>Bài trước</span></button></div>
            <div class="ant-space-item"><button type="button" class="ant-btn ant-btn-default btn-common" style="width: 120px;"><span>Bài tiếp theo</span></button></div>
          </div>
        </div>
        <div class="ant-row">
          <div class="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-lg-24"></div>
        </div>
      </div>`
        parentContainPdfs.append(printPDF);
        toggleClickControl(listExerciseRun[i])
    });
}
let toggleClickControl = (node) => {
    for (let i = 0; i < listExerciseRun.length; i++) {
        if (listExerciseRun[i] === node) {
            materialItem[i].style.color = "#f00"
        }
        else {
            materialItem[i].style.color = "#333";
        };
    };
};
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

