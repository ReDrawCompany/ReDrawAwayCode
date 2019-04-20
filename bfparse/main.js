import brainfuck from "./brainfuck.js";
//mem2
function html(test) {
    let a = document.createElement("div");
    a.innerHTML = test;
    let b = a.firstElementChild;
    document.body.appendChild(b);
    return b;
}

window.bf = brainfuck;

let a = new brainfuck;
window.a = a;

let code = html `<div></div>`;
setInterval(()=>{
    code.innerHTML = a.c.join("").substr(0,a.cp)+"<span style=\"color: red;\">"+a.c.join("").substr(a.cp+1,1)+"</span>"+a.c.join("").substr(a.cp+2)
},100)