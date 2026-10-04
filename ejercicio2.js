const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

async function solicitarCantidad(mensaje) {
	while (true) {
		const valorIngresado = await rl.question(mensaje);
		const cantidad = parseInt(valorIngresado, 10);

		if (!isNaN(cantidad) && cantidad > 0) {
			return cantidad;
		}

		console.log('Ingresa un número entero mayor que cero.');
	}
}

async function main() {
	const cantidadLotes = await solicitarCantidad('Número de lotes a revisar: ');
	const cajasPorLote = await solicitarCantidad('Número de cajas por lote: ');

	console.log('\nResultado de la revisión de inventario:');

	for (let lote = 1; lote <= cantidadLotes; lote++) {
		console.log(`\nLote ${lote}`);

		for (let caja = 1; caja <= cajasPorLote; caja++) {
			const codigo = lote * caja * 2;
			let estado;

			if (codigo % 4 === 0) {
				estado = 'Revisión Prioritaria ⚠️';
			} else {
				estado = 'Aprobado 🟢';
			}

			console.log(`  Caja ${caja} - Código ${codigo}: ${estado}`);
		}
	}

	rl.close();
}

main().catch((error) => {
	console.error('Ocurrió un error al ejecutar el programa:', error);
	rl.close();
	process.exitCode = 1;
});
