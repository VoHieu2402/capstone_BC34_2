function ListOfCarts() {
    this.arr = [];
    this.addToLst = function(item) {
        this.arr.push(item);
    };
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
}