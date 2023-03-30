const fetch_data = () => {
    let inventory = []
    const xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            inventory = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", "../inventary.json", false);
    xhttp.send();
    return inventory
}