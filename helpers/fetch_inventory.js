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
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
    return inventory
}

const add_product = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", theUrl);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ "email": "hello@user.com", "response": { "name": "Tester" } }));
}