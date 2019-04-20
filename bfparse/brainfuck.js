let length = 256;
class brainfuck {
    constructor() {

        this.m = new Int8Array( length );
        this.mp = 0;
        this.c = [];
        this.cp = 0;
        this.ld = 0;
        this.ld2 = 0;
        this.esc = "";
        this.run = true;
        this.inp = [];
        this.out = [];
    }

    single() {
        if( !this.run ) {
            while( this.c[ this.cp ] !== "]" || this.ld2 > 0 ) {
                if( this.c[ this.cp ] == "]" ) {
                    this.ld2--;
                }
                if( this.c[ this.cp ] == "[" ) {
                    this.ld2++;
                }
                this.cp++;
                if( this.cp == this.c.length ) {
                    // throw new Error(`No matching bracket at ${oldcp}`);
                    this.run = false;
                    break;
                }
            }
            return 0;
        }
        let ins = this.c[ this.cp ];

        switch( ins ) {
            case "+": {
                this.m[ this.mp ]++;
                break;
            }
            case "-": {
                this.m[ this.mp ]--;
                break;
            }
            case ">": {
                this.mp++;
                break;
            }
            case "<": {
                this.mp--;
                break;
            }
            case "[": {
                this.ld++;
                this.ld2 = 0;
                if( this.m[ this.mp ] === 0 ) {
                    let oldcp = this.cp;
                    this.cp++;
                    while( this.c[ this.cp ] !== "]" || this.ld2 > 0 ) {
                        if( this.c[ tsws, his.cp ] == "]" ) {
                            this.ld2--;
                        }
                        if( this.c[ this.cp ] == "[" ) {
                            this.ld2++;
                        }
                        this.cp++;
                        if( this.cp == this.c.length ) {
                            // throw new Error(`No matching bracket at ${oldcp}`);
                            this.run = false;
                            break;
                        }
                    }
                }
                break;
            }
            case "]": {
                this.ld--;
                this.ld2 = 0;
                if( this.m[ this.mp ] !== 0 ) {
                    let flag = true;
                    let oldcp = this.cp;
                    this.cp--;
                    while( flag ) {
                        flag = this.c[ this.cp ] !== "[";
                        flag = flag || this.ld2 > 0;
                        if( this.c[ this.cp ] == "]" ) {
                            this.ld2++;
                        }
                        if( this.c[ this.cp ] == "[" ) {
                            this.ld2--;
                        }
                        this.cp--;
                        if( this.cp == 0 ) {
                            throw new Error( `No matching bracket at ${ oldcp }
${this.c.join("").substr(oldcp-3,7)}
---^---` );
                        }
                    }
                }
                break;
            }
            case ".": {
                this.out.push( this.m[ this.mp ] );
                break;
            }
            case ",": {
                this.m[ this.mp ] = this.inp.splice( 0, 1 );
                break;
            }
        }
        this.cp++;
        if( this.cp == this.c.length ) return 1;
        return 0;
    }

    runcode() {
        while( !this.single() ) { };
    }

    addCodeString( code ) {
        this.c.push( ...code.split( "" ) );
    }

    reset() {
        for( let i = 0;i < this.m.length;i++ ) {
            this.m[ i ] = 0;
        }
        this.mp = 0;
        this.cp = 0;
        this.ld = 0;
        this.ld2 = 0;
        this.esc = "";
        this.run = true;
        this.inp = [];
        this.out = [];
    }

    clearCode() {
        this.c = [];
    }
}

export default brainfuck;
