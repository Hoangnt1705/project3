const API = 'http://localhost:3000/router/api/admin-dashboard/learn/post/';
let formUpdate = document.getElementById('formUpdate');
let titleLearn = document.getElementById('formUpdate').titleLearn;
let ratingContent = document.getElementById('formUpdate').ratingContent;
let ratingNumber = document.getElementById('formUpdate').ratingNumber;
let addInCourse = document.getElementById('formUpdate').addInCourse;
let btnUpdate = document.getElementById('formUpdate').btnUpdate;
let formDataUpdate = new FormData();
let updateFunc = (btnUpdate) => {
    btnUpdate.addEventListener('click', e => {
        e.preventDefault();
        console.log("id>>", API + id.innerText);
        validateEmptys();
    });
    let validateEmptys = () => {
        if (_.isEmpty(titleLearn.value)) return showError("Không được để trống tên bài học");
        else if (_.isEmpty(ratingContent.value)) return showError("Không được để trống phần nội dung đánh giá");
        else if (_.isEmpty(ratingNumber.value)) return showError("Không được để trống phần số sao đánh giá");
        else if (_.isEmpty(addInCourse.value)) return showError("Không được để trống phần thêm bài học vào khóa học");
        if (titleLearn.value && ratingContent.value && ratingNumber.value && addInCourse.value) {
            let addInCourseChunkArray = addInCourse.value.split(':')
            formDataUpdate.append("addInCourse", addInCourseChunkArray[1]);
            formDataUpdate.append("titleLearn", titleLearn.value);
            formDataUpdate.append("ratingContent", ratingContent.value);
            formDataUpdate.append("ratingNumber", ratingNumber.value);
            console.log(formDataUpdate.get("totalTimeUpdate"));
            updateRouteStudyFunc(API);
            return showSuccess("Đăng lộ trình học thành công");
        };
    };
    let updateRouteStudyFunc = (file) => {
        fetch(file, {
            method: "POST",
            body: formDataUpdate
        })
            .then(response => console.log(response))
            .catch(err => console.log(err));
    };
};
updateFunc(btnUpdate);