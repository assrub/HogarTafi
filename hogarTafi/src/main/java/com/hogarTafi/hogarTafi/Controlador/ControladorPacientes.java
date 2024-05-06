package com.hogarTafi.hogarTafi.Controlador;

import com.hogarTafi.hogarTafi.Servicio.ServicioPacientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hogarTafi.hogarTafi.Entidad.EntidadPaciente;

import java.util.List;

@RestController
@RequestMapping("/pacientes")
public class ControladorPacientes {
    @Autowired
    ServicioPacientes servicioPacientes;

    @GetMapping
    public ResponseEntity<List<EntidadPaciente>> todosLosPacientes() {
        return ResponseEntity.ok(servicioPacientes.todosLosPacientes());
    }

    @PostMapping
    public ResponseEntity<?> guardarPaciente(@RequestParam String nombre,@RequestParam String apellido,
                                             @RequestParam String dni,@RequestParam String obraSocial,
                                             @RequestParam String[] fotoCarnet, @RequestParam String[] fotoDni) {

        if(servicioPacientes.guardarPaciente(nombre, apellido, dni, obraSocial, fotoCarnet, fotoDni)) {
            return ResponseEntity.ok("Paciente registrado.");
        }else{
            return ResponseEntity.badRequest().body("El paciente ya esta registrado");
        }

    }
}
