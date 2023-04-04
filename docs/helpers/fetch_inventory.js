const theUrl = "../inventary.json"

const fetch_inventory = (theUrl = theUrl) => {
    let inventory = []
    const xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            inventory = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", theUrl, false);
    xhttp.send();
    inventory = inventory.reverse()
    localStorage.setItem("inventory", JSON.stringify(inventory))
    return inventory
}

const search_product = (code, inventory) => {
    return inventory.filter(prod => prod.code === code)[0]
}
