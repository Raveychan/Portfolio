function pickColor() {
    var math = Math.floor(Math.random() * 3) + 1;
    var target = document.getElementsByClassName("quote");

    if (math === 1) {
        target.className += " yellow";
    }
    else if (math === 2) {
        target.className += " pink";
    }
    else {
        target.className += " purple";
    }
}

var item = document.getElementsByClassName("quote");
for (var i = 0 ; i < item.length; i++) {
    item[i].addEventListener('mouseover' , func , false ) ;
}

function func()
{
    var item = document.getElementById("quote");
    item.className += "yellow";
}

