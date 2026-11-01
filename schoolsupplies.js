const quantities =
document.querySelectorAll(".quantity");

const supplyItems =
document.querySelectorAll(".supplyItem");

const selectedCount =
document.getElementById("selectedCount");

const totalPrice =
document.getElementById("totalPrice");

const buyBtn =
document.getElementById("buyBtn");

supplyItems.forEach(item => {
    item.addEventListener("change", updateSummary);
});

quantities.forEach(quantity => {
    quantity.addEventListener("input", updateSummary);
});

function updateSummary(){

    let count = 0;
    let total = 0;

    supplyItems.forEach(item => {

        if(item.checked){

            count++;

            const quantity =
                item.parentElement
                .querySelector(".quantity").value;

            total +=
                Number(item.dataset.price) *
                Number(quantity);

        }

    });

    selectedCount.textContent = count;
    totalPrice.textContent = total;

}

buyBtn.addEventListener("click", () => {

    const customerName =
        document.getElementById("customerName").value;

    const customerSection =
        document.getElementById("customerSection").value;

    if(customerName === "" || customerSection === ""){

        alert("Please enter your name and section.");
        return;

    }

    let items = [];
    let total = 0;

    supplyItems.forEach(item => {

        if(item.checked){

            const quantity = Number(
                item.parentElement
                    .querySelector(".quantity").value
            );

            const price =
                Number(item.dataset.price);

            items.push({
                name: item.dataset.name,
                quantity: quantity,
                price: price
            });

            total += price * quantity;

        }

    });

    if(items.length === 0){

        alert("Please select at least one item.");
        return;

    }

    const order = {

        orderId:
            "SUP-" + Date.now(),

        customerName,
        customerSection,

        items,

        total,

        status: "Pending"

    };

    let supplyOrders =
        JSON.parse(
            localStorage.getItem("supplyOrders")
        ) || [];

    supplyOrders.push(order);

    localStorage.setItem(
        "supplyOrders",
        JSON.stringify(supplyOrders)
    );

    document.getElementById(
        "supply-success-message"
    ).innerHTML = `
        ✅ School Supplies Order Submitted!

        <br><br>

        <strong>Your Order ID:</strong>

        <br>

        ${order.orderId}

        <br><br>

        ⚠️ Save this Order ID to track your order.

        <br><br>

    <a href="index.html" class="home-btn">
        🏠 Back to Homepage
    </a>

    `;

});