function Service() {
  this.getListProducts = function () {
    return axios({
      url: "https://63140928fc9dc45cb4e895f1.mockapi.io/capbc34_api/phoneItem?fbclid=IwAR2SzcGLn7rrJ5y9yHC4I7A8im2FRDyOF9gVrd2arfvQ7xZQ3_n4ocQFcII",
      method: "GET",
    });
  };
}
