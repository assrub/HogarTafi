package com.hogarTafi.hogarTafi.token.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hogarTafi.hogarTafi.token.servicio.TokenServicio;

@RestController
@RequestMapping("/api/token")
public class TokenController {

    @Autowired
    private TokenServicio tokenServicio;

    @PostMapping
    public ResponseEntity<?> cambiarContrasena(@RequestParam String token, 
                                                @RequestParam String nuevaContrasena,
                                                @RequestParam String email) { // Se agrega el parámetro email
        try {
            boolean esExitoso = tokenServicio.actualizarContrasena(token, nuevaContrasena, email); // Se pasa el correo al servicio
            if (esExitoso) {
                return ResponseEntity.ok("Contraseña actualizada correctamente.");
            } else {
                return ResponseEntity.status(400).body("Token inválido, expirado o no asociado al correo.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al actualizar la contraseña.");
        }
    }
}
