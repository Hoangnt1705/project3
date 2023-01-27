const API = 'http://localhost:3000/router/api/admin-dashboard/route-study/update/';
const APIImageChange = 'http://localhost:3000/router/api/admin-dashboard/route-study/post/image-change'
let formUpdate = document.getElementById('formUpdate');
let routeNameUpdate = document.getElementById('formUpdate').routeNameUpdate;
let descriptionUpdate = document.getElementById('formUpdate').descriptionUpdate;
let totalTimeUpdate = document.getElementById('formUpdate').totalTimeUpdate;
let stepImage = document.getElementById('formUpdate').stepImage;
let container = document.getElementById('container');
let id = document.getElementById('id');
let formDataUpdate = new FormData();
let formImageUpdate = new FormData();
stepImage.addEventListener('click', e => {
    e.preventDefault();
    let DIVStepImage = document.createElement('div');
    DIVStepImage.innerHTML = `
    <h2> Bạn có muốn thêm Image ?</h2>
    <button id="yes">Yes</button>
    <button id="no">No</button>
    `
    container.append(DIVStepImage);
    stepImage.style.display = "none";
    const yes = document.getElementById('formUpdate').yes;
    const no = document.getElementById('formUpdate').no;
    return htmlUpdate(container, yes, no, DIVStepImage);
});
let htmlUpdate = (container, yes, no, DIVStepImage) => {
    yes.addEventListener('click', e => {
        e.preventDefault();
        let htmlImage = document.createElement('div');
        htmlImage.innerHTML = `<div>
            <label for="imageUpdate">Image Route:</label>
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
    })
    no.addEventListener('click', e => {
        e.preventDefault();
        let htmlSubmit = document.createElement('div');
        htmlSubmit.innerHTML = `<button id="buttonUpdate">Save</button>`;
        container.append(htmlSubmit);
        DIVStepImage.style.display = 'none';
        let buttonUpdate = document.getElementById('formUpdate').buttonUpdate;
        return updateNotImageFunc(buttonUpdate);
    })
}
let updateNotImageFunc = (buttonUpdate) => {
    buttonUpdate.addEventListener('click', e => {
        e.preventDefault();
        // validateEmptys()
        console.log("id>>", API + id.innerText);
        validateEmptys();
    });
    let validateEmptys = () => {
        if (_.isEmpty(routeNameUpdate.value)) return showError("Không được để trống tên lộ trình");
        else if (_.isEmpty(descriptionUpdate.value)) return showError("Không được để trống phần mô tả");
        else if (_.isEmpty(totalTimeUpdate.value)) return showError("Không được để trống tổng thời gian học");
        // else if (_.isEmpty(imageUpdate.value)) return showError("Không được để trống Image");
        if (routeNameUpdate.value && descriptionUpdate.value && totalTimeUpdate.value) {
            formDataUpdate.append("routeNameUpdate", routeNameUpdate.value);
            formDataUpdate.append("descriptionUpdate", descriptionUpdate.value);
            formDataUpdate.append("totalTimeUpdate", totalTimeUpdate.value);
            console.log(formDataUpdate.get("totalTimeUpdate"));
            updateRouteStudyFunc(API);
            return showSuccess("Đăng lộ trình học thành công");
        };
    };
    let updateRouteStudyFunc = (file) => {
        let APIPut = file + id.innerText;
        fetch(APIPut, {
            method: "PUT",
            body: formDataUpdate
        })
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }
}

///////////////////////////..................................................................
let updateHasImageFunc = (container, stepUpdateImage, imageUpdate) => {
    let nextBtnUpdateImage = () => {
        stepUpdateImage.addEventListener('click', e => {
            e.preventDefault();
            validateEmptys();
        });
    };
    let validateEmptys = () => {
        if (_.isEmpty(routeNameUpdate.value)) return showError("Không được để trống tên lộ trình");
        else if (_.isEmpty(descriptionUpdate.value)) return showError("Không được để trống phần mô tả");
        else if (_.isEmpty(totalTimeUpdate.value)) return showError("Không được để trống tổng thời gian học");
        else if (_.isEmpty(imageUpdate.value)) return showError("Không được để trống Image");
        if (routeNameUpdate.value && descriptionUpdate.value && totalTimeUpdate.value) {
            formDataUpdate.append("routeNameUpdate", routeNameUpdate.value);
            formDataUpdate.append("descriptionUpdate", descriptionUpdate.value);
            formDataUpdate.append("totalTimeUpdate", totalTimeUpdate.value);
            console.log(formDataUpdate.get("totalTimeUpdate"));
            PostRouteImageChangeFunc(APIImageChange);
            return showSuccess("Tải ảnh lên thành công");
        };
    };

    let PostRouteImageChangeFunc = (file) => {
        fetch(file, {
            method: "POST",
            body: formImageUpdate
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let createTableReturnImage = document.createElement("table");
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
            <button id="btnUpdate">Finish</button>`
                container.append(createTableReturnImage);
                let btnUpdate = document.getElementById('formUpdate').btnUpdate;
                let imagePut = document.getElementById('imagePut');
                formDataUpdate.append('imageUpdate', imagePut.innerText);
                btnUpdateRoute(btnUpdate);
                console.log(imagePut.innerText);
                console.log(routeNameUpdate.value);
                console.log(descriptionUpdate.value);
                console.log(totalTimeUpdate.value);
            })
            .catch(err => console.log(err));
    };
    let validateImage = () => {
        imageUpdate.addEventListener('change', e => {
            e.preventDefault();
            let file = e.target.files[0];
            if (file.size > 20000000) return showError("Limit 20mb")
            else if (!file) return showError("Not a valid file")
            else if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
                formImageUpdate.append("imageUpdate", file);
                console.log(formImageUpdate.get("imageUpdate"));
                return showSuccess("Chọn ảnh thành công")
            }
            else return showError("Valid format Image");
        });
    };
    let PutRouteFunc = (file) => {
        let APIPut = file + id.innerText;
        fetch(APIPut, {
            method: "PUT",
            body: formDataUpdate
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

            })
            .catch(err => console.log(err));
    };
    let btnUpdateRoute = (btnUpdate) => {
        btnUpdate.addEventListener('click', e => {
            e.preventDefault();
            PutRouteFunc(API);
            showSuccess("Đăng lộ trình thành công");
        })
    };
    nextBtnUpdateImage();
    validateImage();
}

