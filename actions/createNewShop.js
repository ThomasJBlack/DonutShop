export function createNewShop() {
    let inventory;
  
    let shopName = prompt("What will the shop be called?");
  
    fetch("https://donutshop-api.herokuapp.com/create-donut-shop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"name":"${shopName}"}`, // input the data
    })
    .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }