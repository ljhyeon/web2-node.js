/*function a() {
    console.log('A');
}

a();*/

var a = function() {
    console.log('A');
}

a();

function slowfunc(callback) {
    callback();
}

slowfunc(a);