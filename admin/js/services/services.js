function Service() {
  this.getListProducts = function () {
    return axios({
      url: "https://63140928fc9dc45cb4e895f1.mockapi.io/capbc34_api/phoneItem",
      method: "GET",
    });
  };

  this.deleteProduct = function (id) {
    return axios({
      url: `https://63140928fc9dc45cb4e895f1.mockapi.io/capbc34_api/phoneItem/${id}`,
      method: "DELETE",
    });
  };

  this.addProduct = function (product) {
    return axios({
      url: `https://63140928fc9dc45cb4e895f1.mockapi.io/capbc34_api/phoneItem/${product.id}`,
      method: "POST",
      data: product,
    });
  };

  this.getProduct = function (id) {
    return axios({
      url: `https://63140928fc9dc45cb4e895f1.mockapi.io/capbc34_api/phoneItem/${id}`,
      method: "GET",
    });
  };

  this.updateProduct = function (product) {
    return axios({
      url: `https://63140928fc9dc45cb4e895f1.mockapi.io/capbc34_api/phoneItem/${product.id}`,
      method: "PUT",
      data: product,
    });
  };
}
