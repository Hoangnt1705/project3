const API = 'http://localhost/router/api/admin-dashboard/course-detail/post';
let formPostCourse = document.getElementById('formPostCourse');
let id = document.getElementById('id');
let formDataUpdate = new FormData();
let addInCourse = document.getElementById('formPostCourse').addInCourse;
let descriptionDetail = document.getElementById('formPostCourse').descriptionDetail;
let weLearn = document.getElementById('formPostCourse').weLearn;
let teacher = document.getElementById('formPostCourse').teacher;
let ta = document.getElementById('formPostCourse').ta;
let save = document.getElementById('formPostCourse').save;
let postNotImageFunc = (buttonUpdate) => {
    buttonUpdate.addEventListener('click', e => {
        e.preventDefault();
        // validateEmptys()
        validateEmptys();
    });
    let validateEmptys = () => {
        if (_.isEmpty(addInCourse.value)) return showError('Không được để trống tên khóa học');
        else if (_.isEmpty(descriptionDetail.value)) return showError('Không được để trống phần mô tả');
        else if (_.isEmpty(weLearn.value)) return showError('Không được để trống phần chúng ta học gì');
        else if (_.isEmpty(teacher.value)) return showError('Không được để trống phần giảng viên');
        else if (_.isEmpty(ta.value)) return showError('Không được để trống phần trợ giảng');
        // else if (_.isEmpty(imageUpdate.value)) return showError("Không được để trống Image");
        if (addInCourse.value && descriptionDetail.value && weLearn.value && teacher.value
            && ta.value) {
            let addInCourseChunkArray = addInCourse.value.split(':');
            formDataUpdate.append('addInCourse', addInCourseChunkArray[1]);
            formDataUpdate.append('descriptionDetail', descriptionDetail.value);
            formDataUpdate.append('weLearn', weLearn.value);
            formDataUpdate.append('teacher', teacher.value);
            formDataUpdate.append('ta', ta.value);
            postCourseDetailFunc(API);
            return showSuccess('Đăng lộ trình học thành công');
        }
    };
    let postCourseDetailFunc = (file) => {
        let APIPut = file;
        fetch(APIPut, {
            method: 'POST',
            body: formDataUpdate
        })
            .then(response => console.log(response))
            .catch(err => console.log(err));
    };
};
postNotImageFunc(save);
