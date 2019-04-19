/* Calculator demo -
 * Parses and executes mathematical expressions.
 * Written by Zach Carter. Annotated by Nolan Lawson.
 */

/* lexical grammar */
%lex
%%

[0-9]+                return 'NUM'
","                   return ','
"["                   return '['
"]"                   return ']'
[a-zA-Z]+             return 'CMD'
\n                    return 'NL'
\s                    return 'SP'
// EOF means "end of file"
<<EOF>>               return 'EOF'
// any other characters will throw an error

/lex

%start program

%% /* language grammar */

program
    : code EOF
        {return $1;}
    ;

code
    : code NL e
        {$$ = $1; $$.push($3);}
    | code NL
        {$$ = $1;}
    | e
        {$$ = [$1];}
    ;

e
    : CMD SP args
        {$$ = {cmd:$1,args:$3};}
    ;

args
    : args SP arg
        { $$ = $1; $$.push($3);}
    | arg
        { $$ = [$1];}
    ;    

arg
    : '[' numList ']'
        { $$ = $2; }
    | numList
        { $$ = $1; }
    ;

numList
    : numList ',' NUM
        {$$ = $1; $$.push(parseInt($3));}
    | numList ',' SP NUM
        {$$ = $1; $$.push(parseInt($4));}
    | NUM
        {$$ = [parseInt($1)];}
    ;