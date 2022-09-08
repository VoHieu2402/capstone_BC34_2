var service = new Service();
var productList = [];

//Hàm getElementById
function getEle(id) {
  return document.getElementById(id);
}

//Hàm renderHTML
function renderHTML(data) {
  var content = "";
  data.forEach((product) => {
    content += `
        <div class="col-12 col-md-6 col-lg-4 cardItem">
            <div class="card cardPhone">
                <div class="phone-img">
                    <img
                    src=${product.img}
                    class="card-img-top"
                    alt="..."
                    />
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                    <div>
                        <h3 class="cardPhone__title">${product.name}</h3>
                        <p class="cardPhone__text">${product.type}</p>
                    </div>
                    <div>
                        <h3 class="cardPhone__title">$${product.price}</h3>
                    </div>
                    </div>
                    <div class="d-flex justify-content-between">
                    <div class="cardPhone__rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                    <div>
                        <button class="btnPhone-shadow">
                        <i class="fa fa-shopping-cart"></i>
                        <span>Add to Cart</span>
                        </button>
                        <div class="counter">
                        <span class="down" onClick="decreaseCount(event, this)"
                            >-</span
                        >
                        <input type="text" value="0" />
                        <span class="up" onClick="increaseCount(event, this)"
                            >+</span
                        >
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    `;
  });
  getEle("product_content").innerHTML = content;
}

//Hàm fetchData
function fetchData() {
  service
    .getListProducts()
    .then(function (result) {
      renderHTML(result.data);
      productList = result.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
Window.load = fetchData();

//Xử lý sự kiện onchange của selection loại product
getEle("productFilter").onchange = function () {
  var filterList = [];
  var type = getEle("productFilter").value;
  if (type == "All") {
    renderHTML(productList);
  } else {
    productList.map(function (product) {
      if (product.type == type) {
        filterList.push(product);
      }
    });
    renderHTML(filterList);
  }
};

//hàm filter theo product type
// function filterProducts(arrProducts, type) {
//   return arrProducts.map(function (product) {
//     if (product.type == type) {
//       return product;
//     }
//   });
// }

function increaseCount(a, b) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
}

function decreaseCount(a, b) {
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  if (value > 0) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}
