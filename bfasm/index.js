let ghpages = {
    ver: 0
} 

let config = {
    dualMem: true
}

function r( c, t ) {
    let o = "";
    for( let i = 0;i < t;i++ ) { o += c }
    return o;
}

let cmds = {
    mov( inpos, outpos ) {
        let usrcode = "";

        for( let i = 0;i < outpos.length;i++ ) {
            usrcode += r( ">", outpos[ i ] ) + "+" + r( "<", outpos[ i ] );
        }

        return `${ r( ">", inpos[ 0 ] ) }[-${ r( "<", inpos[ 0 ] ) }${ usrcode }${ r( ">", inpos[ 0 ] ) }]${ r( "<", inpos[ 0 ] ) }`;
    },
    "set": function( inpos, outpos ) {
        let usrcode = "";

        for( let i = 0;i < inpos.length;i++ ) {
            usrcode += r( ">", inpos[ i ] ) + r( "+", outpos[ 0 ] ) + r( "<", inpos[ i ] );
        }

        return usrcode;
    },
    swp(pos) {
        let usrcode = "";

        for( let i = 0;i < pos.length;i++ ) {
            usrcode += r( ">", pos[ i ] ) + "[-s+s]" + r( "<", pos[ i ] );
        }
        
        return usrcode;
    }
};

function getCode( funcObject ) {
    return (cmds[ funcObject.cmd ]||console.error)( ...funcObject.args );
}

function cleanBF( code, rec ) {
    code = code.replace( /\<\>/, "" );
    code = code.replace( /\>\</, "" );
    code = code.replace( /\+\-/, "" );
    code = code.replace( /\-\+/, "" );
    if( !rec && code !== cleanBF( code, true ) ) {
        return cleanBF( code );
    } else {
        return code;
    }
}

function convert( litArr ) {
    let text = litArr[ 0 ];
    let parsed = parser.parse( text );
    let out = "";
    for( let i = 0;i < parsed.length;i++ ) {
        out += getCode( parsed[ i ] );
    }
    out = cleanBF( out );
    return out;
}

function bf( code ) {
    out = `
let mem = new Uint8Array(256);
let mem2 = new Uint8Array(256);
let pointer = 0;`;
    for( let i = 0;i < code.length;i++ ) {
        switch( code.charAt( i ) ) {
            case ">":
                out += "\npointer++;"
                break;
            case "<":
                out += "\npointer--;"
                break;
            case "+":
                out += "\nmem[pointer]++;"
                break;
            case "-":
                out += "\nmem[pointer]--;"
                break;
            case ".":
                out += "\nalert(mem[pointer]);"
                break;
            case ",":
                out += "\nmem[pointer] = parseInt(prompt('?'));"
                break;
            case "[":
                out += "\nwhile(mem[pointer] !== 0) {"
                break;
            case "]":
                out += "\n};"
                break;
            case "s":
                if( config.dualMem ) {
                    out += `
{
    let temp1 = mem;
    mem = mem2;
    mem2 = temp1;
}`;
                }
                break;
        }
    }
    out += "\n\nreturn {pointer, mem};";
    return new Function( "", out );
}