export function printInventory() {
  fetch("https://donutshop-api.herokuapp.com/inventory?id=414", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let output = "Donut Inventory\n\n";
      for (let i = 0; i < data.donuts.length; i++) {
        output += `${data.donuts[i].type}\n   - Price: $${data.donuts[
          i
        ].price.toFixed(2)}\n   - Count: ${data.donuts[i].count}\n`;
      }
      alert(output);
    })
    .catch((err) => {
      console.error(err);
    });
}
