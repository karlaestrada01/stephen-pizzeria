import { menuItems } from "./data.js"
import Food from "./Food.js"
const itemContainer = document.querySelector(".items-container")
const cartContainer = document.querySelector(".cart-container")
const modalContainer = document.querySelector(".modal-container")
const payForm = document.getElementById("pay-form")
//array of our food items
const foodMenu = []
let addedToCart = []
const isCartEmpty = true;
function render() {
    itemContainer.innerHTML = ""

    for (let item of menuItems){
        const foodItem = new Food(item)
        foodMenu.push(foodItem)
        itemContainer.innerHTML += foodItem.getFoodItemHtml()
    }
}
render()
itemContainer.addEventListener("click", function(e) {

    const clickedItem = e.target.id

    if(clickedItem){
    for(const food of foodMenu){
        if(clickedItem === food.name){

            food.isAdded = true;
            addedToCart.push(food)
            document.getElementById(clickedItem).disabled = true

            
        }
      
    }

    if(addedToCart.length>0){
        
        cartContainer.innerHTML = `
        <h1>Your cart</h1>
        <div class="added-items">

        </div>
        <div class="total-price">
            <h2>Total Price: </h2>
            <h2 id="total-price">$${calculateTotalPrice()}</h2>
        </div>
        <button class="complete-order-btn">Complete Order</button>
        `
     renderCart()
    }

    const completeOrder = document.querySelector(".complete-order-btn")
    completeOrder.addEventListener("click", function() {
      
        modalContainer.style.display = "block"
    })
}   

})


function renderCart() {
    
    
    const addedItems = document.querySelector(".added-items")
    addedItems.innerHTML = ""
    let count = 0;
    addedItems.innerHTML = ""
    for(const food of addedToCart){
        addedItems.innerHTML += `
        <div class="chosen-item">
            <div class="word-spacing">
            <h2 class="food-name">${food.name}</h2>
            <p><a class="remove-link" id="${count}" href=#>Remove</a></p>
            </div>
            <h2>$${food.price}</h2>
        </div>
        
        `
        count++;
    }
    document.getElementById("total-price").innerHTML=`$${calculateTotalPrice()}`
    if(!addedToCart.length>0){
        //cartContainer.innerHTML = ""
    }

// else {
//     cartContainer.style.display = "none"
// }
}
/**
 * Removes the item clicked by the user in the cart
 */
cartContainer.addEventListener("click", function(e) {
 
    if(e.target.id){
        document.getElementById(addedToCart[e.target.id].name).disabled = false;
        addedToCart.splice(e.target.id, 1)
        renderCart()
    }

})
/**
 * Calculates total price of elements added to the cart
 */
function calculateTotalPrice() {
    let total = 0
    for(let item of addedToCart){
        total += item.price
    }
    return total;
}
/**
 * Event listener after the user submits the form
 */
payForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const form = new FormData(payForm)
    const name = form.get("fullName")
    console.log(name)
    document.getElementById("svg-icon").innerHTML = `
        <img class="loading" src="images/loading.svg">`
   
    setTimeout(()=>{
        cartContainer.style.display = "none"
        modalContainer.style.display = "none"
        document.querySelector(".thanks-msg").innerHTML = `
        <h1> Thanks ${name}! Your order is on its way!</h1>
        `
    }, 2000)

    setTimeout(()=>{
        document.querySelector(".thanks-msg").innerHTML =""
        reset()
    }, 2000)

})

function reset() {

    for(let menuItem of addedToCart){
        document.getElementById(menuItem.name).disabled = false;
    }

    addedToCart = []
    render()
}