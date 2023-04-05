var inventory = []
document.addEventListener("DOMContentLoaded", () => {
    inventory = JSON.parse(localStorage.getItem("inventory"))
    console.log("inventory: ", inventory)
})

var products = document.getElementById("products")

window.onload = () => {

    inventory.forEach((element, index) => {
        products.innerHTML +=
            `
            <div class="product">
                <div class="text">
                <p>
                    <b>Code:</b> ${inventory[index].code}
                </p>
                <p>
                    <b>Name:</b> ${inventory[index].name}
                </p>
                <p>
                    <b>Price:</b> ${inventory[index].price}
                </p>
                <p>
                    <b>Stock:</b> ${inventory[index].stock}
                </p>
                <br/>
                <button type="button" class="_btn" value="${inventory[index].code}" id="modalInfoBtn" data-bs-toggle="modal" data-bs-target="#modalInfo">
        ¡Get info!
    </button>
            </div>
                                
            <img src="${inventory[index].photo}" alt="book">
        </div>
        `

    });

    var id_products = document.querySelectorAll("#modalInfoBtn")
    var modal_title = document.getElementById("modal-title")
    var modal_body = document.getElementById("modal-body")
    var id_products_arr = Array.prototype.slice.call(id_products);

    id_products_arr.forEach(product => {

        product.addEventListener("click", () => {
            let { name, sales } = search_product(product.value, inventory)
            let date = null
            let amount = null
            let total = null

            if (sales.length > 0) {
                sales = sales[sales.length - 1]
                date = sales.date
                amount = sales.amount
                total = sales.total
            }

            name = "Last purchase information of " + name

            modal_title.innerHTML = `
            <div class="modal-body" id="modal-body">
                ${name}
            </div>
            `

            modal_body.innerHTML = `
            <div class="modal-body" id="modal-body">
                <div class="text">
                <p>
                    <b>Date:</b> ${!!date ? date : "There's not information"}
                </p>
                <p>
                    <b>Amount:</b> ${!!amount ? amount : "There's not information"}
                </p>
                <p>
                    <b>Total:</b> $${!!total ? total : "There's not information"}
                </p>
            </div>`
        })
    });

}