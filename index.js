let sets = localStorage.getItem("sets");
const elements = {
    ul: document.querySelector("ul")
}
const setColors = function() {
    const randColor = function(e) {
        let colors = ["#bec8e5","#dbbee5", "#e5dbbe", "#c8e5be", "#e5bebe", "#e5d1be"];
        e.style.backgroundColor = colors[Math.floor(Math.random() * 6)];
    }
    const lis = document.querySelectorAll("li");
    lis.forEach((li) => {randColor(li)});
}
const loadCards = function(s) {
    for(let i in s){
        const li = document.createElement("li");
        li.innerHTML = "<a href='./browse.html'><h2>" + s[i].name + "</h2><p>" + s[i].course + "</p><p>" + Object.keys(s[i].cards).length + " words</p></a>"
        const link = './browse.html?name=' + s[i].name + '&course=' + s[i].course;
        li.firstElementChild.setAttribute('href', link);
        elements.ul.append(li);
    }
}


loadCards(JSON.parse(sets));
setColors();

