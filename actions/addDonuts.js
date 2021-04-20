export function addDonuts() {
  let donutsCopy = {};
  let output = "What type of donuts do you want to add?\n\n";
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
      count = +prompt("How many would you like to add?");

      console.log("count" + donutsCopy[targetType]);
      if (count == 0) {
        alert("You cannot add zero donuts");
        return;
      }

      alert(
        `You added: ${count} ${targetType} donut(s)`
      );
    })
    .then(() => {
      fetch("https://donutshop-api.herokuapp.com/add-donuts?=&=&id=414", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"type":"${targetType}","count":${count}}`,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}
