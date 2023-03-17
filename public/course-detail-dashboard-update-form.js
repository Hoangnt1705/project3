const API = 'http://localhost:3000/router/api/admin-dashboard/course-detail/update/';
let formUpdate = document.getElementById('formUpdate');
let id = document.getElementById('id');
let formDataUpdate = new FormData();
let addInCourseChange = document.getElementById('formUpdate').addInCourseChange;
let courseNameUpdate = document.getElementById('formUpdate').courseNameUpdate;
let weLearn = document.getElementById('formUpdate').weLearn;
let teacher = document.getElementById('formUpdate').teacher;
let ta = document.getElementById('formUpdate').ta;
let save = document.getElementById('formUpdate').save;
let updateNotImageFunc = (buttonUpdate) => {
    buttonUpdate.addEventListener('click', e => {
        e.preventDefault();
        // validateEmptys()
        console.log('id>>', API + id.innerText);
        validateEmptys();
    });
    let validateEmptys = () => {
        if (_.isEmpty(addInCourseChange.value)) return showError('Không được để trống tên khoá học');
        else if (_.isEmpty(courseNameUpdate.value)) return showError('Không được để trống phần mô tả khóa học');
        else if (_.isEmpty(weLearn.value)) return showError('Không được để trống phần chúng ta học gì');
        else if (_.isEmpty(teacher.value)) return showError('Không được để trống phần giảng viên');
        else if (_.isEmpty(ta.value)) return showError('Không được để trống phần trợ giảng');
        // else if (_.isEmpty(imageUpdate.value)) return showError("Không được để trống Image");
        if (addInCourseChange.value && courseNameUpdate.value && weLearn.value && teacher.value
            && ta.value) {
            let addInCourseChunkArray = addInCourseChange.value.split(':');
            formDataUpdate.append('addInCourseChange', addInCourseChunkArray[1]);
            formDataUpdate.append('courseNameUpdate', courseNameUpdate.value);
            formDataUpdate.append('weLearn', weLearn.value);
            formDataUpdate.append('teacher', teacher.value);
            formDataUpdate.append('ta', ta.value);
            console.log(formDataUpdate.get('addInCourseChange'));
            updateCourseDetailFunc(API);
            return showSuccess('Đăng lộ trình học thành công');
        }
    };
    let updateCourseDetailFunc = (file) => {
        let APIPut = file + id.innerText;
        fetch(APIPut, {
            method: 'PUT',
            body: formDataUpdate
        })
            .then(response => console.log(response))
            .catch(err => console.log(err));
    };
};
updateNotImageFunc(save);
