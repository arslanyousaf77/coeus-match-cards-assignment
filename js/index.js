var mainDiv = document.getElementById("game");
var timer = document.createElement("div");
timer.setAttribute("id", "counter");
timer.style = "font-weight:bold; font-size:18pt;";
mainDiv.appendChild(timer);

var attempts = document.createElement("div");
attempts.setAttribute("id", "attempts");
attempts.style = "font-weight:bold; font-size:18pt;";
mainDiv.appendChild(attempts);
document.getElementById("attempts").innerHTML = "Attempts: " + 0;
var count = 0;
var timeInterval = setInterval(myTimer, 1000);

function myTimer() {

    document.getElementById("counter").innerHTML = "Timer: " + count++;
}

var gameBoard = document.createElement("div");
gameBoard.setAttribute("id", "gameBoard");
gameBoard.style = "border: 2px solid black; width:680px; height: 400px;";
mainDiv.appendChild(gameBoard);

for (let i = 0; i < 6; i++) {
    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("id", "div" + i);
    cardDiv.setAttribute("onclick", "showImage(this)");
    cardDiv.style = "border: 2px solid black; width:200px; height: 170px; margin:10px; float:left; background-color:red;";
    gameBoard.appendChild(cardDiv);

}

var imgSrcArr = ["images/butterfly.jpg", "images/lion.jpg", "images/tortoise.jpg", "images/butterfly.jpg", "images/lion.jpg", "images/tortoise.jpg"];
shuffle(imgSrcArr);

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

for (let i = 0; i < 6; i++) {
    var img = document.createElement("img");
    img.src = imgSrcArr[i];
    img.setAttribute("id", "img" + i);
    img.style = "width:200px; height: 170px; visibility: hidden;";
    document.getElementById("div" + i).appendChild(img);

}
var tempVisibleImgPath = null;
var tempVisibleDivId = null;
var attemptCount = 0;
var gameEnd = false;
function showImage(ele) {
    if(gameEnd)
    {
        return;
    }

    document.getElementById("attempts").innerHTML = "Attempts: " + ++attemptCount;

    var clickedDiv = document.getElementById(ele.id);
    var clickedImg = document.getElementById(ele.id).firstChild;
    clickedImg.style.visibility = "visible";

    if (tempVisibleImgPath == null) {
        tempVisibleImgPath = clickedImg.src;
        tempVisibleDivId = ele.id;

    }
    else if (tempVisibleImgPath != null) {
        if (tempVisibleImgPath != clickedImg.src) {
            document.getElementById(tempVisibleDivId).firstChild.style.visibility = "hidden";
            tempVisibleDivId = null;
            tempVisibleImgPath = null;
            clickedImg.style.visibility = "hidden";

        }
        else if (tempVisibleImgPath == clickedImg.src && tempVisibleDivId != ele.id) {
            tempVisibleDivId = null;
            tempVisibleImgPath = null;
            if (checkAllVisible()) {
                clearInterval(timeInterval);
                gameEnd = true;
            }

        }
    }
}

function checkAllVisible() {
    for (let i = 0; i < 6; i++) {

        if (document.getElementById("img" + i).style.visibility == "hidden") {
            return false;
        }
    }
    return true;
}
