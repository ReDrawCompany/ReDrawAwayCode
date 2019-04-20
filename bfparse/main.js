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

let code = html `<div></div>`;
setInterval(()=>{
    code.innerHTML = a.c.join("").substr(0,a.cp)+"<span style=\"color: red;\">"+a.c.join("").substr(a.cp+1,1)+"</span>"+a.c.join("").substr(a.cp+2)
},100)