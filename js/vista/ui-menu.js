// Añade estas capturas arriba del todo en el archivo, junto a las otras
const sidebar = document.getElementById('sidebar');
const menuToggleBtn = document.getElementById('menu-toggle-btn');
const closeSidebarBtn = document.getElementById('close-sidebar-btn');

export function inicializarMenu(funcionLogicaIniciarSesion) {
    
    // --- NUEVO: Control del menú desplegable móvil ---
    if (menuToggleBtn && closeSidebarBtn) {
        // Al pulsar "..." añadimos la clase 'open' para que deslice desde la izquierda
        menuToggleBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
        });

        // Al pulsar la '×' removemos la clase 'open' para ocultarlo
        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }
}    
    
    // ... todo tu código anterior (modal de login, etc.) se queda exactamente igual abajo

// Elementos de la barra lateral
const authBtn = document.getElementById('auth-trigger-btn');
const userNameSpan = document.querySelector('.user-name');
const userHintSmall = document.querySelector('.user-action-hint');

// Elementos del nuevo Modal de Registro
const authModal = document.getElementById('auth-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalForm = document.getElementById('modal-auth-form');
const modalError = document.getElementById('modal-error');

export function inicializarMenu(funcionLogicaIniciarSesion) {
    
    // 1. Abrir el modal al hacer clic en el avatar
    authBtn.addEventListener('click', () => {
        // Limpiamos errores previos y campos antes de abrir
        modalError.setAttribute('hidden', 'true');
        modalForm.reset();
        
        // .showModal() es un método nativo de la etiqueta <dialog>
        authModal.showModal(); 
    });

    // 2. Cerrar el modal con el botón de la equis (×)
    closeModalBtn.addEventListener('click', () => {
        authModal.close(); // .close() oculta el diálogo nativamente
    });

    // 3. Gestionar el envío del formulario del modal
    modalForm.addEventListener('submit', (evento) => {
        // Evitamos que la página se recargue por defecto al enviar el formulario
        evento.preventDefault(); 

        // Capturamos los valores de los inputs
        const nombreInput = document.getElementById('reg-name').value;
        const emailInput = document.getElementById('reg-email').value;

        try {
            // Enviamos ambos datos a la lógica de negocio
            const usuarioGuardado = funcionLogicaIniciarSesion(nombreInput, emailInput);

            // Si la lógica responde bien, actualizamos la barra lateral
            actualizarInterfazUsuario(usuarioGuardado.nombre);
            
            // Cerramos la ventana flotante automáticamente
            authModal.close();

        } catch (error) {
            // Si la lógica detecta un fallo, mostramos el error en español dentro del modal
            modalError.textContent = `⚠️ ${error.message}`;
            modalError.removeAttribute('hidden');
        }
    });
}

function actualizarInterfazUsuario(nombre) {
    userNameSpan.textContent = nombre;
    userHintSmall.textContent = "¡Sesión iniciada!";
    authBtn.style.cursor = 'default';
}
