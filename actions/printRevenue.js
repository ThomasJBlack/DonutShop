export function printRevenue() {
  fetch("https://donutshop-api.herokuapp.com/revenue?id=414", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      alert(`Shop Revenue: $${response.revenue}`)
    })
    .catch((err) => {
      console.error(err);
    });
}
