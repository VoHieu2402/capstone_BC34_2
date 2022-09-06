function CartItem(phoneItem, quantity) {
    // property
    this.phoneItem = phoneItem;
    this.quantity = quantity;
    this.totalPaid = this.phoneItem.price * this.quantity;
}