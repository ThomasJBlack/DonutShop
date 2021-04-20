import { printInventory } from "./actions/printInventory.js";
import { printRevenue } from "./actions/printRevenue.js";
import { addDonutType } from "./actions/addDonutType.js";
import { addDonuts } from "./actions/addDonuts.js";
import { placeOrder } from "./actions/placeOrder.js";
import { editPrices } from "./actions/editPrices.js";
import { refund } from "./actions/refund.js";
import { createNewShop } from "./actions/createNewShop.js";



// print inventory
document.getElementById("print").addEventListener("click", printInventory);

// print revenue
document.getElementById("revenue").addEventListener("click", printRevenue);

// add new donut type
document.getElementById("newDonut").addEventListener("click", addDonutType);

// add donuts
document.getElementById("addDonuts").addEventListener("click", addDonuts);

// place order
document.getElementById("placeOrder").addEventListener("click", placeOrder);

// edit prices
document.getElementById("editPrices").addEventListener("click", editPrices);

// create a new shop
document.getElementById("newShop").addEventListener("click", createNewShop);

// get a refund
document.getElementById("refund").addEventListener("click", refund);
