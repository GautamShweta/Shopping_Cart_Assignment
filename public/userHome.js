$(() => {

    // $('#viewCart').click(() => {
    //     console.log("reached");
    //     window.location = "http://localhost:8989//cart.html";
    // })

    /****************************userLogin click*****************************/
    let flag = false;
    $('#userLogin').click(() => {

        let name = $('#userName').val();
        let user = undefined;
        
        $.get(`/users/${name}`, (data) => {
            if (data.length === 0) {

                alert("User Do not Exists")
            }
            else {
                
                user = data;
                
                window.localStorage.setItem('userId', user[0].id);
                $.get("/products", (data) => {


                    const list = document.getElementById("productList");
                    $('#productList').empty();
                    for (product of data) {


                        let main = document.createElement("div");
                        main.setAttribute("class", "col-4 card mx-2 p-4 ")


                        let name = document.createElement("div");
                        name.textContent ="Product Name :   "+product.name;

                        let price = document.createElement("div");
                        price.textContent = "Price    Rs  " + product.price;

                        let vendorName = document.createElement("div");
                        vendorName.textContent = "Vendor Name   "+product.vendor.name;

                        let addButton = document.createElement("input");

                        addButton.setAttribute("value", "Add To Cart");
                        addButton.setAttribute("type", "button");
                        addButton.setAttribute("class", "btn btn-primary");
                        addButton.addEventListener("click", function () {



                            $.post(
                                "/cartItems",
                                {

                                    vendorName: product.vendor.name,
                                    userId: user[0].id,
                                    productId: product.id,

                                },
                                (data) => {
                                    if (data.success) {
                                        alert("item added successfully");

                                    } else {
                                        alert('Some error occurred')
                                    }
                                }
                            )
                        })
                        main.appendChild(name);
                        main.appendChild(price);
                        main.appendChild(vendorName);
                        main.appendChild(addButton);

                        list.appendChild(main);

                    }
                    if(!flag)
                    {
                    let viewCartBtn = document.createElement("input");
                    let body=document.querySelector("#body");
                    viewCartBtn.setAttribute("value","View Cart");
                    viewCartBtn.setAttribute("type","button");
                    viewCartBtn.setAttribute("class", " btn btn-primary");
                    viewCartBtn.addEventListener("click", () => {
                        
                        window.location = "../cart.html";
                    })
                
                    body.appendChild(viewCartBtn);
                }
                flag=true;
                })

            }

        })



    })

})