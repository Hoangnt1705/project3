const API = 'http://localhost:3000/router/api/admin-dashboard/route-study/post';
const APIImage = 'http://localhost:3000/router/api/admin-dashboard/route-study/post/image';
let formSubmit = document.getElementById('formSubmit');
let artReturnText = document.getElementById('artReturnText');
let mainImage = document.getElementById('mainImage');
let artImage = document.getElementById('artImage');
let formSubmitImage = document.getElementById('formSubmitImage');
let nameRouteStudy = document.getElementById('formSubmit').nameRouteStudy;
let descriptionRouteStudy = document.getElementById('formSubmit').descriptionRouteStudy;
let totalLearnTime = document.getElementById('formSubmit').totalLearnTime;
let imageRouteStudy = document.getElementById('formSubmitImage').imageRouteStudy;
let nextFormImage = document.getElementById('formSubmitImage').nextFormImage;
let mainFormText = document.getElementById('mainFormText');
let nextFormText = document.getElementById('formSubmit').nextFormText;
let reader = new FileReader();
const formData = new FormData();
const formImage = new FormData();
mainImage.style.display = "none";
// let getBase64 = (file) => {
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//         console.log(reader.result);
//     }
//     reader.onerror = (err) => {
//         console.log("Error:", err);
//     }
// }
// form text......................................................................................
let nextBtnText = () => {
    nextFormText.addEventListener('click', e => {
        e.preventDefault();
        validateEmptys();
    });
};
let validateEmptys = () => {
    if (_.isEmpty(nameRouteStudy.value)) return showError("Không được để trống tên lộ trình");
    else if (_.isEmpty(descriptionRouteStudy.value)) return showError("Không được để trống phần mô tả");
    else if (_.isEmpty(totalLearnTimeRouteStudy.value)) return showError("Không được để trống tổng thời gian học");
    if (nameRouteStudy.value && descriptionRouteStudy.value && totalLearnTimeRouteStudy.value) {
        formData.append("nameRouteStudy", nameRouteStudy.value);
        formData.append("descriptionRouteStudy", descriptionRouteStudy.value);
        formData.append("totalLearnTimeRouteStudy", totalLearnTimeRouteStudy.value);
        setTimeout(() => {
            mainFormText.style.display = "none";
            mainImage.style.display = "block";
            dataAfterUploadText();
        }, 2000);
        return showSuccess("Nhập thông tin Lộ trình học thành công");
    };
};
let dataAfterUploadText = () => {
    let createTableReturnFormText = document.createElement('table');
    createTableReturnFormText.innerHTML = `<thead>
          <tr>
            <th class="thReturnData">Name Route Study</th>
            <th class="thReturnData">Title Route Study</th>
            <th class="thReturnData">Total Learn Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${nameRouteStudy.value}</td>
            <td>${descriptionRouteStudy.value}</td>
            <td>${totalLearnTimeRouteStudy.value}</td>
          </tr>
        </tbody>`;
    return artReturnText.append(createTableReturnFormText);
};
// form image...................................................................................
let nextBtnImage = () => {
    nextFormImage.addEventListener('click', e => {
        e.preventDefault();
        if (_.isEmpty(imageRouteStudy.value)) return showError("Không được để trống Image");
        else {
            PostRouteImageFunc(APIImage);
        }
    });
};
let validateImage = () => {
    imageRouteStudy.addEventListener('change', e => {
        e.preventDefault();
        let file = e.target.files[0];
        // let id = document.getElementById('idRoute').innerText;
        if (file.size > 20000000) return showError("Limit 20mb")
        else if (!file) return showError("Not a valid file")
        else if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
            formImage.append("imageRouteStudy", file);
            console.log(formImage.get("imageRouteStudy"));
            return showSuccess("Chọn ảnh thành công")
        }
        else return showError("Valid format Image");
    });
};
let PostRouteImageFunc = (file) => {
    fetch(file, {
        method: "POST",
        body: formImage
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let createTableReturnImage = document.createElement("table");
            mainImage.style.display = "none";
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
            btnUpRoute(btnUp);
            console.log(imagePost.innerText);
            console.log(nameRouteStudy.value);
            console.log(descriptionRouteStudy.value);
            console.log(totalLearnTimeRouteStudy.value);
        })
        .catch(err => console.log(err));
};
let PostRouteFunc = (file) => {
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
let btnUpRoute = (btnUp) => {
    btnUp.addEventListener('click', e => {
        e.preventDefault();
        PostRouteFunc(API);
        showSuccess("Đăng lộ trình thành công");
    })
}
nextBtnImage();
validateImage();
nextBtnText();