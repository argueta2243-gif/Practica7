const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

async function solicitarCantidad(mensaje) {
	while (true) {
		const valorIngresado = await rl.question(mensaje);
		const cantidad = Number(valorIngresado);

		if (!isNaN(cantidad) && Number.isInteger(cantidad) && cantidad > 0) {
			return cantidad;
		}

		console.log('Ingresa un número entero mayor que cero.');
	}
}

async function main() {
	const cantidadLineas = await solicitarCantidad('Cantidad de líneas de ensamblaje: ');
	const sensoresPorLinea = await solicitarCantidad('Cantidad de sensores por línea: ');

	console.log('\nTablero de calificación de sensores:');

	for (let linea = 1; linea <= cantidadLineas; linea++) {
		console.log(`\nLínea de ensamblaje ${linea}`);

		for (let sensor = 1; sensor <= sensoresPorLinea; sensor++) {
			const rendimiento = linea * sensor * 5;
			let estado;

			if (rendimiento >= 50) {
				estado = 'Óptimo 🚀';
			} else if (rendimiento >= 25) {
				estado = 'Mantenimiento Preventivo 🛠️';
			} else {
				estado = 'Falla de Lectura ❌';
			}

			console.log(`  Sensor ${sensor} - Rendimiento ${rendimiento}: Estado: ${estado}`);
		}
	}

	rl.close();
}

main().catch((error) => {
	console.error('Ocurrió un error al ejecutar el programa:', error);
	rl.close();
	process.exitCode = 1;
});
