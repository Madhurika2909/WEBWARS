document.addEventListener("DOMContentLoaded", () => {
  const giveFoodButton = document.getElementById("give-food");
  const buyFoodButton = document.getElementById("buy-food");
  const giveFoodSection = document.getElementById("give-food-section");
  const buyFoodSection = document.getElementById("buy-food-section");
  const landingPage = document.getElementById("landing-page");
  const giveFoodForm = document.getElementById("give-food-form");
  const foodList = document.getElementById("food-list");

  // Food data storage
  let foodItems = [];

  // Show Give Food Section
  giveFoodButton.addEventListener("click", () => {
    landingPage.classList.add("hidden");
    giveFoodSection.classList.remove("hidden");
  });

  // Show Buy Food Section
  buyFoodButton.addEventListener("click", () => {
    landingPage.classList.add("hidden");
    renderFoodItems();
    buyFoodSection.classList.remove("hidden");
  });

  // Handle food submission
  giveFoodForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Form validation
    const name = document.getElementById("giver-name").value.trim();
    const type = document.getElementById("food-type").value.trim();
    const location = document.getElementById("location").value.trim();
    const quantity = document.getElementById("quantity").value.trim();
    const madeDate = document.getElementById("made-date").value.trim();
    const expiryDate = document.getElementById("expiry-date").value.trim();

    if (!name || !type || !location || !quantity || !madeDate || !expiryDate) {
      alert("All fields are required!");
      return;
    }

    if (isNaN(quantity) || quantity <= 0) {
      alert("Quantity must be a positive number.");
      return;
    }

    const newFood = {
      id: Date.now(),
      name: name,
      type: type,
      location: location,
      quantity: quantity,
      madeDate: madeDate,
      expiryDate: expiryDate,
    };

    foodItems.push(newFood);
    alert("Food uploaded successfully!");
    giveFoodForm.reset();
    landingPage.classList.remove("hidden");
    giveFoodSection.classList.add("hidden");
  });

  // Render food items dynamically
  function renderFoodItems() {
    foodList.innerHTML = ""; // Clear existing items
    foodItems.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("food-item");

      listItem.innerHTML = `
        <p><strong>Name:</strong> ${item.name}</p>
        <p><strong>Type:</strong> ${item.type}</p>
        <p><strong>Location:</strong> ${item.location}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Made Date:</strong> ${item.madeDate}</p>
        <p><strong>Expiry Date:</strong> ${item.expiryDate}</p>
        <button class="buy-button" data-id="${item.id}">Buy</button>
      `;

      foodList.appendChild(listItem);
    });

    // Add event listeners for "Buy" buttons
    document.querySelectorAll(".buy-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const foodId = parseInt(e.target.getAttribute("data-id"));
        foodItems = foodItems.filter((item) => item.id !== foodId);
        renderFoodItems();
      });
    });
  }
});
