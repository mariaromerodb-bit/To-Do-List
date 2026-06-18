// ==========================================================================
// 1. CAPTURA DE ELEMENTOS DEL DOM
// ==========================================================================

// Elementos para el Menú Móvil Desplegable
const sidebar = document.getElementById('sidebar');
const menuToggleBtn = document.getElementById('menu-toggle-btn');
const closeSidebarBtn = document.getElementById('close-sidebar-btn');

// Elementos del Perfil de Usuario en la Barra Lateral
const authBtn = document.getElementById('auth-trigger-btn');
const userNameSpan = document.querySelector('.user-name');
const userHintSmall = document.querySelector('.user-action-hint');

// Elementos de la Ventana Modal de Registro
const authModal = document.getElementById('auth-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalForm = document.getElementById('modal-auth-form');
const modalError = document.getElementById('modal-error');

// ==========================================================================
// 2. FUNCIÓN DE INICIALIZACIÓN ÚNICA
// ==========================================================================
export function inicializarMenu(funcionLogicaIniciarSesion) {
    
    // --- LÓGICA DEL MENÚ DESPLEGABLE MÓVIL ---
    if (menuToggleBtn && closeSidebarBtn && sidebar) {
        // Al pulsar "..." añadimos la clase 'open' para deslizar la barra lateral
        menuToggleBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
        });

        // Al pulsar la '×' removemos la clase 'open' para ocultarla de nuevo
        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }

    // --- LÓGICA DE LA VENTANA MODAL DE REGISTRO ---
    if (authBtn && authModal && closeModalBtn && modalForm) {
        
        // Abrir el modal al hacer clic en el perfil del usuario
        authBtn.addEventListener('click', () => {
            modalError.setAttribute('hidden', 'true');
            modalForm.reset();
            authModal.showModal(); // Método nativo de <dialog>
        });

        // Cerrar el modal con el botón '×' interno
        closeModalBtn.addEventListener('click', () => {
            authModal.close(); // Método nativo de <dialog>
        });

        // Gestionar el envío seguro de los datos de registro
        modalForm.addEventListener('submit', (evento) => {
            evento.preventDefault(); 

            const nombreInput = document.getElementById('reg-name').value;
            const emailInput = document.getElementById('reg-email').value;

            try {
                // Ejecutamos la validación en la capa lógica
                const usuarioGuardado = funcionLogicaIniciarSesion(nombreInput, emailInput);

                // Si todo es correcto, modificamos la interfaz
                actualizarInterfazUsuario(usuarioGuardado.nombre);
                
                // Cerramos el modal y también cerramos la barra lateral si estábamos en móvil
                authModal.close();
                sidebar.classList.remove('open');

            } catch (error) {
                // Imprimimos el error controlado en español en el modal
                modalError.textContent = `⚠️ ${error.message}`;
                modalError.removeAttribute('hidden');
            }
        });
    }
}

// ==========================================================================
// 3. FUNCIONES AUXILIARES DE LA VISTA
// ==========================================================================
function actualizarInterfazUsuario(nombre) {
    if (userNameSpan && userHintSmall && authBtn) {
        userNameSpan.textContent = nombre;
        userHintSmall.textContent = "¡Sesión iniciada!";
        authBtn.style.cursor = 'default';
    }
}