export function addDonutType() {
  let inventory;

  let newDonutType = prompt("What type of donut are you adding?");
  let price = +prompt("How much does it cost?");

  fetch("https://donutshop-api.herokuapp.com/create-donut-type?id=414", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{"type":"${newDonutType}","price":${price}}`, // input the data
  })
  .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
}