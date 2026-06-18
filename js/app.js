import { inicializarMenu } from './vista/ui-menu.js';
import { iniciarSesion } from './logica/usuario.js';

// Importamos la nueva función para actualizar el estado
import { crearTarea, eliminarTareaPorId, actualizarEstadoTareaPorId } from './logica/tareas.js';
import { renderizarTareaEnTablero, actualizarContadoresTablero } from './vista/ui-tablero.js';

console.log("🚀 Arrancando la aplicación...");

inicializarMenu(iniciarSesion);
actualizarContadoresTablero();

// ==========================================================================
// CONTROL DEL FORMULARIO DE TAREAS
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

            // Pasamos tres cosas: la tarea, la función de borrar y la función de mover
            renderizarTareaEnTablero(nuevaTarea, eliminarTareaPorId, actualizarEstadoTareaPorId);

            taskForm.reset();

        } catch (error) {
            formError.textContent = `⚠️ ${error.message}`;
            formError.removeAttribute('hidden');
        }
    });
}