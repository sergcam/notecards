const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
let sets = localStorage.getItem("sets");

const elements = {
    dl: document.querySelector('dl'),
    title: document.querySelector('h1')
}
const notFound = function () {
    elements.title.innerHTML = 'Page not found';
    document.querySelector('nav').innerHTML = '';
    elements.dl.outerHTML = "<p id='notfound'>go back <a href='./index.html'>home</a></p>";
}
const main = function () {
    if (params.get('name') && params.get('course')) {
        const setName = Storage.getSetName(params.get('name'), params.get('course'));
        if (Storage.getSetInfo(setName)) {
            const cards = Storage.getSetInfo(setName).cards;
            elements.title.textContent = Storage.getSetInfo(setName).name;
            for (i in cards) {
                const div = document.createElement("div");
                const dt = document.createElement("dt");
                const dd = document.createElement("dd");
                dt.textContent = cards[i][0]
                dd.textContent = cards[i][1]
                div.append(dt);
                div.append(dd);
                elements.dl.append(div);
            }
        } else {
            notFound();
        }

        const addCard = function () {
            const div = document.createElement("div");
            div.setAttribute("class", "editing");
            const wordInput = document.createElement("input");
            wordInput.setAttribute("type", "text");
            wordInput.setAttribute("id", "word");
            const wordLabel = document.createElement("label");
            wordLabel.setAttribute("for", "word");
            const defInput = document.createElement("input");
            defInput.setAttribute("type", "text");
            defInput.setAttribute("id", "def");
            const defLabel = document.createElement("label");
            defLabel.setAttribute("for", "def");
            const button = document.createElement("button");
            button.setAttribute("id", "add-card");
            wordLabel.textContent = "Word";
            defLabel.textContent = "Defention"
            button.setAttribute("type", "button");
            button.textContent = "add card";
            div.append(wordInput);
            div.append(wordLabel);
            div.append(defInput);
            div.append(defLabel);
            div.append(button)

            elements.dl.append(div);

            const setCard = function () {
                if (wordInput.value == "" || defInput.value == "") {
                    if (!document.querySelector("#error")) {
                        const error = document.createElement("p");
                        error.setAttribute("id", "error");
                        error.textContent = "Please fill out both fields";
                        div.append(error);
                    }
                }
                else {
                    document.querySelector("#add-card").removeEventListener("click", setCard);
                    document.querySelector("#add-button").removeEventListener("click", hideCard);
                    //add card to page
                    document.querySelector(".editing").innerHTML = "";
                    document.querySelector("#add-button").addEventListener("click", addCard);
                    const dt = document.createElement("dt");
                    const dd = document.createElement("dd");
                    dt.textContent = wordInput.value;
                    dd.textContent = defInput.value;
                    document.querySelector(".editing").append(dt);
                    document.querySelector(".editing").append(dd);
                    document.querySelector(".editing").removeAttribute("class");
                    //add card to local storage
                    Storage.addCards(setName,[[wordInput.value,defInput.value]]);

                }
            }
            const hideCard = function() {
                if(document.querySelector(".editing#hidden")) {
                    document.querySelector(".editing#hidden").removeAttribute("style");
                    document.querySelector(".editing#hidden").removeAttribute("id");
                } else{
                    document.querySelector(".editing").setAttribute("id", "hidden");
                    document.querySelector(".editing").setAttribute("style", "visibility: hidden;");
                }
            }
            document.querySelector("#add-button").removeEventListener("click", addCard);
            document.querySelector("#add-button").addEventListener("click", hideCard);
            document.querySelector("#add-card").addEventListener("click", setCard);
        }
        
        document.querySelector("#add-button").addEventListener("click", addCard);
    } else {
        notFound();
    }
}

setTimeout(main, 1);