const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function pregunta(pregunta) {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta.trim());
        });
    });
}

async function ingresarPersona() {
    // Solicitar datos personales
    const nombre = await pregunta("Ingrese el nombre: ");
    const apellido = await pregunta("Ingrese el apellido: ");
    const dni = await pregunta("Ingrese el DNI: ");
    
    // Solicitar teléfonos (separados por comas)
    const telefonosInput = await pregunta("Ingrese los números de teléfono (separados por comas): ");
    const telefonos = telefonosInput.split(',').map(telefono => telefono.trim()).filter(telefono => telefono);
    
    // Solicitar hijos (separados por comas)
    const hijosInput = await pregunta("Ingrese los nombres de los hijos (separados por comas, o Enter si no tiene): ");
    const hijos = hijosInput.split(',').map(hijo => hijo.trim()).filter(hijo => hijo);
    
    // Retornar la persona como array
    return [nombre, apellido, dni, telefonos, hijos];
}

function mostrarTodosLosDatos(personas) {
    if (personas.length === 0) {
        console.log("No hay personas cargadas.");
        return;
    }
    
    console.log("\n--- Datos de Todas las Personas ---");
    personas.forEach(persona => {
        console.log(`Nombre: ${persona[0]} ${persona[1]}`);
        console.log(`DNI: ${persona[2]}`);
        console.log(`Teléfonos (${persona[3].length}): ${persona[3].join(', ')}`);
        console.log(`Hijos (${persona[4].length}): ${persona[4].length > 0 ? persona[4].join(', ') : 'Ninguno'}`);
        console.log("---");
    });
}

function filtrarPorDni(personas) {
    if (personas.length === 0) {
        console.log("No hay personas cargadas.");
        return;
    }
    
    return new Promise(async (resolve) => {
        const dniBuscar = await pregunta("Ingrese el DNI a buscar: ");
        
        const personaEncontrada = personas.find(persona => persona[2] === dniBuscar);
        
        if (personaEncontrada) {
            console.log("\n--- Datos de la Persona ---");
            console.log(`Nombre: ${personaEncontrada[0]} ${personaEncontrada[1]}`);
            console.log(`DNI: ${personaEncontrada[2]}`);
            console.log(`Teléfonos (${personaEncontrada[3].length}): ${personaEncontrada[3].join(', ')}`);
            console.log(`Hijos (${personaEncontrada[4].length}): ${personaEncontrada[4].length > 0 ? personaEncontrada[4].join(', ') : 'Ninguno'}`);
        } else {
            console.log(`No se encontró una persona con DNI ${dniBuscar}`);
        }
        
        resolve();
    });
}

async function main() {
    const personas = [];
    
    while (true) {
        // Menú de opciones
        console.log("\n--- Sistema de Gestión de Contactos ---");
        console.log("1. Ingresar nueva persona");
        console.log("2. Mostrar todos los datos");
        console.log("3. Filtrar por DNI");
        console.log("4. Salir");
        
        // Solicitar opción
        const opcion = await pregunta("Seleccione una opción (1-4): ");
        
        // Procesar opción seleccionada
        switch (opcion) {
            case '1':
                const persona = await ingresarPersona();
                personas.push(persona);
                console.log("Persona agregada exitosamente.");
                break;
            case '2':
                mostrarTodosLosDatos(personas);
                break;
            case '3':
                await filtrarPorDni(personas);
                break;
            case '4':
                console.log("Saliendo del programa. ¡Hasta luego!");
                rl.close();
                return;
            default:
                console.log("Opción inválida. Por favor, seleccione una opción del 1 al 4.");
        }
    }
}

main();