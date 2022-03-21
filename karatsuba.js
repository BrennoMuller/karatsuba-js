//let x = Decimal.random(10000).mul(Decimal.pow(10,10000))
const Decimal = require('decimal.js');

function gerar_numero(n){
    let x = ""
    for(var i = 0; i<n; i++){
        x = x + "1";
    }

    return x;
}

function Karatsuba(u, v, n){
    let k, a, b, d, c, y, ac, bd, x, g;

    if(n <= 3){
        //console.log(u);
       // console.log(v)
     //   console.log(Decimal.mul(u, v))
        return Decimal.mul(u, v);
    }else{
        k = Decimal.ceil((Decimal.div(n, 2)));

        a = Decimal.floor(Decimal.div(u, Decimal.pow(10, k)));

        c = Decimal.floor(Decimal.div(v, Decimal.pow(10, k)));

        b = Decimal.mod(u, Decimal.pow(10, k));

        d = Decimal.mod(v, Decimal.pow(10, k));

        ac =  Karatsuba(a, c, k);
        bd =  Karatsuba(b, d, k);
        y  =  Karatsuba((Decimal.sum(a, b)), (Decimal.sum(c, d)), (Decimal.sum(k, 1)));
        console.log("y: ", y);

        x = Decimal.sum(Decimal.mul(ac, Decimal.pow(10, Decimal.mul(2, k))), Decimal.sum(Decimal.mul(Decimal.sub(Decimal.sub(y, ac), bd),  Decimal.pow(10, k)), bd));
        // x = Decimal.sum(x, );
        // x = Decimal.sub(x, bd);
        // x = Decimal.mul(x, );
        // x = Decimal.sum(x, bd);

   
        return x;

      //   x = (ac * Math.pow(10, (2*k))) + ((y - ac - bd) * Math.pow(10, k)) + bd;
    }
}


var TAM = new Decimal("6");
var A = new Decimal(gerar_numero(TAM));
var B = new Decimal(gerar_numero(TAM));

console.log(A);
console.log(B);
console.log(TAM);

console.log(Karatsuba(A, B, TAM));
