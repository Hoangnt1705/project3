const API = 'http://localhost:3000/router/api/admin-dashboard/course/post/';
const APIImage = 'http://localhost:3000/router/api/admin-dashboard/course/post/image';
const formPostCourse = document.getElementById('formPostCourse');
const formSubmitImage = document.getElementById('formSubmitImage');
let courseName = document.getElementById('formPostCourse').courseName;
let descriptionCourse = document.getElementById('formPostCourse').descriptionCourse;
let levelCourse = document.getElementById('formPostCourse').levelCourse;
let timeLearnCourse = document.getElementById('formPostCourse').timeLearnCourse;
let addInrouteStudy = document.getElementById('formPostCourse').addInrouteStudy;
let imageCourse = document.getElementById('formSubmitImage').imageCourse;
let nextFormText = document.getElementById('formPostCourse').nextFormText;
let nextFormImage = document.getElementById('formSubmitImage').nextFormImage;
let artReturnText = document.getElementById('artReturnText');
let footerImage = document.getElementById('footerImage');
let mainFormText = document.getElementById('mainFormText');
let artImage = document.getElementById('artImage');
let optRoute = document.querySelectorAll('.optRoute');
let formData = new FormData();
let formImage = new FormData();
footerImage.style.display = "none";
let nextBtnText = () => {
    nextFormText.addEventListener('click', e => {
        e.preventDefault();
        return validateEmptys();
    });
};
let validateEmptys = () => {
    if (_.isEmpty(courseName.value)) return showError("Không được để trống tên lộ trình");
    else if (_.isEmpty(descriptionCourse.value)) return showError("Không được để trống phần mô tả");
    else if (_.isEmpty(levelCourse.value)) return showError("Không được để trống cấp độ học");
    else if (_.isEmpty(timeLearnCourse.value)) return showError("Không được để trống thời gian học");
    else if (_.isEmpty(addInrouteStudy.value)) return showError("Không được để trống thêm khóa học vào lộ trình");
    if (courseName.value && descriptionCourse.value &&
        levelCourse.value && timeLearnCourse.value && addInrouteStudy.value) {
        formData.append("courseName", courseName.value);
        formData.append("descriptionCourse", descriptionCourse.value);
        formData.append("levelCourse", levelCourse.value);
        formData.append("timeLearnCourse", timeLearnCourse.value);
        let addInrouteStudyChunkArray = addInrouteStudy.value.split(':')
        formData.append("addInrouteStudy", addInrouteStudyChunkArray[1]);
        setTimeout(() => {
            mainFormText.style.display = "none";
            footerImage.style.display = "block";
            return dataAfterUploadText();
        }, 2000);
        return showSuccess("Nhập thông tin Lộ trình học thành công");
    };
};
let dataAfterUploadText = () => {
    let createTableReturnFormText = document.createElement('table');
    createTableReturnFormText.innerHTML = `<thead>
          <tr>
            <th class="thReturnData">Add Route Study</th>
            <th class="thReturnData">Name Route Study</th>
            <th class="thReturnData">Description Course</th>
            <th class="thReturnData">Level Learn</th>
            <th class="thReturnData">Time LearnTime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>${addInrouteStudy.value}</td>
            <td>${courseName.value}</td>
            <td>${descriptionCourse.value}</td>
            <td>${levelCourse.value}</td>
            <td>${timeLearnCourse.value}</td>
          </tr>
        </tbody>`;
    return artReturnText.append(createTableReturnFormText);
};
let nextBtnImage = () => {
    nextFormImage.addEventListener('click', e => {
        e.preventDefault();
        if (_.isEmpty(imageCourse.value)) return showError("Không được để trống Image");
        else {
            PostCourseImageFunc(APIImage);
        }
    });
};
let validateImage = () => {
    imageCourse.addEventListener('change', e => {
        e.preventDefault();
        let file = e.target.files[0];
        // let id = document.getElementById('idRoute').innerText;
        if (file.size > 20000000) return showError("Limit 20mb")
        else if (!file) return showError("Not a valid file")
        else if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
            formImage.append("imageCourse", file);
            console.log(formImage.get("imageCourse"));
            return showSuccess("Chọn ảnh thành công")
        }
        else return showError("Valid format Image");
    });
};
let PostCourseImageFunc = (file) => {
    fetch(file, {
        method: "POST",
        body: formImage
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let createTableReturnImage = document.createElement("table");
            footerImage.style.display = "none";
            createTableReturnImage.innerHTML =
                `<thead>
          <tr>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="imagePost" style="display:none">${data.url}</td>
            <td>Đường link của ảnh <a href="${data.url.trim()}">Click!</a></td>
          </tr>
        </tbody>
        <button id="btnUp">Finish</button>`
            artImage.append(createTableReturnImage);
            let btnUp = document.getElementById('btnUp');
            let imagePost = document.getElementById('imagePost');
            formData.append('imagePost', imagePost.innerText);
            console.log("success!");
            return btnUpCourse(btnUp);
        })
        .catch(err => console.log(err));
};
let PostCourseFunc = (file) => {
    fetch(file, {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

        })
        .catch(err => console.log(err));
};
let btnUpCourse = (btnUp) => {
    btnUp.addEventListener('click', e => {
        e.preventDefault();
        PostCourseFunc(API);
        showSuccess("Đăng lộ trình thành công");
    })
}
nextBtnImage();
nextBtnText();
validateImage();

// console.log(courseName, descriptionCourse, addInrouteStudy, levelCourse, timeLearnCourse, imageCourse, optRoute, saveCourse);