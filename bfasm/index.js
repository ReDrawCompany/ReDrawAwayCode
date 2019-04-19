let ghpages = {
    ver: 8
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
    add( inpos, outpos ) {
        let usrcode = "";

        for( let i = 0;i < inpos.length;i++ ) {
            usrcode += r( ">", inpos[ i ] ) + r( "+", outpos[ 0 ] ) + r( "<", inpos[ i ] );
        }

        return usrcode;
    },
    sub( inpos, outpos ) {
        let usrcode = "";

        for( let i = 0;i < inpos.length;i++ ) {
            usrcode += r( ">", inpos[ i ] ) + r( "-", outpos[ 0 ] ) + r( "<", inpos[ i ] );
        }

        return usrcode;
    },
    "set": function( inpos, outpos ) {
        let usrcode = "";

        for( let i = 0;i < inpos.length;i++ ) {
            usrcode += "[-]" + r( ">", inpos[ i ] ) + r( "+", outpos[ 0 ] ) + r( "<", inpos[ i ] );
        }

        return usrcode;
    },
    swp( pos ) {
        let usrcode = "";

        for( let i = 0;i < pos.length;i++ ) {
            usrcode += r( ">", pos[ i ] ) + "[-s+s]" + r( "<", pos[ i ] );
        }

        return usrcode;
    },
    sum( inpos, outpos ) {
        let usrcode = "";

        usrcode += convert`swp ${ JSON.stringify( inpos ) }`;
        usrcode += "s";
        for( let i = 0;i < inpos.length;i++ ) {
            usrcode += convert`mov ${ inpos[ i ] } ${ inpos[ i ] + inpos.length },${ inpos[ i ] + inpos.length * 2 }`;
            usrcode += convert`mov ${ inpos[ i ] + inpos.length * 2 } ${ inpos[ i ] }`
        }

        usrcode += "s";
        return usrcode;
    }
};

function getCode( funcObject ) {
    return ( cmds[ funcObject.cmd ] || console.error )( ...funcObject.args );
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

function getStringForLitArr( argu ) {
    let args = Array.from( argu );
    let out = args[ 0 ][ 0 ];
    let strs = args[0];
    let rest = args.slice( 1 );

    for(let i = 0;i<strs.length;i++) {
        out += rest[i] + strs[i];
    }
    return out;
}

function convert( litArr ) {
    let text = ( typeof litArr == "string" ) ? litArr : getStringForLitArr(arguments);
    console.log(text);
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
let pointer = 0;
let tempvar = null;`;
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
    tempvar = mem;
    mem = mem2;
    mem2 = tempvar;
}`;
                }
                break;
        }
    }
    out += "\n\nreturn {pointer, mem, mem2};";
    return new Function( "", out );
}