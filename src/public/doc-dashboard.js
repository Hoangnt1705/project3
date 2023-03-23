const API = 'http://localhost/router/api/admin-dashboard/doc/post';
const APIImage = 'http://localhost/router/api/admin-dashboard/doc/post/pdf';
let formSubmit = document.getElementById('formSubmit');
let artReturnText = document.getElementById('artReturnText');
let mainImage = document.getElementById('mainImage');
let artImage = document.getElementById('artImage');
let formSubmitImage = document.getElementById('formSubmitImage');
let docName = document.getElementById('formSubmit').docName;
let locking = document.getElementById('formSubmit').locking;
let active = document.getElementById('formSubmit').active;
let detail = document.getElementById('formSubmit').detail;
let course = document.getElementById('formSubmit').course;
let pdfDoc = document.getElementById('formSubmitImage').pdfDoc;
let nextFormImage = document.getElementById('formSubmitImage').nextFormImage;
let mainFormText = document.getElementById('mainFormText');
let nextFormText = document.getElementById('formSubmit').nextFormText;
let reader = new FileReader();
const formData = new FormData();
const formImage = new FormData();
mainImage.style.display = 'none';
let nextBtnText = () => {
    nextFormText.addEventListener('click', e => {
        e.preventDefault();
        validateEmptys();
    });
};
let validateEmptys = () => {
    if (_.isEmpty(docName.value)) return showError('Không được để trống tên tài liệu');
    else if (_.isEmpty(active.value)) return showError('Không được để trống phần mô tả');
    else if (_.isEmpty(locking.value)) return showError('Không được để trống phần chế độ mở khóa tài liệu');
    else if (_.isEmpty(detail.value)) return showError('Không được để trống tổng thời gian học');
    else if (_.isEmpty(course.value)) return showError('Không được để trống phần tên khóa học');
    if (docName.value && active.value && detail.value && locking.value && course.value) {
        let detailChunkArray = detail.value.split('!$');
        formData.append('detail', detailChunkArray[1].trim());
        let courseChunkArray = course.value.split('!$');
        formData.append('course', courseChunkArray[1].trim());
        formData.append('docName', docName.value);
        formData.append('active', active.value);
        locking.value === 'lock' ? formData.append('locking', 1) : formData.append('locking', 0);
        setTimeout(() => {
            mainFormText.style.display = 'none';
            mainImage.style.display = 'block';
            dataAfterUploadText();
        }, 2000);
        return showSuccess('Nhập thông tin Lộ trình học thành công');
    }
};
let dataAfterUploadText = () => {
    let createTableReturnFormText = document.createElement('table');
    createTableReturnFormText.innerHTML = `<thead>
          <tr>
            <th class="thReturnData">Route name</th>
            <th class="thReturnData">Active Doc</th>
            <th class="thReturnData">Add In Course</th>
            <th class="thReturnData">Add In Learn</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${docName.value}</td>
            <td>${active.value}</td>
            <td>${course.value}</td>
            <td>${detail.value}</td>
          </tr>
        </tbody>`;
    return artReturnText.append(createTableReturnFormText);
};

// form image...................................................................................
let nextBtnImage = () => {
    nextFormImage.addEventListener('click', e => {
        e.preventDefault();
        if (_.isEmpty(pdfDoc.value)) return showError('Không được để trống PDF');
        else {
            PostRouteImageFunc(APIImage);
        }
    });
};
let validateImage = () => {
    pdfDoc.addEventListener('change', e => {
        e.preventDefault();
        let file = e.target.files[0];
        // let id = document.getElementById('idRoute').innerText;
        if (file.size > 20000000) return showError('Limit 20mb');
        else if (!file) return showError('Not a valid file');
        else if (file.type === 'application/pdf') {
            formImage.append('pdfDoc', file);
            console.log(formImage.get('pdfDoc'));
            return showSuccess('Chọn file thành công');
        }
        else return showError('Valid format PDF');
    });
};
let PostRouteImageFunc = (file) => {
    fetch(file, {
        method: 'POST',
        body: formImage
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let createTableReturnImage = document.createElement('table');
            mainImage.style.display = 'none';
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
        <button id="btnUp">Finish</button>`;
            artImage.append(createTableReturnImage);
            let btnUp = document.getElementById('btnUp');
            let imagePost = document.getElementById('imagePost');
            formData.append('pdfDoc', imagePost.innerText);
            btnUpRoute(btnUp);
        })
        .catch(err => console.log(err));
};
let PostRouteFunc = (file) => {
    fetch(file, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

        })
        .catch(err => console.log(err));
};
let btnUpRoute = (btnUp) => {
    btnUp.addEventListener('click', e => {
        e.preventDefault();
        PostRouteFunc(API);
        showSuccess('Đăng lộ trình thành công');
    });
};
nextBtnImage();
validateImage();
nextBtnText();