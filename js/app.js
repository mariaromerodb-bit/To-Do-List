// 1. Importamos lo que necesitamos de la Vista y de la Lógica
import { inicializarMenu } from './vista/ui-menu.js';
import { iniciarSesion } from './logica/usuario.js';

console.log("🚀 Arrancando la aplicación...");

// 2. Inicializamos el menú y le "inyectamos" la función de iniciar sesión.
// Nota que pasamos 'iniciarSesion' SIN paréntesis (), porque no la estamos ejecutando ahora,
// se la estamos regalando a la vista para que la ejecute cuando alguien haga clic.
inicializarMenu(iniciarSesion);