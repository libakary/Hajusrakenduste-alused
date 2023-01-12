document.getElementById("app").innerHTML = `<table id = "xmlTable"></table>`

const getXml=function(fileName) {
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.open("GET", fileName, false)
    xmlhttp.send()
    return xmlhttp.responseXML
}

const getPlatforms = function(htmlCollection) { // tegime eraldi funktsiooni
    return [...htmlCollection].map(element => element.childNodes[0].nodeValue).join("/")
}

const generateTable = function(XMLContent) {
    let tableRows = "<tr><th>Title</th><th>Price</th><th>Platforms</th><tr>"
    const gameElements = XMLContent.getElementsByTagName("game")
    //const platformElements = XMLContent.getElementsByTagName("platforms")
    for (let i = 0; i < gameElements.length; i++) {
        const game = gameElements[i];
        console.log(game);
        tableRows += "<tr><td>" +
            game.getElementsByTagName("title")[0].childNodes[0].nodeValue +
            "</td><td>" +
            game.getElementsByTagName("price")[0].childNodes[0].nodeValue +
            "</td><td>" +
            getPlatforms(game.getElementsByTagName("platform")) +
            "</td></tr>" 

            //var y=x[i].getElementsByTagName("books");
            //document.write(y[n].getElementsByTagName("title")[n].childNodes[n].nodeValue);
            //for (let j = 0; j < platformElements.length; j++) {
                //const platform = platformElements[j];
                //platform[0].getElementsByTagName("platform")[0].childNodes[0].nodeValue + "/"
            //} +
            //"</td><tr>"
    }
    document.getElementById("xmlTable").innerHTML = tableRows
}

generateTable(getXml("src/games.xml"))