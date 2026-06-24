import { inicializarMenu } from './vista/ui-menu.js';
import { iniciarSesion } from './logica/usuario.js';

// Añadimos 'obtenerTodasLasTareas' a la importación de la lógica
import { crearTarea, eliminarTareaPorId, actualizarEstadoTareaPorId, obtenerTodasLasTareas } from './logica/tareas.js';
import { renderizarTareaEnTablero, actualizarContadoresTablero } from './vista/ui-tablero.js';

console.log("🚀 Arrancando la aplicación...");

// 1. Inicializamos menús y registro de usuario
inicializarMenu(iniciarSesion);

// 2. Seteamos los contadores a (0) por si acaso
actualizarContadoresTablero();


// ==========================================================================
// NUEVO: RECUPERAR Y PINTAR TAREAS GUARDADAS AL ARRANCAR
// ==========================================================================
// Le pedimos a la lógica la lista de tareas que leyó del LocalStorage
const tareasGuardadas = obtenerTodasLasTareas();

// Si hay tareas guardadas del día anterior, las recorremos una a una
if (tareasGuardadas && tareasGuardadas.length > 0) {
    console.log(`📦 Encontradas ${tareasGuardadas.length} tareas en LocalStorage. Renderizando...`);
    
    tareasGuardadas.forEach(tarea => {
        // Las pintamos en el tablero pasándole sus funciones correspondientes
        renderizarTareaEnTablero(tarea, eliminarTareaPorId, actualizarEstadoTareaPorId);
    });
}


// ==========================================================================
// CONTROL DEL FORMULARIO DE TAREAS (Sigue exactamente igual que antes)
// ==========================================================================
const taskForm = document.getElementById('task-form');
const formError = document.getElementById('form-error');

if (taskForm) {
    taskForm.addEventListener('submit', (evento) => {
        evento.preventDefault(); 

        formError.setAttribute('hidden', 'true');

        const datosFormulario = {
            titulo: document.getElementById('task-title').value,
            subtarea: document.getElementById('task-subtitle').value,
            contexto: document.getElementById('task-context').value,
            prioridad: document.getElementById('task-priority').value,
            plazo: document.getElementById('task-deadline').value,
            estado: document.getElementById('task-status').value
        };

        try {
            const nuevaTarea = crearTarea(datosFormulario);

            // Pintamos la nueva tarea pasándole las funciones necesarias
            renderizarTareaEnTablero(nuevaTarea, eliminarTareaPorId, actualizarEstadoTareaPorId);

            taskForm.reset();

        } catch (error) {
            formError.textContent = `⚠️ ${error.message}`;
            formError.removeAttribute('hidden');
        }
    });
}