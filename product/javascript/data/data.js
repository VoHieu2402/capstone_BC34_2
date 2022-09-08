function Service() {
  this.getListProducts = function () {
    return axios({
      url: "https://63140928fc9dc45cb4e895f1.mockapi.io/capbc34_api/phoneItem?fbclid=IwAR2SzcGLn7rrJ5y9yHC4I7A8im2FRDyOF9gVrd2arfvQ7xZQ3_n4ocQFcII",
      method: "GET",
    });
  };
}

function Data() {
    this.getLstProduct = function() {
        return axios({
            url: "https://63140928fc9dc45cb4e895f1.mockapi.io/capbc34_api/phoneItem",
            method: "GET",
        });
    };

    this.deleteProductApi = function(id) {
        return axios({
            url: "https://63140928fc9dc45cb4e895f1.mockapi.io/capbc34_api/phoneItem/" + id,
            method: "DELETE",
        });
    };

    this.addProductApi = function(product) {
        return axios({
            url: "https://63140928fc9dc45cb4e895f1.mockapi.io/capbc34_api/phoneItem",
            method: "POST",
            data: product,
        });
    };

    this.getProductById = function(id) {
        return axios({
            url: "https://63140928fc9dc45cb4e895f1.mockapi.io/capbc34_api/phoneItem/" + id,
            method: "GET",
        });
    };

    this.saveProductApi = function(product) {
        return axios({
            url: "https://63140928fc9dc45cb4e895f1.mockapi.io/capbc34_api/phoneItem/" + product.id,
            method: "PUT",
            data: product,
        });
    }
}
