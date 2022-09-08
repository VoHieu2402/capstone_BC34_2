// chỉnh mũi tên tăng số lượng
function increaseCount(a, b, id) {
    var input = b.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    // nếu số lượng đang bằng 0 thì khi chinh mũi tên tăng lên sẽ tăng số lượng lên, đồng thời thêm item vào giỏ hàng
    if(value==0) {
        addToCart(id);
        // save data to local storage
        setLocalStorage();
    } else {
        // nếu số lượng khác 0, tức item đã có trong giỏ hàng -> chỉ cập nhật số lượng
        value++;
        input.value = value;
        myCart.getItemById(id).quantity = value;
        // save data to local storage
        setLocalStorage();
        // cập nhật số lượng ở góc phải màn hình
        document.getElementsByClassName("overlay-num")[0].innerHTML = countQuantity();
    }
};
  
// chỉnh mũi tên giảm số lượng
function decreaseCount(a, b, id) {
    var input = b.nextElementSibling;
    var value = parseInt(input.value, 10);
    if (value > 0) {
        value = isNaN(value) ? 0 : value;
        value--;
        input.value = value;
        myCart.getItemById(id).quantity = value;
        // save data to local storage
        setLocalStorage();
        // cập nhật số lượng ở góc phải màn hình
        document.getElementsByClassName("overlay-num")[0].innerHTML = countQuantity();
        // khi điều chỉnh số lượng về 0 thì xóa khỏi danh sách cart
        if(value==0) {
            myCart.removeItem(id);
            // save data to local storage
            setLocalStorage();
        }
    }
};

function getEle(id) {
    return document.getElementById(id);
};


var dataPhone = new Data();

// lấy dữ liệu và hiển thị dữ liệu từ API
function fetchData() {
    dataPhone
        .getLstProduct()
        .then(function(result){
            renderHTML(result.data);
            // xử lý trong đây để xử lí bất đồng bộ với việc hiển thị thông tin từ local storage ở dưới
    
            // hiển thị thông tin về số lượng từ local storage
            for(var i=0;i<myCart.arr.length;i++) {
                getEle(`input-quantity-${myCart.arr[i].phoneItem.id}`).value = myCart.arr[i].quantity;
            }

            document.getElementsByClassName("overlay-num")[0].innerHTML = countQuantity();

        })
        .catch(function(error){
            console.log(error);
        })
};

function renderHTML(dataLst) {
    var content = "";
    dataLst.forEach(function(product,index){
        content += `
        <div class="col-12 col-md-6 col-lg-4 cardItem">
        <div class="card cardPhone">
          <div class="phone-img">
            <img
              src="${product.img}"
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
                <button class="btnPhone-shadow" onclick="addToCart(${product.id})">
                  <i class="fa fa-shopping-cart"></i>
                  <span>Add to Cart</span>
                </button>
                <div class="counter">
                  <span class="down" onClick="decreaseCount(event, this, ${product.id})"
                    >-</span
                  >
                  <input type="text" value="0" id="input-quantity-${product.id}" />
                  <span class="up" onClick="increaseCount(event, this, ${product.id})"
                    >+</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        `
    })
    getEle("product_content").innerHTML = content;
};

fetchData();

var myCart = new ListOfCarts();
// get local storage
getLocalStorage();

// var myCart = new ListOfCarts();

// // get local storage
// getLocalStorage();

console.log(myCart.arr);

// Hàm set Local Storage
function setLocalStorage() {
    // convert JSON into string
    var dataString = JSON.stringify(myCart.arr);
    // save to Local Storage
    localStorage.setItem("My Cart",dataString);
};

// Hàm get Local Storage
function getLocalStorage() {
    // đưa vào if để kiểm tra xem get được không, nếu get null data thì sẽ k thực thiện function => không báo lỗi
    if(localStorage.getItem("My Cart")) {
        var dataString = localStorage.getItem("My Cart");
        // convert string into JSON
        var dataJSON = JSON.parse(dataString);
        // get data from local storage to listOfStudents.arr
        myCart.arr = dataJSON;
    }
};

// kiểm tra item có trong giỏ hàng chưa
function checkAvailInCart(id,lst) {
    var result = 0;
    for(var i=0;i<lst.length;i++) {
        if(lst[i].phoneItem.id==id) {
            result = 1;
            break;
        } else {
            result = 0;
        }
    }
    return result;
}

// Các tính năng liên quan đến thêm vào giỏ hàng
// 1. Thêm một item vào giỏ hàng
function addToCart(id) {
    dataPhone.getProductById(id)
        .then(function(result){
            // nếu giỏ hàng đang rỗng thì thêm item vào
            if(myCart.arr.length==0) {
                var cartItem = new CartItem(
                    result.data,
                    1
                );
                myCart.addToLst(cartItem);
                // save data to local storage
                setLocalStorage();
            // nếu giỏ hàng không rỗng thì kiểm tra xem item định thêm có trong giỏ hàng chưa
            } else {
                var check = checkAvailInCart(id,myCart.arr);
                // nếu chưa thì thêm vào, nếu rồi thì không cho bấm nút Add To Cart nữa mà chỉ cho điều chỉnh số lượng
                if(check==0) {
                    var cartItem = new CartItem(
                        result.data,
                        1
                    );
                    myCart.addToLst(cartItem);
                    // save data to local storage
                    setLocalStorage();
                }
            }
            // điều chỉnh số lượng ở góc phải màn hình
            document.getElementsByClassName("overlay-num")[0].innerHTML = countQuantity();
            // điều chỉnh số lượng của item ở vị trí mũi tên; nếu số lượng đang là không thì điều chỉnh số lượng lên 1
            if(getEle(`input-quantity-${id}`).value==0) {
                getEle(`input-quantity-${id}`).value = 1;
            }
        })    
        .catch(function(error){
            console.log(error);
        });
};

// 2. Cập nhật số lượng của item
// Hàm đếm số lượng trong giỏ hàng (hàm được sử dụng ở nhiều nơi phía bên trên)
function countQuantity() {
    var totalQuantity = 0;
    for(var i=0;i<myCart.arr.length;i++) {
        totalQuantity += myCart.arr[i].quantity;
    }
    return totalQuantity;
};


// save data to local storage
setLocalStorage();


console.log(myCart.arr);

// var testItem = new Phone(3,"Samsung J6",50,"gud","gud","gud","gud.png","gud","Samsung");
// var test = new CartItem(testItem,2);
// console.log(test);







