function trackOrder() {

    const trackingId =
    document.getElementById("trackingId")
        .value
        .trim()
        .toUpperCase();

    const printRequests =
        JSON.parse(localStorage.getItem("printRequests")) || [];

    const foodOrders =
        JSON.parse(localStorage.getItem("foodOrders")) || [];

    const supplyOrders =
        JSON.parse(localStorage.getItem("supplyOrders")) || [];

    const foundPrintOrder =
        printRequests.find(order =>
            order.id?.toUpperCase() === trackingId
        );

    const foundFoodOrder =
        foodOrders.find(order =>
            order.orderId?.toUpperCase() === trackingId
        );

    const foundSupplyOrder =
        supplyOrders.find(order =>
            order.orderId?.toUpperCase() === trackingId
        );

    const result =
        document.getElementById("trackingResult");

    // PRINTING ORDER
    if(foundPrintOrder){

        let price = 0;

        if(foundPrintOrder.printType &&
           foundPrintOrder.printType.includes("P5")){
            price = 5;
        }
        else if(foundPrintOrder.printType &&
                foundPrintOrder.printType.includes("P15")){
            price = 15;
        }
        else if(foundPrintOrder.printType &&
                foundPrintOrder.printType.includes("P30")){
            price = 30;
        }

        const total =
            price * Number(foundPrintOrder.copies);

        result.innerHTML = `
            <div class="order-card">

                <h2>🖨 Printing Order Summary</h2>

                <p>
                    <strong>Order ID:</strong>
                    ${foundPrintOrder.id}
                </p>

                <p>
                    <strong>Student:</strong>
                    ${foundPrintOrder.studentName}
                </p>

                <p>
                    <strong>Grade & Section:</strong>
                    ${foundPrintOrder.gradeSection}
                </p>

                <p>
                    <strong>Print Type:</strong>
                    ${foundPrintOrder.printType}
                </p>

                <p>
                    <strong>Copies:</strong>
                    ${foundPrintOrder.copies}
                </p>

                <p>
                    <strong>Uploaded File:</strong>
                    ${foundPrintOrder.fileName || "No File Uploaded"}
                </p>

                <p>
                    <strong>Notes:</strong>
                    ${foundPrintOrder.notes || "None"}
                </p>

                <p>
                    <strong>Total:</strong>
                    ₱${total}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${foundPrintOrder.status || "Pending"}
                </p>

            </div>
        `;

    }

    // FOOD ORDER
    else if(foundFoodOrder){

        let itemsHTML = "";

        foundFoodOrder.items.forEach(item => {

            itemsHTML += `
                <li>
                    ${item.name} x${item.quantity}
                </li>
            `;

        });

        result.innerHTML = `
            <div class="order-card">

                <h2>🍔 Food Order Summary</h2>

                <p>
                    <strong>Order ID:</strong>
                    ${foundFoodOrder.orderId}
                </p>

                <p>
                    <strong>Customer:</strong>
                    ${foundFoodOrder.customerName}
                </p>

                <p>
                    <strong>Section:</strong>
                    ${foundFoodOrder.customerSection}
                </p>

                <p>
                    <strong>Items Ordered:</strong>
                </p>

                <ul>
                    ${itemsHTML}
                </ul>

                <p>
                    <strong>Total:</strong>
                    ₱${foundFoodOrder.total}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${foundFoodOrder.status || "Pending"}
                </p>

            </div>
        `;

    }

else if(foundSupplyOrder){

    let itemsHTML = "";

    foundSupplyOrder.items.forEach(item => {

        itemsHTML += `
            <li>
                ${item.name} x${item.quantity}
            </li>
        `;

    });

    result.innerHTML = `
        <div class="order-card">

            <h2>📚 School Supplies Order Summary</h2>

            <p>
                <strong>Order ID:</strong>
                ${foundSupplyOrder.orderId}
            </p>

            <p>
                <strong>Customer:</strong>
                ${foundSupplyOrder.customerName}
            </p>

            <p>
                <strong>Section:</strong>
                ${foundSupplyOrder.customerSection}
            </p>

            <p>
                <strong>Items Ordered:</strong>
            </p>

            <ul>
                ${itemsHTML}
            </ul>

            <p>
                <strong>Total:</strong>
                ₱${foundSupplyOrder.total}
            </p>

            <p>
                <strong>Status:</strong>
                ${foundSupplyOrder.status || "Pending"}
            </p>

        </div>
    `;

}

    // NOT FOUND
    else{

        result.innerHTML = `
            <p>
                ❌ Order not found
            </p>
        `;

    }

}