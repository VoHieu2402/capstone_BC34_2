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