

$(() => {
  $("#addProducts").click(()=>{
    
    
    window.location=window.location.href+"/products.html"
  })
  $("#userLogin").click(()=>{
    
    window.location=window.location.href+"/userHome.html";

  })

    function refreshList() {
      
      $.get('/vendors', (data) => {
        
        
        $('#vendorsList').empty()
        
        const list=document.querySelector("#vendorsList");
        
        for(let vendor of data)
        {
          let button=document.createElement('input');
          button.setAttribute("value","X");
          button.setAttribute("type","button");
          button.setAttribute("class","btn btn-primary");
          button.style.position = "absolute";
          button.style.right = "0%";
          button.style.top="0%";
          button.addEventListener("click",function(event)
          {
             
             $.ajax({
              
              url: '/vendors',
              type: 'DELETE',
              data:{id:vendor.id},
              success: function(result) {
                refreshList();
                event.target.parentElement.remove();
              }
              
          });
          });
          let item=document.createElement('li');
          item.setAttribute("class","list-group-item");
          item.textContent=vendor.name;
          item.append(button);
          list.appendChild(item);
        }
        
        
      })
    }

      
    
  
    refreshList()
  
    $('#addVendor').click(() => {
      $.post(
        '/vendors',
        {
          name: $('#vendor').val()
          
        },
        (data) => {
          if (data.success) {
            refreshList()
            $('#vendor').val("");
          }else {
            alert('Some error occurred') 
          }
        }
      )
    })
  
  })
  