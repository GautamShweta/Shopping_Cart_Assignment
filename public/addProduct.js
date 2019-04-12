$(() => {

  

  $.get('/vendors', (data) => {

    const list = document.getElementById("vendors");


    for (let vendor of data) {

      let option = document.createElement('option');
      option.setAttribute("value", vendor.id);
      
      option.textContent = vendor.name;
      list.appendChild(option);

    }

  })




  //***********************************************************************/// */

  function refreshList() {

    $.get('/products', (data) => {



      const list = document.querySelector("#productsList");
      $('#productsList').html("");
    
      for (let product of data) {

        //***********************************************************//
        let button=document.createElement('input');
          button.setAttribute("value","X");
          button.setAttribute("type","button");
          button.addEventListener("click",function(event)
          {
             
             $.ajax({
              
              url: '/products',
              type: 'DELETE',
              data:{id:product.id},
              success: function(result) {
                console.log("done");
                event.target.parentElement.parentElement.remove();
               // refreshList();
              }
              
          });
          });
        //********************************************************/
        let item = document.createElement('tr');

        let name = document.createElement('td');
        name.textContent = product.name;

        let price = document.createElement('td');
        price.textContent =product.price;

        let quantity = document.createElement('td');
        quantity.textContent = product.qty;

        let vendor = document.createElement('td');
        vendor.textContent=product.vendor.name;
        

        let close=document.createElement('td');
        close.appendChild(button);


        

        item.appendChild(name);
        item.appendChild(quantity);
        item.appendChild(price);
        item.appendChild(vendor);
        item.appendChild(close);

        list.appendChild(item);
      }


    })



  }
  refreshList();
  $('#addProducts').click(() => {

    $.post(
      '/products',
      {
        name: $('#productName').val(),
        price: $('#price').val(),
        quantity: $('#quantity').val(),
        vendorId: $('#vendors').val()

      },
      (data) => {
        if (data.success) {
          refreshList();
          $('#productName').val(""),
            $('#price').val(""),
            $('#quantity').val(""),
            $('#vendors').val("")
        } else {
          alert('Some error occurred')
        }
      }
    )
  })
}

)


