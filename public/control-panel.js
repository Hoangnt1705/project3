
var dashBoardSiderItem = document.querySelectorAll(".dashBoardSiderItem");
var dashboardContent = document.querySelectorAll(".dashboardContent");
for (let i = 0; i < dashBoardSiderItem.length; i++) {
    dashBoardSiderItem[i].addEventListener("click", e => {
        toggleClickControl(dashBoardSiderItem[i])
        toggleClickInControl(dashboardContent[i])
    });
}
let toggleClickControl = (node) => {
    for (let i = 0; i < dashBoardSiderItem.length; i++) {
        if (dashBoardSiderItem[i] === node) {
            node.style.background = "rgb(255 237 237)"
            node.style.borderRadius = "10px"
        }
        else {
            dashBoardSiderItem[i].style.background = "#fff";
        };
    };
};
let toggleClickInControl = (node) => {
    for (let i = 0; i < dashboardContent.length; i++) {
        if (dashboardContent[i] === node) {
            node.style.display = "block";
        }
        else {
            dashboardContent[i].style.display = "none";
        };
    };
};
const app = {
    updateTime() {
        app.timeEl.innerHTML =
            new Date().toLocaleTimeString()
    },

    init() {
        app.timeEl = document.getElementById('time')
        app.updateTime()
        setInterval(app.updateTime, 1000)
    }
}
document.addEventListener("DOMContentLoaded", app.init)
let clickCameraAndAttachedWithChange = document.getElementById("clickCameraAndAttachedWithChange");
let infoPopupChangeImage = document.getElementById("infoPopup");
let popUpButtonCamera = document.getElementById("popUpButton")
infoPopupChangeImage.style.width = "900px";
infoPopupChangeImage.style.height = "680px";
popUpButtonCamera.style.marginLeft = "22rem";
const video = document.getElementById("video");
const canvasChangeImage = document.getElementById("canvasChangeImage");
const snapCamera = document.getElementById("snapCamera");
const constraints = {
    audio: false,
    video: {
        width: 400, height: 400
    }
}
let initWebcam = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleStream(stream)
    } catch (error) {
        console.log(error);
    }
}
let handleStream = (stream) => {
    window.stream = stream;
    video.srcObject = stream
}
var context = canvasChangeImage.getContext("2d");
snapCamera.addEventListener("click", function () {
    context.drawImage(video, 0, 0, 60, 60);
    var image = new Image();
    image.id = "pic"
    image.src = canvasChangeImage.toDataURL("image/png");
    console.log(image.src);
    var button = document.createElement("button");
    button.textContent = "Upload Image";
    document.body.appendChild(button);
    button.onclick = function () {
        const ref = firebase.storage().ref()
        ref.child(new Date() + "-" + "base64").putString(image.src, "data_url")
            .then(function (snapshot) {
                console.log("Image upload");
                alert("Image Uploaded")
            });
    };
});
initWebcam()
// tắt phần camera đi
let popUpButtonOffCamera = document.getElementById("popUpButton");
popUpButtonOffCamera.addEventListener("click", () => {
    infoPopupChangeImage.style.height = "220px";
    infoPopupChangeImage.style.width = "440px";
    popUpButton.style.marginLeft = "8rem";
})

