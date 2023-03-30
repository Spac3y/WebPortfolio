function spin(object) {
    setInterval(function() {
        object.style.transform += "rotate(10deg)";
    }, 1);
}

spin(document.getElementsById('divId'));
