// Funciones de cálculo
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

// Función para formatear números como moneda
function formatearMoneda(valor) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD'
    }).format(valor);
}

// Función para actualizar los resultados en la interfaz
function actualizarResultados(resultado, cantidadVentas) {
    document.getElementById('precioFinal').textContent = formatearMoneda(resultado.precioFinal);
    document.getElementById('gananciaUnidad').textContent = formatearMoneda(resultado.ganancia);
    document.getElementById('impuestosUnidad').textContent = formatearMoneda(resultado.valorImpuestos);
    
    const gananciaTotal = calcularGananciaTotal(
        resultado.precioFinal,
        parseFloat(document.getElementById('costoMateriaPrima').value),
        cantidadVentas
    );
    
    document.getElementById('gananciaTotal').textContent = formatearMoneda(gananciaTotal);
    document.getElementById('ventasCantidad').textContent = cantidadVentas;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcularBtn');
    
    calcularBtn.addEventListener('click', () => {
        const costoMateriaPrima = parseFloat(document.getElementById('costoMateriaPrima').value);
        const margenGanancia = parseFloat(document.getElementById('margenGanancia').value);
        const impuestos = parseFloat(document.getElementById('impuestos').value);
        const cantidadVentas = parseFloat(document.getElementById('cantidadVentas').value);
        
        if (isNaN(costoMateriaPrima) || isNaN(margenGanancia) || isNaN(impuestos) || isNaN(cantidadVentas)) {
            alert('Por favor, complete todos los campos con valores válidos.');
            return;
        }
        
        const resultado = calcularPrecioFinal(costoMateriaPrima, margenGanancia, impuestos);
        actualizarResultados(resultado, cantidadVentas);
    });
}); 