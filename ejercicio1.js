const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

async function solicitarCantidad(mensaje) {
	while (true) {
		const valorIngresado = await rl.question(mensaje);
		const cantidad = Number(valorIngresado);

		if (!isNaN(cantidad) && cantidad > 0 && Number.isInteger(cantidad)) {
			return cantidad;
		}

		console.log('Ingresa un número entero mayor que cero.');
	}
}

async function main() {
	const cantidadDepartamentos = await solicitarCantidad('Cantidad de departamentos: ');
	const empleadosPorDepartamento = await solicitarCantidad('Cantidad de empleados por departamento: ');

	console.log('\nMatriz de asistencia semanal por departamento:');

	for (let departamento = 1; departamento <= cantidadDepartamentos; departamento++) {
		console.log(`\nDepartamento ${departamento}`);

		for (let empleado = 1; empleado <= empleadosPorDepartamento; empleado++) {
			let turno;

			if (departamento % 2 !== 0) {
				turno = 'Mañana';
			} else {
				turno = 'Tarde';
			}

			console.log(`  Empleado ${empleado}: ${turno}`);
		}
	}

	rl.close();
}

main().catch((error) => {
	console.error('Ocurrió un error al ejecutar el programa:', error);
	rl.close();
	process.exitCode = 1;
});
