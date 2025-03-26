def ingresar_persona():
    
    # Función para cargar los datos de una persona
    
    # Solicitar datos personales
    nombre = input("Ingrese el nombre: ").strip()
    apellido = input("Ingrese el apellido: ").strip()
    dni = input("Ingrese el DNI: ").strip()
    
    # Solicitar teléfonos (separados por comas)
    telefonos_input = input("Ingrese los números de teléfono (separados por comas): ").strip()
    telefonos = [telefono.strip() for telefono in telefonos_input.split(',') if telefono.strip()]
    
    # Solicitar hijos (separados por comas)
    hijos_input = input("Ingrese los nombres de los hijos (separados por comas, o Enter si no tiene): ").strip()
    hijos = [hijo.strip() for hijo in hijos_input.split(',') if hijo.strip()]
    
    # Retornar la persona como lista
    return [nombre, apellido, dni, telefonos, hijos]

def mostrar_todos_los_datos(personas):
    
    # Mostrar todos los datos ingresados
    
    print("\n--- Datos de Todas las Personas ---")
    for persona in personas:
        print(f"Nombre: {persona[0]} {persona[1]}")
        print(f"DNI: {persona[2]}")
        print(f"Teléfonos ({len(persona[3])}): {', '.join(persona[3])}")
        print(f"Hijos ({len(persona[4])}): {', '.join(persona[4]) if persona[4] else 'Ninguno'}")
        print("---")

def filtrar_por_dni(personas):
    
    # Filtrar y mostrar datos por DNI
    
    if not personas:
        print("No hay personas cargadas.")
        return
    
    dni_buscar = input("Ingrese el DNI a buscar: ").strip()
    
    for persona in personas:
        if persona[2] == dni_buscar:
            print("\n--- Datos de la Persona ---")
            print(f"Nombre: {persona[0]} {persona[1]}")
            print(f"DNI: {persona[2]}")
            print(f"Teléfonos ({len(persona[3])}): {', '.join(persona[3])}")
            print(f"Hijos ({len(persona[4])}): {', '.join(persona[4]) if persona[4] else 'Ninguno'}")
            return
    
    print(f"No se encontró una persona con DNI {dni_buscar}")

def main():
    # Lista para almacenar todas las personas
    personas = []
    
    while True:
        # Menú de opciones
        print("\n--- Sistema de Gestión de Contactos ---")
        print("1. Ingresar nueva persona")
        print("2. Mostrar todos los datos")
        print("3. Filtrar por DNI")
        print("4. Salir")
        
        # Solicitar opción
        opcion = input("Seleccione una opción (1-4): ").strip()
        
        # Procesar opción seleccionada
        if opcion == '1':
            persona = ingresar_persona()
            personas.append(persona)
            print("Persona agregada exitosamente.")
        elif opcion == '2':
            mostrar_todos_los_datos(personas)
        elif opcion == '3':
            filtrar_por_dni(personas)
        elif opcion == '4':
            print("Saliendo del programa. ¡Hasta luego!")
            break
        else:
            print("Opción inválida. Por favor, seleccione una opción del 1 al 4.")

    main()