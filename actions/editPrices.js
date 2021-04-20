export function editPrices() {
  let donutsCopy = {};
  let output = "On which donut type do you want to edit the price?\n\n";
  let targetType;
  let price;

  fetch("https://donutshop-api.herokuapp.com/inventory?id=414", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      for (let i = 0; i < response.donuts.length; i++) {
        // 1st get api info
        donutsCopy[response.donuts[i].type] = {
          price: response.donuts[i].price,
          count: response.donuts[i].count,
        };
      }
    })
    .then(() => {
      // 2nd do logic
      for (let key of Object.keys(donutsCopy)) {
        output += `${key}\n`;
      }
      targetType = prompt(output);
      price = +prompt(
        "What will the new price be? (enter dollor or dollor.cent amount)"
      );

      if (price < 0) {
        alert("The price cannot be negative. It can be free though!");
        return;
      }

      alert(
        `The new price for ${targetType} is now $${price.toFixed(2)}`
      );
    })
    .then(() => {
      // update api donuts
      fetch("https://donutshop-api.herokuapp.com/edit-donut?id=414", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"type":"${targetType}","price":${price}}`, // input the data
      }).catch((err) => {
        console.error(err);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
