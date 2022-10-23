/**
 * Stephen Pizzeria is an interactive food ordering website
 * @author Karla Estrada
 * @version 1.0
 *  10.11.2022
 */
import { menuItems } from "./data.js"
import Food from "./Food.js"

const itemContainer = document.querySelector(".items-container")
const cartContainer = document.querySelector(".cart-container")
const modalContainer = document.querySelector(".modal-container")
const payForm = document.getElementById("pay-form")

let foodMenu = []
let addedToCart = []
const isCartEmpty = true;
/**
 * Renders the food items onto the screen
 */
function render() {
    let str = itemContainer.innerHTML = ""

    for (let item of menuItems){
        const foodItem = new Food(item)
        foodMenu.push(foodItem)
        str += foodItem.getFoodItemHtml()
    }
    itemContainer.innerHTML = str
}
render()

/**
 * Event listener for clicks on each menu item's add button
 */
itemContainer.addEventListener("click", function(e) {
    cartContainer.style.display = "block"
    const clickedItem = e.target.id

    if(clickedItem){
        for(const food of foodMenu){
            if(clickedItem === food.name){

                food.isAdded = true;
                addedToCart.push(food)
                document.getElementById(clickedItem).disabled = true

                
            }
        
        }

        if(addedToCart.length > 0){
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

        //Event listener when the complete order button is pressed
        completeOrder.addEventListener("click", function() {
            if(addedToCart.length>0){
                modalContainer.style.display = "block"
            }
        })

    }   

})

/**
 * Renders the cart based on user interaction
 */
function renderCart() {
    const addedItems = document.querySelector(".added-items")
    addedItems.innerHTML = ""
    let str = ""
    let count = 0;
    addedItems.innerHTML = ""
    for(const food of addedToCart){
        str += `
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
    addedItems.innerHTML = str
    document.getElementById("total-price").innerHTML=`$${calculateTotalPrice()}`


}
/**
 * Removes the item clicked by the user in the cart
 */
cartContainer.addEventListener("click", function(e) {
    if(e.target.id){
        document.getElementById(addedToCart[e.target.id].name).disabled = false;
        addedToCart.splice(e.target.id, 1)
        if(addedToCart.length === 0){
            cartContainer.style.display = "none"
        }
        renderCart()
    }
})
/**
 * Calculates total price of elements added to the cart
 * @returns total
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
    document.getElementById("svg-icon").innerHTML = `
        <img class="loading" src="images/loading.svg">`
   
    setTimeout(()=>{
        cartContainer.style.display = "none"
        modalContainer.style.display = "none"
        document.querySelector(".thanks-msg").innerHTML = `
        <div class="thanks-container">
        <h1> Thanks ${name}! Your order is on its way!</h1>
        </div>
        `
    }, 2000)

    setTimeout(()=>{
        document.querySelector(".thanks-msg").innerHTML =""
        reset()
    }, 8000)

})

/**
 * Resets properties
 */
function reset() {

    for(let menuItem of addedToCart){
        document.getElementById(menuItem.name).disabled = false;
    }
    document.getElementById("fullName").value = ""
    document.getElementById("cardNumber").value = ""
    document.getElementById("cvv").value = ""
    document.getElementById("svg-icon").innerHTML = ""
    cartContainer.innerHTML = ""
    addedToCart = []
    foodMenu = []
    render()
}