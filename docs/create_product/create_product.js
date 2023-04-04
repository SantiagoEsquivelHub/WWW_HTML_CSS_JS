var inventory = []

document.addEventListener("DOMContentLoaded", () => {
    var inventory = JSON.parse(localStorage.getItem("inventory"))
    console.log("inventory: ", inventory)

    const form = document.getElementById("create_product")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let product = {}


        let code = document.getElementById("code").value
        let searched_product = search_product(code, inventory)
        console.log("searched_product: ", searched_product)

        if (!searched_product) {
            let name = document.getElementById("name").value
            let price = document.getElementById("price").value
            let photo = document.getElementById("img_url").value
            let stock = document.getElementById("stock").value
            let title = document.getElementById("title")
            let message = document.getElementById("message")
            let message_container = document.getElementById("message_container")
            let _btn = document.getElementById("_btn")
            let date = null
            let amount = null
            let total = 0

            product = {
                code,
                name,
                price,
                photo,
                stock,
                sales: []
            }
            localStorage.setItem("inventory", JSON.stringify([product, ...inventory]))

            title.setAttribute("style", "display:none!important")
            form.setAttribute("style", "display:none!important")
            _btn.setAttribute("style", "display:none!important")
            _btn.disabled = true
            message_container.setAttribute("style", "display:flex!important")
            message.innerHTML = `
            <b>¡You have just create a product!</b>
            `
            let origin = window.location.origin
            let pathname = window.location.pathname.split("/create_product")[0] + "/products/products.html"
            let url = origin + pathname;

            setTimeout(() => {
                window.location.href = url
            }, 3000);
        } else {
            message_container.setAttribute("style", "display:flex!important")
            message.innerHTML = `
            <b>¡This product's code has been used before!</b>
            `
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        }


    })
})