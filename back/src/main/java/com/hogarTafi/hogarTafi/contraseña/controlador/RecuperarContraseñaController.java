package com.hogarTafi.hogarTafi.contraseña.controlador;

import com.hogarTafi.hogarTafi.contraseña.servicio.RecuperarContraseñaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/send-password")
public class RecuperarContraseñaController {

    @Autowired
    private RecuperarContraseñaServicio recuperarContraseñaServicio;

    @PostMapping
    public ResponseEntity<String> recuperarContraseña(@RequestParam String email) {
        System.out.println("El mail para recuperar es: " + email);
        boolean enviado = recuperarContraseñaServicio.recuperarContraseña(email);
        if (enviado) {
            return ResponseEntity.ok("Se ha enviado un token de recuperación al correo proporcionado.");
        } else {
            return ResponseEntity.badRequest().body("El correo no está registrado.");
        }
    }
}
