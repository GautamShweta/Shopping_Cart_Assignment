

$(() => {

    let userId = window.localStorage.getItem('userId');
    let totalDiv = document.getElementById("totalPrice");
    let total = 0;
    let cart = document.getElementById("cart");
    $.get(`/cartItems/${userId}`, (data) => {
        $('#cart').html("");

        for (item of data) {
            let row = document.createElement("tr");
            let vendorName = document.createElement("td");
            vendorName.textContent = item.vendorName;

            let productName = document.createElement("td");
            productName.textContent =item.product.name;

            let quantity = document.createElement("td");
            quantity.textContent = item.quantity;

            let price = document.createElement("td");
            price.textContent = item.product.price;

            

            total = total + parseInt(item.quantity) * parseInt(item.product.price);

            row.appendChild(vendorName);
            row.appendChild(productName);
            row.appendChild(quantity);
            row.appendChild(price);
            cart.appendChild(row);

        }

        totalDiv.textContent = "Rs "+total;

    })
})