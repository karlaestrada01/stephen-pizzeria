/**
 * Food class
 */
class Food {
    constructor(data) {
        Object.assign(this, data)
    }
    getFoodItemHtml() {

        const {name, description, price, img, alt, isAdded} = this
        return `
        <div class="menu-item">
            <img class="item-img" src=${img} alt=${alt}>
            <div class="item-box">
                <h1 class="item-name">${name}</h1>
                <p class="item-description">${description}</p>
                <h2 class="item-price">$${price}</h2>
            </div>
            <button class="add-btn" id="${name}">+</button>
        </div>
        
        
        `
    }
}

export default Food