package com.hogarTafi.hogarTafi.token.servicio.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hogarTafi.hogarTafi.token.entidad.EToken;
import com.hogarTafi.hogarTafi.token.repositorio.RToken;
import com.hogarTafi.hogarTafi.token.servicio.TokenServicio;
import com.hogarTafi.hogarTafi.usuario.entidad.EUsuario;
import com.hogarTafi.hogarTafi.usuario.repositorio.RUsuario;

import org.mindrot.jbcrypt.BCrypt;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class TokenServicioImpl implements TokenServicio {

    @Autowired
    private RToken rToken;

    @Autowired
    private RUsuario rUsuario;

    private static final long TOKEN_VALIDITY_MINUTES = 10;  // Validez del token (10 minutos)

    @Override
    public String generarToken(Integer usuarioId) {
        EUsuario usuario = rUsuario.findById(usuarioId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        EToken token = new EToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUsuario(usuario);
        token.setFechaExpiracion(LocalDateTime.now().plusMinutes(TOKEN_VALIDITY_MINUTES));

        rToken.save(token);

        return token.getToken();
    }

    @Override
    public boolean actualizarContrasena(String tokenStr, String nuevaContrasena, String email) {
        Optional<EToken> optionalToken = rToken.findByToken(tokenStr);

        if (optionalToken.isPresent()) {
            EToken token = optionalToken.get();
            EUsuario usuario = token.getUsuario();

            // Verificar si el token ha expirado
            if (token.getFechaExpiracion().isBefore(LocalDateTime.now())) {
                return false;  // Token expirado
            }

            // Verificar si el token está asociado al correo electrónico proporcionado
            if (!usuario.getEmail().equals(email)) {
                return false;  // El token no corresponde al correo electrónico
            }

            // Hashear la nueva contraseña
            String hashedPassword = BCrypt.hashpw(nuevaContrasena, BCrypt.gensalt());
            usuario.setPassword(hashedPassword);  // Cambiar la contraseña
            rUsuario.save(usuario);  // Guardar el usuario con la nueva contraseña

            rToken.deleteByToken(tokenStr);  // Eliminar el token después de usarlo

            return true;
        }

        return false;  // Token inválido
    }
}
