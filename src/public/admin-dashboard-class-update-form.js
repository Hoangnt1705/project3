const API = 'http://localhost/router/api/admin-dashboard/class/update/';
let formUpdate = document.getElementById('formUpdate');
let className = document.getElementById('formUpdate').className;
let typeClass = document.getElementById('formUpdate').typeClass;
let startCeremony = document.getElementById('formUpdate').startCeremony;
let endDate = document.getElementById('formUpdate').endDate;
let setRoute = document.getElementById('formUpdate').setRoute;
let save = document.getElementById('formUpdate').save;
let idClass = document.getElementById('idClass');
let idCheckUpdateRouterStudy = document.getElementById('idCheckUpdateRouterStudy');
let test1 = document.getElementsByClassName('test1');
let formDataUpdate = new FormData();
idCheckUpdateRouterStudy.innerText ? setRoute.value = idCheckUpdateRouterStudy.innerText : setRoute.value = '';
let updateFunc = (save) => {
    save.addEventListener('click', e => {
        e.preventDefault();
        validateEmptys();
    });
    let validateEmptys = () => {
        if (_.isEmpty(className.value)) return showError('Không được để trống phần tên lớp');
        else if (_.isEmpty(typeClass.value)) return showError('Không được để trống phần loại lớp học');
        else if (_.isEmpty(startCeremony.value)) return showError('Không được để trống phần thời gian bắt đầu lớp học');
        else if (_.isEmpty(endDate.value)) return showError('Không được để trống phần thời gian kết thúc lớp học');
        else if (_.isEmpty(setRoute.value)) return showError('Không được để trống phần thêm lộ trình lớp học');
        if (className.value && typeClass.value && startCeremony.value) {
            formDataUpdate.append('className', className.value);
            formDataUpdate.append('typeClass', typeClass.value);
            formDataUpdate.append('startCeremony', startCeremony.value);
            formDataUpdate.append('endDate', endDate.value);
            formDataUpdate.append('setRoute', setRoute.value);
            updateRouteStudyFunc(API);
            return showSuccess('Đăng lộ trình học thành công');
        }
    };
    let updateRouteStudyFunc = (file) => {
        fetch(file + idClass.innerText, {
            method: 'PUT',
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
