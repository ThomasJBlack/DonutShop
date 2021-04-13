class Donut {
  name;
  price;
  count;
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.count = 0;
  }
}

let inventory = {
  glazed: new Donut("Glazed Donut", 0.88),
  jelly: new Donut("Jelly Filled Donut", 1.1),
  cream: new Donut("Butter-cream Bismark", 1.0),
  maple: new Donut("Maple Bar", 1.0),
  apple: new Donut("Apple Fritter", 1.0),
};
let indexKeys = {
  // simplest way to use the integer input to find inventory key
  1: "glazed",
  2: "jelly",
  3: "cream",
  4: "maple",
  5: "apple",
};

let donutShop = {
  revenue: 0,
};

let quit = false;

while (!quit) {
  let choice = promtOptions();
  switch (choice) {
    case 1:
      printInven();
      break;
    case 2:
      printRevenue();
      break;
    case 3:
      addDonutType();
      break;
    case 4: // Add donuts to inventory
      addToInven();
      break;
    case 5:
      placeOrder();
      break;
    case 6:
      editPrices();
      break;
    case 7:
      quit = true;
      break;
    case null:
    default:
      alert("Invalid choice.");
      break;
  }
}

function promtOptions() {
  return +prompt(`\
   What would you like to do?

   1) Print donut inventory / donut prices
   2) Print revenue
   3) Create new donut type
   4) Add donuts to inventory
   5) Place an order
   6) Edit donut prices
   7) Quit`);
}

function printInven() {
  let output = "Donut Inventory\n\n";
  for (let property in inventory) {
    output += `${inventory[property].name}: $${inventory[
      property
    ].price.toFixed(2)}\n   Count - ${inventory[property].count}\n`;
  }
  alert(output);
}

function printRevenue() {
  alert(`Donut shop revenue: $${donutShop.revenue.toFixed(2)}`);
}

function addDonutType() {
  let newDonutType = prompt("What type of donut are you adding?");
  let price = +prompt("How much does it cost?");
  inventory[newDonutType] = new Donut(newDonutType, price); // adds type to donut inventory

  indexKeys[Object.keys(indexKeys).length + 1] = newDonutType; // adds integer key and type to indexKeys for mapping purposes
  // console.log("index: " + (Object.keys(indexKeys).length + 1));
  // console.log(indexKeys);
}

function addToInven() {
  let output = "What type of donuts do you want to make?\n\n";
  targetIndex = +prompt(displayTypes(output)); // these three prompts are very similar, so i made a func to reuse what is the same

  count = +prompt("How many would you like to add?");

  // let index = 1; // this is without key object... slow and ugly!
  // let targetType;
  // for (let property in inventory) {
  //   if (index === targetIndex) {
  //     targetType = property;
  //     break;
  //   }
  //   index++;
  // }

  let targetType = indexKeys[targetIndex]; // much better!
  inventory[targetType].count += count;
}

function placeOrder() {
  let output = "What type of donuts do you want to buy?\n\n";
  targetIndex = +prompt(displayTypes(output)); // these three prompts are very similar, so i made a func to reuse what is the same

  count = +prompt("How many would you like to buy?");

  let targetType = indexKeys[targetIndex];

  if (inventory[targetType].count < count) {
    // makes sure they cant order more then the current stock
    let response =
      "Sorry for the inconvienience, but we do not have the stock for that order.";
    if (inventory[targetType].count > 0) {
      // in case there are some in stock but fewer then they ordered
      response += `\nIf you want you can order our last ${inventory[targetType].count} donut(s) of that type.`;
    }
    alert(response);
    return;
  }
  inventory[targetType].count -= count;
  donutShop.revenue += inventory[targetType].price * count; // adjusts revenue
  alert(
    `Thank you for your purchase!\n  - Receipt:\n  - ${
      inventory[targetType].name
    } x ${count}\n  - Total: $${(inventory[targetType].price * count).toFixed(
      2
    )}`
  );

  //
  // let index = 1;
  // for (let property in inventory) {
  //   if (index === targetIndex) {
  //     if (inventory[property].count < count) {
  //       // makes sure they cant order more then the current stock
  //       let response =
  //         "Sorry for the inconvienience, but we do not have the stock for that order.";
  //       if (inventory[property].count > 0) {
  //         // in case there are some in stock but fewer then they ordered
  //         response += `\nIf you want you can order our last ${inventory[property].count} donut(s) of that type.`;
  //       }
  //       alert(response);
  //       return;
  //     }
  //     inventory[property].count -= count;
  //     donutShop.revenue += inventory[property].price * count; // adjusts revenue
  //     alert(
  //       `Thank you for your purchase!\n  - Receipt:\n  - ${
  //         inventory[property].name
  //       } x ${count}\n  - Total: $${(inventory[property].price * count).toFixed(
  //         2
  //       )}`
  //     );
  //     break;
  //   }
  //   index++;
  // }
}

function editPrices() {
  let output = "On which donut type do you want to change the price?\n\n";
  targetIndex = +prompt(displayTypes(output)); // these three prompts are very similar, so i made a func to reuse what is the same

  price = +prompt(
    "What will the new price be? (enter dollor or dollor.cent amount)"
  );

  let index = 1;
  let targetType = indexKeys[targetIndex];
  inventory[targetType].price = price;
}

function displayTypes(output) {
  // dont change this because i need to iterate through the object anyway
  let targetIndex = 1;
  for (let property in inventory) {
    output += `${targetIndex}) ${inventory[property].name}\n`;
    targetIndex++;
  }
  return output;
}
