var service = new Service();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function renderHTML(data) {
  var content = "";
  data.forEach((product, index) => {
    content += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td class="text-right">$${product.price}</td>
                <td>
                    <img width="50px" src=${product.img} />
                    </td>
                <td>${product.desc}</td>
                <td>
                  <button class="btn btn-success" data-toggle="modal"
                  data-target="#myModal" onclick="editProduct(${
                    product.id
                  })">Edit</button>
                  <button class="btn btn-danger" onclick="deleteProduct(${
                    product.id
                  })">Delete</button>
                </td>
            </tr>
        `;
  });
  getEle("tblDanhSachSP").innerHTML = content;
}

function fetchData() {
  service
    .getListProducts()
    .then((result) => {
      renderHTML(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
window.onload = fetchData();

getEle("btnThemSP").addEventListener("click", () => {
  //Edit modal title
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm sản phẩm";
  //create button "Add"
  var btnAdd = `<button class="btn btn-success" onclick="addProduct()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});

//Add product
function addProduct() {
  var name = getEle("TenSP").value;
  var price = getEle("GiaSP").value;
  var img = getEle("HinhSP").value;
  var type = getEle("productType").value;
  var screen = getEle("screen").value;
  var blackCamera = getEle("blackCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var desc = getEle("moTa").value;

  //check validation
  var isValid = validateInputs(name, price, img, type, desc);
  if (isValid) {
    var product = new Product(
      "",
      name,
      price,
      screen,
      blackCamera,
      frontCamera,
      img,
      desc,
      type
    );

    service
      .addProduct(product)
      .then(() => {
        fetchData();
        //close modal
        document.getElementsByClassName("close")[0].click();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

//Delete product
function deleteProduct(id) {
  service
    .deleteProduct(id)
    .then(() => {
      fetchData();
      console.log("ok");
    })
    .catch((error) => {
      console.log(error);
    });
}

function editProduct(id) {
  //Sửa Title
  document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa sản phẩm";

  //Tạo button "update"
  var btnUpdate = `<button class="btn btn-success" onclick="updateProduct(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  service
    .getProduct(id)
    .then((result) => {
      getEle("TenSP").value = result.data.name;
      getEle("GiaSP").value = result.data.price;
      getEle("HinhSP").value = result.data.img;
      getEle("productType").value = result.data.type;
      getEle("screen").value = result.data.screen;
      getEle("blackCamera").value = result.data.blackCamera;
      getEle("frontCamera").value = result.data.frontCamera;
      getEle("moTa").value = result.data.desc;
      console.log(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateProduct(id) {
  var name = getEle("TenSP").value;
  var price = getEle("GiaSP").value;
  var img = getEle("HinhSP").value;
  var type = getEle("productType").value;
  var screen = getEle("screen").value;
  var blackCamera = getEle("blackCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var desc = getEle("moTa").value;

  //check validation
  var isValid = validateInputs(name, price, img, type, desc);

  if (isValid) {
    var product = new Product(
      id,
      name,
      price,
      screen,
      blackCamera,
      frontCamera,
      img,
      desc,
      type
    );

    service
      .updateProduct(product)
      .then(() => {
        fetchData();
        //close modal
        document.getElementsByClassName("close")[0].click();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function validateInputs(name, price, img, type, desc) {
  var isValid = true;
  //Check product name
  isValid &=
    validation.kiemTraRong(name, "tbname", "Vui lòng nhập tên sản phẩm") &&
    validation.kiemTraDoDaiKyTu(
      name,
      "tbname",
      "Vui lòng nhập tên SP từ 8-100 ký tự",
      8,
      100
    );

  //check price
  isValid &=
    validation.kiemTraRong(price, "tbprice", "Vui lòng nhập giá SP!") &&
    validation.kiemTraKyTuSo(price, "tbprice", "Vui lòng nhập ký tự số!");

  //check img
  isValid &= validation.kiemTraRong(img, "tbimg", "Vui lòng nhập hình ảnh!");

  //check type
  isValid &= validation.kiemTraSelection(
    "productType",
    "tbtype",
    "Vui lòng chọn loại SP!"
  );

  //check desc
  isValid &=
    validation.kiemTraRong(desc, "tbdesc", "Vui lòng nhập mô tả!") &&
    validation.kiemTraDoDaiKyTu(
      desc,
      "tbdesc",
      "Vui lòng nhập từ 60-999 ký tự!",
      60,
      999
    );

  return isValid;
}
