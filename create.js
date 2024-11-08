const cards = [];

const addCard = function (word, def) {
    const div = document.createElement("div");
    div.setAttribute("class", "filled-card");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = word
    dd.textContent = def
    div.append(dt);
    div.append(dd);
    if (document.querySelector("dl div#empty-placeholder")) {
        document.querySelector("dl div#empty-placeholder").remove();
    }
    document.querySelector("dl").append(div);
    cards.push([word, def]);
}

const addSingleCard = function () {
    word = document.querySelector("#word-input").value;
    def = document.querySelector("#definition-input").value;
    if (word == "" && def == "") {
        if (!document.querySelector(".card-input-wrapper #error-msg")) {
            const span = document.createElement("span");
            span.textContent = "Please fill out both fields"
            span.setAttribute("id", "error-msg");
            document.querySelector(".card-input-wrapper").append(span);
        }

    }
    else {
        if (document.querySelector(".card-input-wrapper #error-msg")) {
            document.querySelector(".card-input-wrapper #error-msg").remove();
        }
        addCard(word, def);
    }
}
const onLoad = function (evt) {
    const files = evt.target.files;
    const span = document.createElement("span");
    span.setAttribute("id", "file-name");
    if (files[0].type == "text/csv") {
        span.textContent = files[0].name;
        span.removeAttribute("style");
    }
    else {
        span.textContent = "Please upload a csv file";
        span.setAttribute("style", "color: red; text-decoration: none");
    }
    if (!document.querySelector("span#file-name")) {
        document.querySelector("#card-metadata").insertBefore(span, document.querySelector("#upload-label"));
    } else {
        document.querySelector("span#file-name").replaceWith(span);
    }

    const reader = new FileReader();
    const processCSV = function () {
        const text = reader.result;
        const cardss = text.split("\n");
        for (let i in cardss) {
            if (!cardss[i] == "") {
                const card = cardss[i].split(",");
                addCard(card[0], card[1]);
            }
        }
    }
    reader.addEventListener("load", processCSV);
    reader.readAsText(files[0]);
}

const createSet = function() {
    const name = document.querySelector("#name").value;
    document.querySelector("#name").setAttribute("name", "name");
    const course = document.querySelector("#course").value;
    document.querySelector("#course").setAttribute("name", "course");
    Storage.createSet(name, course, cards)
    document.querySelector("#create-set-form").setAttribute("action", "./browse.html")
}
document.querySelector("#upload-input").addEventListener("change", onLoad);
document.querySelector("#add-card-button").addEventListener("click", addSingleCard);
document.querySelector("button.secondary").addEventListener("click", createSet);