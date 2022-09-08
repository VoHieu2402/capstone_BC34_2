function Validation() {
  //Kiểm tra nhập hay chưa? hay kiểm tra rỗng
  this.kiemTraRong = function (value, errorId, message) {
    if (value === "") {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = message;
      return false;
    }
    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };

  //Kiểm tra độ dài ký tự
  this.kiemTraDoDaiKyTu = function (value, errorId, message, min, max) {
    var length = value.length;
    if (length < min || length > max) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = message;
      return false;
    }
    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };

  //Kiểm tra dữ liệu nhập vào là ký tự số từ 0-9
  this.kiemTraKyTuSo = function (value, errorId, message) {
    var letter = /^[0-9]+$/;
    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = message;
    return false;
  };

  //Kiểm tra selection
  this.kiemTraSelection = function (selectionId, errorId, message) {
    var selection = getEle(selectionId);
    if (selection.selectedIndex == 0) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = message;
      return false;
    }
    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };
}
