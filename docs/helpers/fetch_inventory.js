const theUrl = "../inventary.json"

const fetch_inventory = () => {
    let inventory = []
    const xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            inventory = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", theUrl, false);
    xhttp.send();
    return inventory
}

const add_product = () => {

    const fs = require('fs');

    const content = 'Some content!';

    fs.writeFile(theUrl, content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });


}

const search_product = (code, inventory) => {
    return inventory.filter(prod => prod.code === code)[0]
}
