export function refund() {
  let donutsCopy = {};
  let output = "What type of donuts did you buy?\n\n";
  let targetType;
  let count;

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
      count = +prompt("How many did you buy?");

      if (count <= 0) {
        alert("You cannot get a refund on zero or negative donuts");
        return;
      }

      alert(
        `Thank you for your service!\n  - Receipt:\n  - ${targetType} x ${count}\n  - Total Refund: $${(
          donutsCopy[targetType].price * count
        ).toFixed(2)}`
      );
    })
    .then(() => {
      // update api donuts
      fetch("https://donutshop-api.herokuapp.com/refund?id=414", {
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
