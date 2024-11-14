// HTML DOM elements
const itemNameInput = document.getElementById("item-name");
const itemPriceInput = document.getElementById("item-price");
const itemDiscountInput = document.getElementById("item-discount");
const itemQuantityInput = document.getElementById("item-quantity");
const itemForm = document.getElementById("item-form");
const itemsList = document.getElementById("items-list");
const discountBtn = document.getElementById("discount-btn");

// Store items array
let items = [];

// Calculate item total with discount
const calculateItemTotal = (price, quantity, discount = 0) => {
  const subtotal = price * quantity;
  const discountAmount = subtotal * (discount / 100);
  return subtotal - discountAmount;
};

// Add new item
itemForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get current values
  const itemName = itemNameInput.value.trim();
  const itemPrice = parseFloat(itemPriceInput.value);
  const itemQuantity = parseInt(itemQuantityInput.value);
  const itemDiscount = parseFloat(itemDiscountInput.value) || 0;

  // Validate inputs
  if (!itemName || isNaN(itemPrice) || isNaN(itemQuantity)) {
    alert("Please enter valid item details");
    return;
  }

  if (itemPrice <= 0 || itemQuantity <= 0) {
    alert("Price and quantity must be greater than 0");
    return;
  }

  // Add item to array
  items.push({
    name: itemName,
    price: itemPrice,
    quantity: itemQuantity,
    discount: itemDiscount,
    total: calculateItemTotal(itemPrice, itemQuantity, itemDiscount),
  });

  // Reset form
  itemForm.reset();

  // Update display
  listItems();
});

// Apply discount to specific item
function applyDiscount(index) {
  const discount = parseFloat(prompt("Enter discount percentage (0-100):"));

  if (isNaN(discount) || discount < 0 || discount > 100) {
    alert("Please enter a valid discount percentage between 0 and 100");
    return;
  }

  items[index].discount = discount;
  items[index].total = calculateItemTotal(
    items[index].price,
    items[index].quantity,
    discount,
  );

  listItems();
}

// Display all items
function listItems() {
  itemsList.innerHTML = "";

  if (items.length === 0) {
    itemsList.innerHTML = "<p>No items in cart</p>";
    return;
  }

  let cartTotal = 0;

  items.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    const itemDetails = document.createElement("span");
    itemDetails.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            ${item.discount > 0 ? `<br>Discount: ${item.discount}%` : ""}
        `;

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    // Remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeItem(index));

    buttonGroup.appendChild(removeButton);

    itemDiv.appendChild(itemDetails);
    itemDiv.appendChild(buttonGroup);
    itemsList.appendChild(itemDiv);

    cartTotal += item.total;
  });

  // Add cart total
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("cart-total");
  totalDiv.innerHTML = `<strong>Total: $${cartTotal}</strong>`;
  itemsList.appendChild(totalDiv);
}

// Remove an item
function removeItem(index) {
  if (confirm("Are you sure you want to remove this item?")) {
    items.splice(index, 1);
    listItems();
  }
}
