package com.hogarTafi.hogarTafi.contraseña.servicio.implement;

import com.hogarTafi.hogarTafi.contraseña.repositorio.RecuperarContraseñaRepositorio;
import com.hogarTafi.hogarTafi.contraseña.servicio.RecuperarContraseñaServicio;
import com.hogarTafi.hogarTafi.usuario.entidad.EUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class RecuperarContraseñaServicioImpl implements RecuperarContraseñaServicio {

    @Autowired
    private RecuperarContraseñaRepositorio recuperarContraseñaRepositorio;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public boolean recuperarContraseña(String email) {
        EUsuario usuario = recuperarContraseñaRepositorio.findByEmail(email);

        if (usuario != null) {
            // Enviar la contraseña por correo
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(usuario.getEmail());
            message.setSubject("Recuperación de Contraseña");
            message.setText("Hola " + usuario.getNombre() + ", tu contraseña es: " + usuario.getPassword());
            mailSender.send(message);
            return true;
        } else {
            return false; // El correo no está registrado
        }
    }
}
