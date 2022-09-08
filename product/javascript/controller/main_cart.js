// Hàm get Local Storage
function getLocalStorage() {
    // đưa vào if để kiểm tra xem get được không, nếu get null data thì sẽ k thực thiện function => không báo lỗi
    if(localStorage.getItem("My Cart")) {
        var dataString = localStorage.getItem("My Cart");
        // convert string into JSON
        var dataJSON = JSON.parse(dataString);
        // get data from local storage to listOfStudents.arr
        return dataJSON;
    }
};

// Hàm set Local Storage, truyền vào tham số là danh sách giỏ hàng
function setLocalStorage(arrCart) {
    // convert JSON into string
    var dataString = JSON.stringify(arrCart);
    // save to Local Storage
    localStorage.setItem("My Cart",dataString);
};

// function to get element by id
function getEle(id) {
    return document.getElementById(id);
};

// get Local Storage
var myCart = new ListOfCarts();
myCart.arr = getLocalStorage();

// Hàm hiển thị dữ liệu từ cart
function renderHTMLCart(dataLst) {
    var content = "";
    dataLst.forEach(function(product){
        content += `
            <div class="cart-item">
                <div class="row">
                    <div class="item-img">
                        <img src="${product.phoneItem.img}" alt="" />
                    </div>
                    <div class="item-name">
                        <span>${product.phoneItem.name}</span>
                    </div>
                    <div class="item-quantity">
                        <div class="counter">
                            <span class="down" onClick="decreaseCount(event, this, ${product.phoneItem.id})"
                            >-</span
                            >
                            <input type="text" value="${product.quantity}"/>
                            <span class="up" onClick="increaseCount(event, this, ${product.phoneItem.id})"
                            >+</span
                            >
                        </div>
                    </div>
                    <div class="item-amount">
                        <span>${product.phoneItem.price}</span>
                    </div>
                    <div class="item-remove">
                        <button onClick="deleteItemOfCart(${product.phoneItem.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `
    })
    getEle("cartItems").innerHTML = content;
};


// Hàm tính tổng tiền
function calcTotalPaid() {
    var totalPaid = 0;
    for(var i=0;i<myCart.arr.length;i++) {
        totalPaid += myCart.arr[i].phoneItem.price * myCart.arr[i].quantity;
    };
    getEle("totalAmount").innerHTML = totalPaid;
}

// Hàm chỉnh mũi tên tăng số lượng
function increaseCount(a, b, id) {
    var input = b.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
    myCart.getItemById(id).quantity = value;
    // save data to local storage
    setLocalStorage(myCart.arr);
    renderHTMLCart(myCart.arr);
    calcTotalPaid();
};
  
// Hàm chỉnh mũi tên giảm số lượng
function decreaseCount(a, b, id) {
    var input = b.nextElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
    myCart.getItemById(id).quantity = value;
    // save data to local storage
    setLocalStorage(myCart.arr);
    // // khi điều chỉnh số lượng về 0 thì xóa khỏi danh sách cart
    if(value==0) {
        myCart.removeItem(id);
        // save data to local storage
        setLocalStorage(myCart.arr);
    }
    renderHTMLCart(myCart.arr);
    calcTotalPaid();
};

// Hàm xóa một item khỏi giỏ hàng => nút xóa item
function deleteItemOfCart(id) {
    myCart.removeItem(id);
    // save data to local storage
    setLocalStorage(myCart.arr);
    renderHTMLCart(myCart.arr);
    calcTotalPaid();
}

renderHTMLCart(myCart.arr);
calcTotalPaid();