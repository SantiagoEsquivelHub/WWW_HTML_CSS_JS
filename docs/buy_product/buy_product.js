var inventory = []

document.addEventListener("DOMContentLoaded", () => {
    inventory = JSON.parse(localStorage.getItem("inventory"))
    console.log("inventory: ", inventory)
})

const form = document.getElementById("buy_product")
const product_info = document.getElementById("product_info")

form.addEventListener("submit", (event) => {
    let code = document.getElementById("code").value

    event.preventDefault()
    let product = inventory.filter(prod => prod.code == code)[0]

    if (!!product) {
        product_info.innerHTML = `
            <div class="product" id="product">
                <div class="text">
                <p>
                    <b>Code:</b> ${product.code}
                </p>
                <p>
                    <b>Name:</b> ${product.name}
                </p>
                <p>
                    <b>Price:</b> ${product.price}
                </p>
                <p>
                    <b>Stock:</b> ${product.stock}
                </p>
                    <div class="item_form">
                        <label for="amount"><b>Amount:</b></label>
                        <input type="text" id="amount" name="amount" value="1">
                    </div>
                    <span id="message2"></span>

                <br/>
                <button type="button" class="_btn" value="${product.code}" id="buyBtn" data-bs-toggle="modal" data-bs-target="#modalInfo">
        ¡Buy!
    </button>
            </div>
                                
            <img src="${product.photo}" alt="book">
        </div>
        `
    } else {
        product_info.innerHTML = `<h1>Does not exist a product with this code: <b>${code}</b></h1>`
    }

    const buyBtn = document.getElementById("buyBtn")

    buyBtn.addEventListener("click", () => {
        let message = document.getElementById("message")
        let message2 = document.getElementById("message2")
        let message_container = document.getElementById("message_container")
        let buy_product = document.getElementById("buy_product")
        let prod = document.getElementById("product")
        let amount = parseInt(document.getElementById("amount").value)
        let updated_stock = product.stock - amount

        if (updated_stock >= 0) {
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let today = new Date()
            let total = product.price * amount
            let sales_item = {
                date: today.toLocaleDateString("en-US", options),
                amount,
                total
            }
            product.stock = updated_stock
            product.sales.push(sales_item)

            let index = inventory.findIndex(prod => prod.code == code)

            inventory[index] = product
            localStorage.setItem("inventory", JSON.stringify(inventory))

            prod.setAttribute("style", "display:none")
            buy_product.setAttribute("style", "display:none")
            message_container.setAttribute("style", "display:flex!important")
            message.innerHTML = `<b>¡You have just buy a product!</b>`

            let origin = window.location.origin
            let pathname = window.location.pathname.split("/buy_product")[0] + "/products/products.html"
            let url = origin + pathname;

            setTimeout(() => {
                window.location.href = url
            }, 3000);

        } else {
            message2.innerHTML = `<b>¡There is not enough stock!</b>`

        }
    })
})