// Calculadora de Precios de Productos
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcularPrecioFinal(costoMateriaPrima, margenGanancia, impuestos) {
    const ganancia = costoMateriaPrima * (margenGanancia / 100);
    const precioAntesImpuestos = costoMateriaPrima + ganancia;
    const valorImpuestos = precioAntesImpuestos * (impuestos / 100);
    const precioFinal = precioAntesImpuestos + valorImpuestos;
    
    return {
        precioFinal,
        ganancia,
        valorImpuestos
    };
}

function calcularGananciaTotal(precioFinal, costoMateriaPrima, cantidadVentas) {
    const gananciaPorUnidad = precioFinal - costoMateriaPrima;
    return gananciaPorUnidad * cantidadVentas;
}

function iniciarCalculadora() {
    console.log('=== Calculadora de Precios de Productos ===\n');
    
    rl.question('Ingrese el costo de la materia prima: ', (costoMateriaPrima) => {
        rl.question('Ingrese el margen de ganancia deseado (%): ', (margenGanancia) => {
            rl.question('Ingrese el porcentaje de impuestos (%): ', (impuestos) => {
                const resultado = calcularPrecioFinal(
                    parseFloat(costoMateriaPrima),
                    parseFloat(margenGanancia),
                    parseFloat(impuestos)
                );

                console.log('\n=== Resultados del Cálculo ===');
                console.log(`Precio Final del Producto: $${resultado.precioFinal.toFixed(2)}`);
                console.log(`Ganancia por Unidad: $${resultado.ganancia.toFixed(2)}`);
                console.log(`Impuestos por Unidad: $${resultado.valorImpuestos.toFixed(2)}`);

                rl.question('\n¿Cuántas ventas espera realizar?: ', (cantidadVentas) => {
                    const gananciaTotal = calcularGananciaTotal(
                        resultado.precioFinal,
                        parseFloat(costoMateriaPrima),
                        parseFloat(cantidadVentas)
                    );

                    console.log('\n=== Proyección de Ventas ===');
                    console.log(`Ganancia Total Esperada: $${gananciaTotal.toFixed(2)}`);
                    console.log(`Cantidad de Ventas: ${cantidadVentas}`);
                    
                    rl.close();
                });
            });
        });
    });
}

// Iniciar la calculadora
iniciarCalculadora(); 