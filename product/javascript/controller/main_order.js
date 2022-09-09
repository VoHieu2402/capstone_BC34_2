var myOrder = new ListOfCarts();

//render Order
function renderOrderHTML(data) {
  var content = "";
  var totalAmount = 0;
  data.forEach((item) => {
    item.totalPaid = item.quantity * item.phoneItem.price;
    totalAmount += item.totalPaid;
    content += `
      <div class="order-item row">
          <div class="item-name">
              <span class="item-quantity">${item.quantity}</span> x
              <span>${item.phoneItem.name}</span>
          </div>
          <div class="item-amount">
              <span>$ ${item.totalPaid}</span>
          </div>
      </div>
      `;
  });
  getEle("orderItems").innerHTML = content;
  getEle("totalOrderAmount").innerHTML = totalAmount;
}

function getOrder() {
  myOrder.arr = getLocalStorage();
  renderOrderHTML(myOrder.arr);
}

window.onload = getOrder();

getEle("btnOrder").addEventListener("click", () => {
  myOrder.arr = [];
  setLocalStorage(myOrder.arr);
  //   getEle("btnPayment").onclick = () => {
  //     window.location.href = "/product/html/index.html";
  //   };
  $("#myModal").on("hidden.bs.modal", function () {
    window.location.href = "/product/html/index.html";
  });
});
