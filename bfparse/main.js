import brainfuck from "./brainfuck.js";

function html(test) {
    let a = document.createElement("div");
    a.innerHTML = test;
    document.appendChild(a.firstChild);
    return a.firstChild;
}

window.bf = brainfuck;

let a = new brainfuck;
window.a = a;

