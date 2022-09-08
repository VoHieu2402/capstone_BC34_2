function CartItem(phoneItem, quantity) {
    // property
    this.phoneItem = phoneItem;
    this.quantity = quantity;
    this.totalPaid = this.phoneItem.price * this.quantity;

    // method
    // this.calcTotalPaid = function() {
    //     this.totalPaid = this.phoneItem.price * this.quantity;
    // };
}