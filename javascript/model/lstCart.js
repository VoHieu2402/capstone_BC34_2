function ListOfCarts() {
    this.arr = [];

    // method

    // thêm item vào giỏ hàng
    this.addToLst = function(item) {
        this.arr.push(item);
    };

    // tìm index của 1 item trong danh sách
    this.findIndex = function(id) {
        var index = -1;
        this.arr.forEach(function(item,indexItem){
            if(item.phoneItem.id==id) {
                index = indexItem;
            }
        })
        return index;
    };

    // lấy ra một item để xử lý
    this.getItemById = function(id){
        var result = 0;
        for(var i=0;i<this.arr.length;i++) {
            if(this.arr[i].phoneItem.id==id) {
                result = this.arr[i];
                break;
            }
        }
        return result;
    };

    // xóa 1 item
    this.removeItem = function(id) {
        var index = this.findIndex(id);
        this.arr.splice(index,1);
    };
}