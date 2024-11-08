const Storage = {
    getSetName: function(name, course) {
        return "set-" + name.replace(" ", "-") + "-" + course.replace(" ", "-");
    },
    getAllSetInfo: function() {
        return JSON.parse(localStorage.getItem("sets"));
    },
    createSet: function(name, course, cards){
        if(!this.getAllSetInfo()){
            localStorage.setItem("sets","{}");
        }
        const allSets = this.getAllSetInfo();
        allSets[this.getSetName(name,course)] = {name:name, course:course, cards:cards};
        localStorage.setItem("sets",JSON.stringify(allSets));
    },
    addCards: function(setName, cards){
        const allSets = this.getAllSetInfo();
        for(let i in cards){
            allSets[setName].cards.push(cards[i]);
        }
        
        localStorage.setItem("sets",JSON.stringify(allSets));
    },
    getSetInfo: function(setName) {
        return JSON.parse(localStorage.getItem("sets"))[setName];
    }
}

/*
{
    sets:{
        set-set1-coen161:{
            name:set1,
            course:coen161
            cards:[
                [word1,def1],
                [word2,def2]
            ]
        },
        set-set2-coen161:{
            etc...
        }
    }
}
*/