//populated cart array for puppies
var items = [
   {
      id: 1,
      name: "Chocolate Waffles",
      image: "images/chocolate.jpg",
      
      price: 2800,
   },
   {
      id: 2,
      name: "Vanilla Waffles",
      image: "images/vanilla.JPG",
      price: 2500,
   },
   {
      id: 3,
      name: "Strawberry Waffles",
      image: "images/strawberry.JPG",
      price: 2000,
   },
   {
      id: 4,
      name: "Flemish Waffles ",
      image: "images/flemish.jpeg",
      price: 2500,
   },
   {
      id: 5,
      name: "Vegan Waffles",
      image: "images/vegan.jpeg",
      
      price: 2200,
   },
   {
      id: 6,
      name: "Hot Dog Waffles",
      image: "images/hotdog.jpeg",
      price: 1200,
   },
   {
      id: 7,
      name: "Pandan Waffles",
      image: "images/pandan.jpeg",
      price: 1800,
   },
   {
      id: 8,
      name: "Brussels Waffles",
      image: "images/brussel.jpeg",
      price: 1900,
   },
   {
      id: 9,
      name: "American Waffles",
      image: "images/american.jpeg",
      
      price: 2100,
   },
   {
      id: 10,
      name: "Liege Waffles",
      image: "images/liege.jpeg",
      price: 2400,
   },
   {
      id: 11,
      name: "Honey Waffles",
      image: "images/honey.jpeg",
      price: 3200,
   },
   {
      id: 12,
      name: "Potatoe Waffles",
      image: "images/potato.jpeg",
      price: 3500,
   },

];

var cart = [];

//Home page
$(document).ready(function () {

   //get total quantity from cart
   getTotalQuantity();
   
   var cartHTML = $.map(items, function (item) {
      return (
         '<div class="item">' +
         `<img src=${item.image} class="item-image"> ` +
         "</img>" +
         "<h4>" +
         item.name +
         "</h4>" +
         `<div class="item-details">` +
         "<span>" +
         ` ₦ ${item.price}` +
         "</span>" +
         "<button class=addCart>" +
         "Add to Cart" +
         "</button>" +
         "</div>" +
         "</div>"
      );
   });
   $("#cart").html(cartHTML);
});

//because button is dynamically created, we need to use event delegation
const cartArray = [];
$(document).on("click", ".addCart", function () {
   var name = $(this).parent().parent().children("h4").text();
   console.log(name)
   var price = $(this).parent().children("span").text();
   var image = $(this).parent().parent().children("img").attr("src");

   const cart = new Object();
   cart.name = name;
   cart.price = price;
   cart.image = image;
   cart.quantity = 1;

   const result = cartArray.findIndex((item) => name == item.name);
   console.log(result);
   if (result != -1) {
    alert("Item already in cart"); 
    return false;
   }
   cartArray.push(cart);

   //store cart in local storage
   
    localStorage.setItem("cart", JSON.stringify(cartArray));


   alert("Successfully added to cart")
  
});

//increment quantity in localstorage
$(document).on("click", ".incrementCart", function () {
    const name = $(this).parent().parent().parent().children(".first_row").children("h4").text();
    const quantity = $(this).parent().children("span");
    const cartArray = JSON.parse(localStorage.getItem("cart"));
    const result = cartArray.findIndex((item) => name == item.name);
    cartArray[result].quantity++;
    quantity.text(cartArray[result].quantity);

    localStorage.setItem("cart", JSON.stringify(cartArray));
     //get total quantity from cart
     getTotalQuantity();
})

$(document).on("click", ".decrementCart", function () {
    const name = $(this).parent().parent().parent().children(".first_row").children("h4").text();
    console.log(name)
    const cartArray = JSON.parse(localStorage.getItem("cart"));
    const result = cartArray.findIndex((item) => name == item.name);

    if(cartArray[result].quantity == 1){
        let text = "Do you want to remove item from cart";
        if (confirm(text) == true) {
            cartArray.splice(result, 1);
            console.log("success")
            localStorage.setItem("cart", JSON.stringify(cartArray));
            $(this).parent().parent().parent().remove();
        } else {        
            return false;
        }
    }else{
    cartArray[result].quantity--;
    localStorage.setItem("cart", JSON.stringify(cartArray));
     //get total quantity from cart
     getTotalQuantity();
    $(this).parent().children("span").text(cartArray[result].quantity);
    }
})

// remove item from cart
$(document).on("click", ".removeCart", function () {
    const name = $(this).parent().parent().children(".first_row").children("h4").text();
   console.log(name)
    const cartArray = JSON.parse(localStorage.getItem("cart"));
    const result = cartArray.findIndex((item) => name == item.name);
    cartArray.splice(result, 1);
    localStorage.setItem("cart", JSON.stringify(cartArray));
     //get total quantity from cart
     getTotalQuantity();
    $(this).parent().parent().remove();
})

//get total quantity from cart
function getTotalQuantity() {
      const cartArray = JSON.parse(localStorage.getItem("cart"));
      let totalQuantity = 0;
      cartArray.forEach((item) => {
         totalQuantity += item.price.split(" ")[2] * item.quantity;
      });

      $("#subtotal").children("span").text(`₦ ${totalQuantity}`);
      return totalQuantity;
}


// get cart from local storage and show on cart.html
var cartItems = JSON.parse(localStorage.getItem("cart"));
var cartHTML = $.map(cartItems, function (item) {
   return ( 
    `<div class="cart-item" key=${item.id}>`+
      '<div class="first_row" style="display: flex;">'+
        ` <img src=${item.image} alt="" width="100px"  /> ` +
         ' <h4>' +
          item.name
         +'</h4>' +
         ' <div style="display: flex; margin-left: auto;"> ' +
             `<p>${item.price}</p>`+
        '  </div> ' +
       '</div>'+
       '<div class="second_row" style="display: flex; padding: 1em 0;"> ' +
          '<button class="removeCart">Remove</button>' +
         ' <div class="" style="margin-left: auto;">'+
            '<button class="decrementCart">-</button>' +
             `<span id="item-quantity">${item.quantity}</span>`+
             '<button class="incrementCart">+</button>' +
          '</div>' +
       '</div>' +
   ' </div>' 
   );
});
$("#cartItems").html(cartHTML);
