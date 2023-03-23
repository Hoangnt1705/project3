const API = 'http://localhost/router/api/admin-dashboard/class/create';
let formCreateClass = document.getElementById('formCreateClass');
let className = document.getElementById('formCreateClass').className;
let typeClass = document.getElementById('formCreateClass').typeClass;
let startCeremony = document.getElementById('formCreateClass').startCeremony;
let save = document.getElementById('formCreateClass').save;
let formDataUpdate = new FormData();

let updateFunc = (save) => {
    save.addEventListener('click', e => {
        e.preventDefault();
        console.log('id>>', API + id.innerText);
        validateEmptys();
    });
    let validateEmptys = () => {
        if (_.isEmpty(className.value)) return showError('Không được để trống phần tên lớp');
        else if (_.isEmpty(typeClass.value)) return showError('Không được để trống phần loại lớp học');
        else if (_.isEmpty(startCeremony.value)) return showError('Không được để trống phần thời gian bắt đầu lớp học');
        if (className.value && typeClass.value && startCeremony.value) {
            formDataUpdate.append('className', className.value);
            formDataUpdate.append('typeClass', typeClass.value);
            formDataUpdate.append('startCeremony', startCeremony.value);
            updateRouteStudyFunc(API);
            return showSuccess('Đăng lộ trình học thành công');
        }
    };
    let updateRouteStudyFunc = (file) => {
        fetch(file, {
            method: 'POST',
            body: formDataUpdate
        })
            .then(response => {
                console.log(response);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch(err => console.log(err));
    };
};
updateFunc(save);
