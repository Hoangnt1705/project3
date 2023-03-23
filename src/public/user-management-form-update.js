const API = 'http://localhost/router/api/admin-dashboard/user-management/';
const APIImageChange = 'http://localhost/router/api/admin-dashboard/user-management/post/image-change';
let formUpdate = document.getElementById('formUpdate');
let username = document.getElementById('formUpdate').username;
let fullName = document.getElementById('formUpdate').fullName;
let email = document.getElementById('formUpdate').email;
let dob = document.getElementById('formUpdate').dob;
let phoneNumber = document.getElementById('formUpdate').phoneNumber;
let gender = document.getElementById('formUpdate').gender;
let role = document.getElementById('formUpdate').role;
let classBelongs = document.getElementById('formUpdate').classBelongs;
let setRoute = document.getElementById('formUpdate').setRoute;
let stepImage = document.getElementById('formUpdate').stepImage;
let container = document.getElementById('container');
let id = document.getElementById('id');
let formDataUpdate = new FormData();
let formAvataUserUpdate = new FormData();
stepImage.addEventListener('click', e => {
    e.preventDefault();
    let DIVStepImage = document.createElement('div');
    DIVStepImage.innerHTML = `
    <h2> Bạn có muốn thêm Image ?</h2>
    <button id="yes">Yes</button>
    <button id="no">No</button>
    `;
    container.append(DIVStepImage);
    stepImage.style.display = 'none';
    const yes = document.getElementById('formUpdate').yes;
    const no = document.getElementById('formUpdate').no;
    return htmlUpdate(container, yes, no, DIVStepImage);
});
let htmlUpdate = (container, yes, no, DIVStepImage) => {
    yes.addEventListener('click', e => {
        e.preventDefault();
        let htmlImage = document.createElement('div');
        htmlImage.innerHTML = `<div>
            <label for="imageUpdate">Avatar User:</label>
            <input type="file" id="imageUpdate" name="imageUpdate" accept="image/png, image/jpeg, image/jpg" required>
            </div>
            <div>
            <button id="stepUpdateImage">Step</button>
            </div>`;
        container.append(htmlImage);
        DIVStepImage.style.display = 'none';
        let imageUpdate = document.getElementById('formUpdate').imageUpdate;
        let stepUpdateImage = document.getElementById('formUpdate').stepUpdateImage;
        return updateHasImageFunc(container, stepUpdateImage, imageUpdate);
    });
    no.addEventListener('click', e => {
        e.preventDefault();
        let htmlSubmit = document.createElement('div');
        htmlSubmit.innerHTML = '<button id="buttonUpdate">Save</button>';
        container.append(htmlSubmit);
        DIVStepImage.style.display = 'none';
        let buttonUpdate = document.getElementById('formUpdate').buttonUpdate;
        return updateNotImageFunc(buttonUpdate);
    });
};

let updateNotImageFunc = (buttonUpdate) => {
    buttonUpdate.addEventListener('click', e => {
        e.preventDefault();
        console.log('id>>', API + id.innerText);
        validateEmptys();
    });
    let validateEmptys = () => {
        if (_.isEmpty(username.value)) return showError('Không được để trống tên tài khoản');
        else if (_.isEmpty(fullName.value)) return showError('Không được để trống họ và tên');
        else if (_.isEmpty(email.value)) return showError('Không được để trống email');
        else if (_.isEmpty(dob.value)) return showError('Không được để trống ngày sinh');
        else if (_.isEmpty(phoneNumber.value)) return showError('Không được để trống số điện thoại');
        else if (_.isEmpty(gender.value)) return showError('Không được để trống giới tính');
        else if (_.isEmpty(role.value)) return showError('Không được để trống phân quyền');
        else if (_.isEmpty(classBelongs.value)) return showError('Không được để trống lớp của học sinh');
        else if (_.isEmpty(setRoute.value)) return showError('Không được để trống lộ trình học của học viên');
        // else if (_.isEmpty(imageUpdate.value)) return showError("Không được để trống Image");
        if (username.value && fullName.value && email.value && dob.value
            && phoneNumber.value && gender.value && role.value && setRoute.value) {
            let setRouteChunkArray = setRoute.value.split(':');
            formDataUpdate.append('username', username.value);
            formDataUpdate.append('fullName', fullName.value);
            formDataUpdate.append('email', email.value);
            formDataUpdate.append('dob', dob.value);
            formDataUpdate.append('phoneNumber', phoneNumber.value);
            formDataUpdate.append('gender', gender.value);
            formDataUpdate.append('role', role.value);
            formDataUpdate.append('classBelongs', classBelongs.value);
            formDataUpdate.append('setRoute', setRouteChunkArray[1]);
            console.log(formDataUpdate.get('username'));
            updateUserFunc(API);
            return showSuccess('Đăng lộ trình học thành công');
        }
    };
    let updateUserFunc = (file) => {
        let APIPut = file + id.innerText;
        fetch(APIPut, {
            method: 'PUT',
            body: formDataUpdate
        })
            .then(response => console.log(response))
            .catch(err => console.log(err));
    };
};

///////////////////////////..................................................................
let updateHasImageFunc = (container, stepUpdateImage, imageUpdate) => {
    let nextBtnUpdateImage = () => {
        stepUpdateImage.addEventListener('click', e => {
            e.preventDefault();
            validateEmptys();
        });
    };
    let validateEmptys = () => {
        if (_.isEmpty(username.value)) return showError('Không được để trống tên tài khoản');
        else if (_.isEmpty(fullName.value)) return showError('Không được để trống họ và tên');
        else if (_.isEmpty(email.value)) return showError('Không được để trống email');
        else if (_.isEmpty(dob.value)) return showError('Không được để trống ngày sinh');
        else if (_.isEmpty(phoneNumber.value)) return showError('Không được để trống số điện thoại');
        else if (_.isEmpty(gender.value)) return showError('Không được để trống giới tính');
        else if (_.isEmpty(role.value)) return showError('Không được để trống phân quyền');
        else if (_.isEmpty(classBelongs.value)) return showError('Không được để trống lớp của học sinh');
        else if (_.isEmpty(setRoute.value)) return showError('Không được để trống lộ trình học của học viên');
        // else if (_.isEmpty(imageUpdate.value)) return showError("Không được để trống Image");
        if (username.value && fullName.value && email.value && dob.value
            && phoneNumber.value && gender.value && role.value && setRoute.value) {
            let setRouteChunkArray = setRoute.value.split(':');
            formDataUpdate.append('username', username.value);
            formDataUpdate.append('fullName', fullName.value);
            formDataUpdate.append('email', email.value);
            formDataUpdate.append('dob', dob.value);
            formDataUpdate.append('phoneNumber', phoneNumber.value);
            formDataUpdate.append('gender', gender.value);
            formDataUpdate.append('role', role.value);
            formDataUpdate.append('classBelongs', classBelongs.value);
            formDataUpdate.append('setRoute', setRouteChunkArray[1]);
            console.log(formDataUpdate.get('username'));
            PostAvataUserChangeFunc(APIImageChange);
            return showSuccess('Tải ảnh lên thành công');
        }
    };
    let validateImage = () => {
        imageUpdate.addEventListener('change', e => {
            e.preventDefault();
            let file = e.target.files[0];
            if (file.size > 20000000) return showError('Limit 20mb');
            else if (!file) return showError('Not a valid file');
            else if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
                formAvataUserUpdate.append('avataUserUpdate', file);
                console.log(formAvataUserUpdate.get('avataUserUpdate'));
                return showSuccess('Chọn ảnh thành công');
            }
            else return showError('Valid format Image');
        });
    };
    let PostAvataUserChangeFunc = (file) => {
        fetch(file, {
            method: 'POST',
            body: formAvataUserUpdate
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let createTableReturnImage = document.createElement('table');
                createTableReturnImage.innerHTML =
                    `<thead>
              <tr>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id="imagePut" style="display:none">${data.url}</td>
                <td>Đường link của ảnh <a href="${data.url.trim()}">Click!</a></td>
              </tr>
            </tbody>
            <button id="btnUpdate">Finish</button>`;
                container.append(createTableReturnImage);
                let btnUpdate = document.getElementById('formUpdate').btnUpdate;
                let imagePut = document.getElementById('imagePut');
                formDataUpdate.append('imageUpdate', imagePut.innerText);
                btnUpdateAvataUser(btnUpdate);
            })
            .catch(err => console.log(err));
    };
    let PutUserFunc = (file) => {
        let APIPut = file + id.innerText;
        fetch(APIPut, {
            method: 'PUT',
            body: formDataUpdate
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

            })
            .catch(err => console.log(err));
    };
    let btnUpdateAvataUser = (btnUpdate) => {
        btnUpdate.addEventListener('click', e => {
            e.preventDefault();
            PutUserFunc(API);
            showSuccess('Đăng lộ trình thành công');
            // return window.location.reload();
        });
    };
    nextBtnUpdateImage();
    validateImage();
};

