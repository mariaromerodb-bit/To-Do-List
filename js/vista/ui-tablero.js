/**
 * Traduce los valores internos del estado al texto limpio que verá el usuario.
 */
function obtenerTextoPrioridad(prioridad) {
    const mapeo = {
        'alto': 'Alto',
        'medio': 'Medio',
        'bajo': 'Bajo'
    };
    return mapeo[prioridad] || 'Medio';
}

/**
 * Traduce el valor del contexto a su versión con emoji para la tarjeta.
 */
function obtenerTextoContexto(contexto) {
    const mapeo = {
        'trabajo': '💼 Trabajo',
        'estudio': '🎓 Estudio',
        'hogar': '🏠 Hogar',
        'personal': '💆 Personal'
    };
    return mapeo[contexto] || '💼 Trabajo';
}

/**
 * Cuenta las tarjetas reales que hay en cada columna y actualiza los encabezados <h3>.
 */
export function actualizarContadoresTablero() {
    const columnas = [
        { selector: '.col-pending', idTexto: 'title-pending', baseTexto: 'PENDIENTE' },
        { selector: '.col-progress', idTexto: 'title-progress', baseTexto: 'EN PROCESO' },
        { selector: '.col-completed', idTexto: 'title-completed', baseTexto: 'COMPLETADO' }
    ];

    columnas.forEach(col => {
        const elementoColumna = document.querySelector(col.selector);
        const elementoH3 = document.getElementById(col.idTexto);

        if (elementoColumna && elementoH3) {
            const numeroTareas = elementoColumna.querySelectorAll('.task-card').length;
            const dotHTML = elementoH3.querySelector('.dot') ? elementoH3.querySelector('.dot').outerHTML : '';
            elementoH3.innerHTML = `${dotHTML} ${col.baseTexto} (${numeroTareas})`;
        }
    });
}

/**
 * Toma un objeto tarea, lo dibuja en su columna correspondiente y le añade sus eventos.
 * @param {Object} tarea - El objeto con los datos de la tarea
 * @param {Function} funcionLogicaEliminar - Función de la capa lógica para borrar
 * @param {Function} funcionLogicaMover - Función de la capa lógica para cambiar de estado
 */
export function renderizarTareaEnTablero(tarea, funcionLogicaEliminar, funcionLogicaMover) {
    // 1. Buscamos la columna correcta basándonos en el estado de la tarea
    let claseColumna = '.col-pending';
    if (tarea.estado === 'proceso') claseColumna = '.col-progress';
    if (tarea.estado === 'completado') claseColumna = '.col-completed';

    const columna = document.querySelector(claseColumna);
    if (!columna) return;

    let contenedorTarjetas = columna.querySelector('.cards-container');
    if (!contenedorTarjetas) {
        contenedorTarjetas = document.createElement('div');
        contenedorTarjetas.className = 'cards-container';
        columna.appendChild(contenedorTarjetas);
    }

    // 2. Construimos la tarjeta físicamente
    const tarjeta = document.createElement('article');
    tarjeta.className = `task-card border-${tarea.prioridad || 'medio'}`;
    tarjeta.setAttribute('data-id', tarea.id);

    // 3. Inyectamos la estructura interna añadiendo un selector de estado (<select class="btn-move-task">)
    tarjeta.innerHTML = `
        <div class="card-header">
            <h4>${tarea.titulo}</h4>
            <button type="button" class="card-actions btn-delete-task" style="background: none; border: none; font-size: 14px;" title="Eliminar tarea">🗑️</button>
        </div>
        ${tarea.subtarea ? `<p class="user-action-hint" style="margin-bottom: 8px;">↳ ${tarea.subtarea}</p>` : ''}
        
        <div class="card-tags" style="margin-bottom: 10px;">
            <span class="tag">${obtenerTextoContexto(tarea.contexto)}</span>
            <span class="tag">Prio: ${obtenerTextoPrioridad(tarea.prioridad)}</span>
            ${tarea.plazo ? `<span class="tag">📅 ${tarea.plazo}</span>` : ''}
        </div>

        <div style="display: flex; align-items: center; gap: 5px; font-size: 12px; border-top: 1px dashed #eee; padding-top: 8px;">
            <label for="move-${tarea.id}" style="color: #666;">Mover a:</label>
            <select id="move-${tarea.id}" class="btn-move-task" style="padding: 2px 5px; border-radius: 4px; border: 1px solid #ccc; font-size: 11px; cursor: pointer;">
                <option value="pendiente" ${tarea.estado === 'pendiente' ? 'selected' : ''}>⏳ Pendiente</option>
                <option value="proceso" ${tarea.estado === 'proceso' ? 'selected' : ''}>⚙️ En Proceso</option>
                <option value="completado" ${tarea.estado === 'completado' ? 'selected' : ''}>✅ Completado</option>
            </select>
        </div>
    `;

    // 4. EVENTO 1: Escucha para Borrar Tarea (Lo que ya tenías)
    const botonBorrar = tarjeta.querySelector('.btn-delete-task');
    if (botonBorrar) {
        botonBorrar.addEventListener('click', () => {
            funcionLogicaEliminar(tarea.id);
            tarjeta.remove();
            actualizarContadoresTablero();
        });
    }

    // 5. NUEVO EVENTO 2: Escucha para cambiar de columna (Mover)
    const selectorMover = tarjeta.querySelector('.btn-move-task');
    if (selectorMover) {
        selectorMover.addEventListener('change', (evento) => {
            const nuevoEstado = evento.target.value;

            // A) Actualizamos el cerebro (Lógica)
            const tareaActualizada = funcionLogicaMover(tarea.id, nuevoEstado);

            // B) Quitamos la tarjeta de la columna actual
            tarjeta.remove();

            // C) Volvemos a renderizar la tarjeta en su nueva ubicación física
            renderizarTareaEnTablero(tareaActualizada, funcionLogicaEliminar, funcionLogicaMover);
            
            // D) Recalculamos los contadores del tablero
            actualizarContadoresTablero();
        });
    }

    // 6. Añadimos la tarjeta físicamente a su columna
    contenedorTarjetas.appendChild(tarjeta);
    actualizarContadoresTablero();
}