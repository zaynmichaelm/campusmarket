const ordersContainer =
document.getElementById("ordersContainer");

const printingOrdersContainer =
document.getElementById("printingOrdersContainer");

const completedPrintingContainer =
document.getElementById("completedPrintingContainer");

const schoolSuppliesContainer =
document.getElementById("schoolSuppliesContainer");

const completedSuppliesContainer =
document.getElementById("completedSuppliesContainer");

const completedSuppliesTitle =
document.getElementById("completedSuppliesTitle");

const printingTitle =
document.getElementById("printingTitle");

const searchPrintingOrder =
document.getElementById("globalSearch");

const activePrintCount =
document.getElementById("activePrintCount");

const completedPrintCount =
document.getElementById("completedPrintCount");

const foodOrderCount =
document.getElementById("foodOrderCount");

const revenueCount =
document.getElementById("revenueCount");

const foodRevenueCount =
document.getElementById("foodRevenueCount");

const suppliesRevenueCount =
document.getElementById("suppliesRevenueCount");

const totalRevenueCount =
document.getElementById("totalRevenueCount");

const supplyOrderCount =
document.getElementById("supplyOrderCount");

const totalOrderCount =
document.getElementById("totalOrderCount");

const foodOrders =
JSON.parse(localStorage.getItem("foodOrders")) || [];

const completedFoodContainer =
document.getElementById("completedFoodContainer");

const completedFoodTitle =
document.getElementById("completedFoodTitle");

const completedPrintingTitle =
document.getElementById("completedPrintingTitle");

const foodOrdersTitle =
document.getElementById("foodOrdersTitle");

const suppliesOrdersTitle =
document.getElementById("suppliesOrdersTitle");

const activeFoodOrders =
    foodOrders.filter(
        order => order.status !== "Delivered"
    );

const completedFoodOrders =
    foodOrders.filter(
        order => order.status === "Delivered"
    );

if(activeFoodOrders.length === 0){

    ordersContainer.innerHTML = "";

}else{

    activeFoodOrders.forEach(order => {

let itemsHTML = "";

(order.items || []).forEach(item => {

    itemsHTML += `
        <li>
            ${item.name || "Unknown Item"} x${item.quantity || 0}
        </li>
    `;

});



        ordersContainer.innerHTML += `

            <div class="order-card">

                <h3>${order.orderId}</h3>

                <p>
                    <strong>Name:</strong>
                    ${order.customerName || "Unknown Customer"}
                </p>

                <p>
                    <strong>Section:</strong>
                    ${order.customerSection || "Not Specified"}
                </p>

                <p>
                    <strong>Items Ordered:</strong>
                </p>

                <ul>
                    ${itemsHTML}
                </ul>

                
                <p>
                    <strong>Total:</strong>
                    ₱${order.total || 0}
                </p>

                <p>
                    <strong>Status:</strong>

                    <span class="
                    ${order.status === 'Pending' ? 'pending' : ''}
                    ${order.status === 'Accepted' ? 'accepted' : ''}
                    ${order.status === 'Ready For Delivery' ? 'delivery' : ''}
                    ">
                    ${order.status || "Pending"}
                    </span>

</p>

                    ${order.status === "Pending" ? `
                    <button onclick="acceptOrder('${order.orderId}')">
                        Accept Order
                    </button>
            ` : ""}

                    ${order.status === "Accepted" ? `
                    <button onclick="readyForDelivery('${order.orderId}')">
                        Ready For Delivery
                    </button>
            ` : ""}

                    ${order.status === "Ready For Delivery" ? `
                    <button onclick="completeFoodOrder('${order.orderId}')">
                        Mark As Delivered
                    </button>
            ` : ""}

    </div>

            </div>

        `;

    });

}

if(completedFoodOrders.length === 0){

    completedFoodTitle.style.display = "none";

}else{

    completedFoodOrders.forEach(order => {

        let itemsHTML = "";

        (order.items || []).forEach(item => {

            itemsHTML += `
                <li>
                    ${item.name || "Unknown Item"} x${item.quantity || 0}
                </li>
            `;

        });

        completedFoodContainer.innerHTML += `

            <div class="order-card">

                <h3>${order.orderId}</h3>

                <p>
                    <strong>Name:</strong>
                    ${order.customerName || "Unknown Customer"}
                </p>

                <p>
                    <strong>Section:</strong>
                    ${order.customerSection || "Not Specified"}
                </p>

                <p>
                    <strong>Items Ordered:</strong>
                </p>

                <ul>
                    ${itemsHTML}
                </ul>

                <p>
                    <strong>Total:</strong>
                    ₱${order.total || 0}
                </p>

                <p>
                    <strong>Status:</strong>
                    <span class="completed">
                        Delivered
                    </span>
                </p>

            </div>

        `;

    });

}

function acceptOrder(orderId){

    let foodOrders =
        JSON.parse(localStorage.getItem("foodOrders")) || [];

    foodOrders.forEach(order => {

        if(order.orderId === orderId){

            order.status = "Accepted";

        }

    });

    localStorage.setItem(
        "foodOrders",
        JSON.stringify(foodOrders)
    );

    location.reload();

}

function readyForDelivery(orderId){

    let foodOrders =
        JSON.parse(localStorage.getItem("foodOrders")) || [];

    foodOrders.forEach(order => {

        if(order.orderId === orderId){

            order.status = "Ready For Delivery";

        }

    });

    localStorage.setItem(
        "foodOrders",
        JSON.stringify(foodOrders)
    );

    location.reload();

}

function completeFoodOrder(orderId){

    let foodOrders =
        JSON.parse(localStorage.getItem("foodOrders")) || [];

    foodOrders.forEach(order => {

        if(order.orderId === orderId){

            order.status = "Delivered";

        }

    });

    localStorage.setItem(
        "foodOrders",
        JSON.stringify(foodOrders)
    );

    location.reload();

}

const printRequests =
JSON.parse(localStorage.getItem("printRequests")) || [];

const supplyOrders =
JSON.parse(localStorage.getItem("supplyOrders")) || [];

const activeSupplyOrders =
    supplyOrders.filter(
        order => order.status !== "Delivered"
    );

const completedSupplyOrders =
    supplyOrders.filter(
        order => order.status === "Delivered"
    );

if(activeFoodOrders.length === 0){

    foodOrdersTitle.style.display = "none";

}

if(activeSupplyOrders.length === 0){

    suppliesOrdersTitle.style.display = "none";

}

const activePrintOrders =
    printRequests.filter(
        request => request.status !== "Delivered"
    );

printingTitle.innerHTML =
    `🖨 Printing Orders (${activePrintOrders.length})`;

    if(activePrintOrders.length === 0){

    printingTitle.style.display = "none";

}

    const completedPrintOrders =
    printRequests.filter(
        request => request.status === "Delivered"
    );

    if(completedPrintOrders.length === 0){

    completedPrintingTitle.style.display = "none";

}



let printingRevenue = 0;
let foodRevenue = 0;
let suppliesRevenue = 0;

completedPrintOrders.forEach(request => {

    

    let price = 0;

  

    if((request.printType || "").includes("30")){
    price = 30;
}

else if((request.printType || "").includes("15")){
    price = 15;
}

else if((request.printType || "").includes("5")){
    price = 5;
}



    printingRevenue +=
        price * Number(request.copies || 0);

});

foodOrders.forEach(order => {
    if(order.status === "Delivered"){
        foodRevenue += Number(order.total || 0);
    }
});

supplyOrders.forEach(order => {
    if(order.status === "Delivered"){
        suppliesRevenue += Number(order.total || 0);
    }
});

const totalRevenue =
    printingRevenue +
    foodRevenue +
    suppliesRevenue;

activePrintCount.textContent =
    activePrintOrders.length;

completedPrintCount.textContent =
    completedPrintOrders.length;

foodOrderCount.textContent =
    activeFoodOrders.length;

supplyOrderCount.textContent =
    activeSupplyOrders.length;

totalOrderCount.textContent =
    foodOrders.filter(order => order.status === "Delivered").length +
    printRequests.filter(order => order.status === "Delivered").length +
    supplyOrders.filter(order => order.status === "Delivered").length;

revenueCount.textContent =
    `₱${printingRevenue}`;

foodRevenueCount.textContent =
    `₱${foodRevenue}`;

suppliesRevenueCount.textContent =
    `₱${suppliesRevenue}`;

totalRevenueCount.textContent =
    `₱${totalRevenue}`;


if(printRequests.length === 0){

    printingOrdersContainer.innerHTML = "";

}else{

    printRequests.forEach((request, index) => {

        const targetContainer =
    request.status === "Delivered"
        ? completedPrintingContainer
        : printingOrdersContainer;

        console.log(request);

        targetContainer.innerHTML += `

            <div class="order-card">

                <h3>
                    ${request.id || `PRINT-${index + 1}`}
                </h3>

                <p>
                    <strong>Student:</strong>
                    ${request.studentName || "Unknown Student"}
                </p>

                <p>
                    <strong>Grade & Section:</strong>
                    ${request.gradeSection || "Not Specified"}
                </p>

                <p>
                    <strong>Print Type:</strong>
                    ${request.printType || "Unknown Print Type"}
                </p>

                <p>
                    <strong>Copies:</strong>
                    ${request.copies || 0}
                </p>

                <p>
                    <strong>Uploaded File:</strong>
                    ${request.fileName || "No File Uploaded"}
                </p>

                <p>
                    <strong>Document:</strong>
                    ${
                        request.documentUrl
                    ? `<a href="${request.documentUrl}" target="_blank">🔗 Open File</a>`
                    : "No File Uploaded"
                    }
                </p>

                <p>
                    <strong>Notes:</strong>
                    ${request.notes || "No notes provided"}
                </p>

                <p>
                    <strong>Status:</strong>
                    <span class="
                    ${request.status === 'Pending' ? 'pending' : ''}
                    ${request.status === 'Accepted' ? 'accepted' : ''}
                    ${request.status === 'Ready For Delivery' ? 'delivery' : ''}
                    ${request.status === 'Delivered' ? 'completed' : ''}
                    ">
                    ${request.status || "Pending"}
                    </span>

                </p>

                    ${
                (request.status || "Pending") === "Pending"
                ? `
            <button onclick="acceptPrintRequest(${index})">
                Accept Request
            </button>
        `
        : ""
}

${
    request.status === "Accepted"
        ? `
            <button onclick="readyPrintRequest(${index})">
                Ready For Delivery
            </button>
        `
        : ""
}

${
    request.status === "Ready For Delivery"
        ? `
            <button onclick="completePrintRequest(${index})">
                Mark As Delivered
            </button>
        `
        : ""
}

            </div>

        `;

    });

}

function acceptPrintRequest(index) {
    const printRequests =
        JSON.parse(localStorage.getItem("printRequests")) || [];

    printRequests[index].status = "Accepted";

    localStorage.setItem(
        "printRequests",
        JSON.stringify(printRequests)
    );

    location.reload();
}

function readyPrintRequest(index) {
    const printRequests =
        JSON.parse(localStorage.getItem("printRequests")) || [];

    printRequests[index].status =
        "Ready For Delivery";

    localStorage.setItem(
        "printRequests",
        JSON.stringify(printRequests)
    );

    location.reload();
}

function completePrintRequest(index) {
    const printRequests =
        JSON.parse(localStorage.getItem("printRequests")) || [];

    printRequests[index].status =
        "Delivered";

    localStorage.setItem(
        "printRequests",
        JSON.stringify(printRequests)
    );

    location.reload();
}

window.acceptPrintRequest = acceptPrintRequest;
window.readyPrintRequest = readyPrintRequest;
window.completePrintRequest = completePrintRequest;
window.completeFoodOrder = completeFoodOrder;

function acceptSupplyOrder(orderId){

    let supplyOrders =
        JSON.parse(localStorage.getItem("supplyOrders")) || [];

    supplyOrders.forEach(order => {

        if(order.orderId === orderId){

            order.status = "Accepted";

        }

    });

    localStorage.setItem(
        "supplyOrders",
        JSON.stringify(supplyOrders)
    );

    location.reload();

}

function readySupplyOrder(orderId){

    let supplyOrders =
        JSON.parse(localStorage.getItem("supplyOrders")) || [];

    supplyOrders.forEach(order => {

        if(order.orderId === orderId){

            order.status = "Ready For Pickup";

        }

    });

    localStorage.setItem(
        "supplyOrders",
        JSON.stringify(supplyOrders)
    );

    location.reload();

}

function completeSupplyOrder(orderId){

    let supplyOrders =
        JSON.parse(localStorage.getItem("supplyOrders")) || [];

    supplyOrders.forEach(order => {

        if(order.orderId === orderId){

            order.status = "Delivered";

        }

    });

    localStorage.setItem(
        "supplyOrders",
        JSON.stringify(supplyOrders)
    );

    location.reload();

}


window.acceptSupplyOrder = acceptSupplyOrder;
window.readySupplyOrder = readySupplyOrder;
window.completeSupplyOrder = completeSupplyOrder;


activeSupplyOrders.forEach(order => {

    let itemsHTML = "";

    (order.items || []).forEach(item => {


        itemsHTML += `
            <li>
                ${item.name || "Unknown Item"} x${item.quantity || 0}
            </li>
        `;

    });

    schoolSuppliesContainer.innerHTML += `

        <div class="order-card">

            <h3>${order.orderId}</h3>

            <p>
                <strong>Customer:</strong>
                ${order.customerName || "Unknown Customer"}
            </p>

            <p>
                <strong>Section:</strong>
                ${order.customerSection || "Not Specified"}
            </p>

            <p>
                <strong>Items:</strong>
            </p>

            <ul>
                ${itemsHTML}
            </ul>

            <p>
                <strong>Total:</strong>
                ₱${order.total || 0}
            </p>

           <p>
                <strong>Status:</strong>

                <span class="
                ${order.status === 'Pending' ? 'pending' : ''}
                ${order.status === 'Accepted' ? 'accepted' : ''}
                ${order.status === 'Ready For Pickup' ? 'delivery' : ''}
                ${order.status === 'Delivered' ? 'completed' : ''}
                ">
                ${order.status || "Pending"}
                </span>

            </p>

                ${order.status === "Pending" ? `
                <button onclick="acceptSupplyOrder('${order.orderId}')">
                    Accept Order
            </button>
            ` : ""}

                ${order.status === "Accepted" ? `
                <button onclick="readySupplyOrder('${order.orderId}')">
                    Ready For Pickup
            </button>
            ` : ""}

                ${order.status === "Ready For Pickup" ? `
            <button onclick="completeSupplyOrder('${order.orderId}')">
                    Mark As Delivered
            </button>
            ` : ""}

        </div>

    `;

});

if(completedSupplyOrders.length === 0){

    completedSuppliesTitle.style.display = "none";

}else{

    completedSupplyOrders.forEach(order => {

        let itemsHTML = "";

        (order.items || []).forEach(item => {

            itemsHTML += `
                <li>
                    ${item.name || "Unknown Item"} x${item.quantity || 0}
                </li>
            `;

        });

        completedSuppliesContainer.innerHTML += `

            <div class="order-card">

                <h3>${order.orderId}</h3>

                <p>
                    <strong>Customer:</strong>
                    ${order.customerName || "Unknown Customer"}
                </p>

                <p>
                    <strong>Section:</strong>
                    ${order.customerSection || "Not Specified"}
                </p>

                <p>
                    <strong>Items:</strong>
                </p>

                <ul>
                    ${itemsHTML}
                </ul>

                <p>
                    <strong>Total:</strong>
                    ₱${order.total || 0}
                </p>

                <p>
                    <strong>Status:</strong>
                    <span class="completed">
                        Delivered
                    </span>
                </p>

            </div>

        `;

    });

}

searchPrintingOrder?.addEventListener("input", function () {

    const searchValue =
        this.value.toLowerCase();

    const allCards =
        document.querySelectorAll(".order-card");

    allCards.forEach(card => {

        const cardText =
            (card.innerText || "").toLowerCase();

        if(cardText.includes(searchValue)){

            card.style.display = "block";

        }else{

            card.style.display = "none";

        }

    });

});