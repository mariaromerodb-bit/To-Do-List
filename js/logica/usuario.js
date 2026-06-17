let usuarioActual = null; 

/**
 * Registra un usuario verificando nombre y correo electrónico.
 * @param {string} nombre 
 * @param {string} email 
 */
export function iniciarSesion(nombre, email) {
    // Validación de nombre vacío
    if (!nombre || nombre.trim() === "") {
        throw new Error("El nombre de usuario no puede estar vacío.");
    }

    // Validación de correo vacío
    if (!email || email.trim() === "") {
        throw new Error("El correo electrónico no puede estar vacío.");
    }

    // Validación básica de formato de email usando una expresión regular
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expresionEmail.test(email.trim())) {
        throw new Error("El formato del correo electrónico no es válido.");
    }

    // Si todo es correcto, guardamos el estado con las nuevas propiedades
    usuarioActual = {
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        fechaRegistro: new Date().toLocaleDateString('es-ES')
    };

    console.log("Lógica: Usuario registrado con éxito:", usuarioActual);
    return usuarioActual;
}

export function obtenerUsuarioActual() {
    return usuarioActual;
}