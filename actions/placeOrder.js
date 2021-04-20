export function placeOrder() {
  let donutsCopy = {};
  let output = "What type of donuts do you want to buy?\n\n";
  let targetType;
  let count;
  let revenueChange;

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
      console.log(donutsCopy);
    })
    .then(() => {
      // 2nd do logic
      for (let key of Object.keys(donutsCopy)) {
        output += `${key}\n`;
      }
      targetType = prompt(output);
      count = +prompt("How many would you like to buy?");

      if (count == 0) {
        alert("You cannot buy zero donuts");
        return;
      }
      if (donutsCopy[targetType].count < count) {
        // makes sure they cant order more then the current stock
        let response =
          "Sorry for the inconvienience, but we do not have the stock for that order.";
        if (donutsCopy[targetType].count > 0) {
          // in case there are some in stock but fewer then they ordered
          response += `\nIf you want you can order our last ${donutsCopy[targetType].count} donut(s) of that type.`;
        }
        alert(response);
        return;
      }

      alert(
        `Thank you for your purchase!\n  - Receipt:\n  - ${targetType} x ${count}\n  - Total: $${(
          donutsCopy[targetType].price * count
        ).toFixed(2)}`
      );
    })
    .then(() => {
      // update api donuts
      fetch("https://donutshop-api.herokuapp.com/place-order?id=414", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"type":"${targetType}","count":${count}}`, // input the data
      }).catch((err) => {
        console.error(err);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
