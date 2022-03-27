//let x = Decimal.random(10000).mul(Decimal.pow(10,10000))
const Decimal = require('decimal.js');
const fs = require("fs")
var PdfPrinter = require('pdfmake');
const { PerformanceObserver, performance } = require('perf_hooks');


function gerar_numero(n){
    let x ="";
    for(var i = 0; i<n-1; i++){
        x = x + Math.floor(Math.random() * 10).toString(); //colocar aleatorio
    }

   // console.log(x);
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
        //console.log("y: ", y);

        x = Decimal.sum(Decimal.mul(ac, Decimal.pow(10, Decimal.mul(2, k))), Decimal.sum(Decimal.mul(Decimal.sub(Decimal.sub(y, ac), bd),  Decimal.pow(10, k)), bd));
        // x = Decimal.sum(x, );
        // x = Decimal.sub(x, bd);
        // x = Decimal.mul(x, );
        // x = Decimal.sum(x, bd);

   
        return x;

      //   x = (ac * Math.pow(10, (2*k))) + ((y - ac - bd) * Math.pow(10, k)) + bd;
    }
}



var TAM_100 = new Decimal("100");
var TAM_1000 = new Decimal("1000");
var TAM_10000 = new Decimal("10000");
var TAM_100000 = new Decimal("100000");
var TAM_1000000 = new Decimal("1000000");
var A, B, start;
var time = [];


 A = new Decimal(gerar_numero(TAM_100));
 B = new Decimal(gerar_numero(TAM_100));
 start = performance.now();
 Karatsuba(A, B, TAM_100);
 time[0] = (performance.now() - start).toFixed(3);


 A = new Decimal(gerar_numero(TAM_1000));
 B = new Decimal(gerar_numero(TAM_1000));
 start = performance.now();
 Karatsuba(A, B, TAM_1000);
 time[1] = (performance.now() - start).toFixed(3);


 A = new Decimal(gerar_numero(TAM_10000));
 B = new Decimal(gerar_numero(TAM_10000));
 start = performance.now();
 Karatsuba(A, B, TAM_10000);
 time[2] = (performance.now() - start).toFixed(3);


 A = new Decimal(gerar_numero(TAM_100000));
 B = new Decimal(gerar_numero(TAM_100000));
 start = performance.now();
 Karatsuba(A, B, TAM_100000);
 time[3] = (performance.now() - start).toFixed(3);


 A = new Decimal(gerar_numero(TAM_1000000));
 B = new Decimal(gerar_numero(TAM_1000000));
 start = performance.now();
 Karatsuba(A, B, TAM_1000000);
 time[4] = (performance.now() - start).toFixed(3);




///////// gerando pdf \\\\\\\\\\\\\\\\

const fonts = {
    Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
    }
}




var doc = {

    content:[
        {text: 'Atividade 6', style: 'header'},
        {
			style: 'tableExample',
			table: {
				heights: 28,
				body: [
                    ['Algoritmo', 'número de digitos', 'tempo de execução em ms'],
					['karatsuba', '100', time[0]],
					['karatsuba', '1000', time[1]],
					['karatsuba', '10000', time[2]],
                    ['karatsuba', '100000', time[3]],
                    ['karatsuba', '1000000', time[4]],
				],
			}
		},


    {text: 'Brenno Muller Vitorino', style: 'subheader'},
    ],
    styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	},
	defaultStyle: {
       
            font: "Helvetica",
      
	}
    
}


var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);

// Declaring your layout
var myTableLayouts = {
    exampleLayout: {

        defaultStyle: {
            font: "Helvetica",
        }
    }

};

// Building the PDF
var pdfDoc = printer.createPdfKitDocument(doc, {tableLayouts: myTableLayouts});

// Writing it to disk
pdfDoc.pipe(fs.createWriteStream('karatsuba.pdf'));
pdfDoc.end();
