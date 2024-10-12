package com.hogarTafi.hogarTafi.token.servicio;

public interface TokenServicio {

    String generarToken(Integer usuarioId);  // Para generar un token asociado a un usuario

    boolean actualizarContrasena(String tokenStr, String nuevaContrasena, String email);  // Para cambiar la contraseña usando el token
}
