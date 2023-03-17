const API = 'http://localhost:3000/router/api/admin-dashboard/doc/update/';
const APIImageChange = 'http://localhost:3000/router/api/admin-dashboard/doc/post/image-change';
let formUpdate = document.getElementById('formUpdate');
let addInLearnChange = document.getElementById('formUpdate').addInLearnChange;
let addInCourseChange = document.getElementById('formUpdate').addInCourseChange;
let docNameUpdate = document.getElementById('formUpdate').docNameUpdate;
let locking = document.getElementById('formUpdate').locking;
let arrange = document.getElementById('formUpdate').arrange;
let stepImage = document.getElementById('formUpdate').stepImage;
let container = document.getElementById('container');
let id = document.getElementById('id');
let formDataUpdate = new FormData();
let formImageCourseUpdate = new FormData();
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
            <label for="imageUpdate">Image Course:</label>
            <input type="file" id="imageUpdate" name="imageUpdate" accept="application/pdf,application/vnd.ms-excel" required>
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
        // validateEmptys()
        console.log('id>>', API + id.innerText);
        validateEmptys();
    });
    let validateEmptys = () => {
        if (_.isEmpty(addInLearnChange.value)) return showError('Không được để trống tên bài học');
        else if (_.isEmpty(addInCourseChange.value)) return showError('Không được để trống phần khóa học');
        else if (_.isEmpty(docNameUpdate.value)) return showError('Không được để trống phần tên bài đọc');
        else if (_.isEmpty(locking.value)) return showError('Không được để trống phần mở khóa bài đọc');
        else if (_.isEmpty(arrange.value)) return showError('Không được để trống phần sắp xếp bài đọc');
        // else if (_.isEmpty(imageUpdate.value)) return showError("Không được để trống Image");
        if (addInLearnChange.value && docNameUpdate.value && locking.value && arrange.value && addInCourseChange.value) {
            let addInLearnChunkArray = addInLearnChange.value.split('$');
            formDataUpdate.append('addInLearnChange', addInLearnChunkArray[1]);
            let addInCourseChunkArray = addInCourseChange.value.split('$');
            formDataUpdate.append('addInCourseChange', addInCourseChunkArray[1]);
            formDataUpdate.append('docNameUpdate', docNameUpdate.value);
            locking.value === 'lock' ? formDataUpdate.append('locking', 0) : formDataUpdate.append('locking', 1);
            formDataUpdate.append('arrange', arrange.value);
            updateDocFunc(API);
            return showSuccess('Đăng lộ trình học thành công');
        }
    };
    let updateDocFunc = (file) => {
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
        if (_.isEmpty(addInLearnChange.value)) return showError('Không được để trống tên bài học');
        else if (_.isEmpty(addInCourseChange.value)) return showError('Không được để trống phần khóa học');
        else if (_.isEmpty(docNameUpdate.value)) return showError('Không được để trống phần tên bài đọc');
        else if (_.isEmpty(locking.value)) return showError('Không được để trống phần mở khóa bài đọc');
        else if (_.isEmpty(arrange.value)) return showError('Không được để trống phần sắp xếp bài đọc');
        else if (_.isEmpty(imageUpdate.value)) return showError('Không được để trống Image');
        if (addInLearnChange.value && docNameUpdate.value && locking.value && arrange.value && addInCourseChange.value) {
            let addInLearnChunkArray = addInLearnChange.value.split('$');
            formDataUpdate.append('addInLearnChange', addInLearnChunkArray[1]);
            let addInCourseChunkArray = addInCourseChange.value.split('$');
            formDataUpdate.append('addInCourseChange', addInCourseChunkArray[1]);
            formDataUpdate.append('docNameUpdate', docNameUpdate.value);
            locking.value === 'lock' ? formDataUpdate.append('locking', 0) : formDataUpdate.append('locking', 1);
            formDataUpdate.append('arrange', arrange.value);
            PostRouteImageChangeFunc(APIImageChange);
            return showSuccess('Tải ảnh lên thành công');
        }
    };
    let validateImage = () => {
        imageUpdate.addEventListener('change', e => {
            e.preventDefault();
            let file = e.target.files[0];
            // let id = document.getElementById('idRoute').innerText;
            if (file.size > 20000000) return showError('Limit 20mb');
            else if (!file) return showError('Not a valid file');
            else if (file.type === 'application/pdf') {
                formImageCourseUpdate.append('pdfDocUpdate', file);
                return showSuccess('Chọn file thành công');
            }
            else return showError('Valid format PDF');
        });
    };
    let PostRouteImageChangeFunc = (file) => {
        fetch(file, {
            method: 'POST',
            body: formImageCourseUpdate
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
                btnUpdateCourse(btnUpdate);
            })
            .catch(err => console.log(err));
    };
    let PutCourseFunc = (file) => {
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
    let btnUpdateCourse = (btnUpdate) => {
        btnUpdate.addEventListener('click', e => {
            e.preventDefault();
            PutCourseFunc(API);
            showSuccess('Đăng lộ trình thành công');
            // return window.location.reload();
        });
    };
    nextBtnUpdateImage();
    validateImage();
};