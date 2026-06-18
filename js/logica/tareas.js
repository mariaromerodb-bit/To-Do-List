// Este array será nuestra base de datos temporal en memoria
let listadoTareas = [];

/**
 * Crea una nueva tarea y la añade al listado general.
 * @param {Object} datosTarea - Objeto con la información capturada del formulario
 */
export function crearTarea(datosTarea) {
    const { titulo, subtarea, contexto, prioridad, plazo, estado } = datosTarea;

    // 1. Validación básica de negocio (El título es obligatorio)
    if (!titulo || titulo.trim() === "") {
        throw new Error("El título de la tarea es obligatorio.");
    }

    // 2. Estructuramos el objeto final de la tarea añadiendo metadatos esenciales
    const nuevaTarea = {
        id: crypto.randomUUID(), // Genera un ID único e irrepetible de forma nativa
        titulo: titulo.trim(),
        subtarea: subtarea ? subtarea.trim() : "",
        contexto: contexto || "trabajo",
        prioridad: prioridad || "medio",
        plazo: plazo || "",
        estado: estado || "pendiente",
        fechaCreacion: new Date().toISOString()
    };

    // 3. La guardamos en nuestra "base de datos" en memoria
    listadoTareas.push(nuevaTarea);

    console.log("Lógica: Tarea creada con éxito:", nuevaTarea);
    console.log("Lógica: Listado total actual:", listadoTareas);

    return nuevaTarea;
}

/**
 * Devuelve todas las tareas almacenadas actualmente.
 */
export function obtenerTodasLasTareas() {
    return listadoTareas;
}
/**
 * Elimina una tarea del listado general usando su ID.
 * @param {string} id - El ID único de la tarea a eliminar
 */
export function eliminarTareaPorId(id) {
    // Filtramos el array para quedarnos con todas las tareas MENOS la que coincide con el ID
    listadoTareas = listadoTareas.filter(tarea => tarea.id !== id);
    
    console.log(`Lógica: Tarea con ID ${id} eliminada.`);
    console.log("Lógica: Listado actualizado:", listadoTareas);
}
/**
 * Modifica el estado de una tarea existente en el listado general.
 * @param {string} id - El ID único de la tarea
 * @param {string} nuevoEstado - El nuevo estado ('pendiente', 'proceso' o 'completado')
 */
export function actualizarEstadoTareaPorId(id, nuevoEstado) {
    // Buscamos la tarea dentro de nuestra lista
    const tarea = listadoTareas.find(t => t.id === id);
    
    if (tarea) {
        tarea.estado = nuevoEstado;
        console.log(`Lógica: Tarea "${tarea.titulo}" movida a -> ${nuevoEstado}`);
        console.log("Lógica: Listado actualizado:", listadoTareas);
        return tarea;
    }
}