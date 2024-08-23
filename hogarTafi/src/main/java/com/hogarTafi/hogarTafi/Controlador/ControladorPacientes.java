package com.hogarTafi.hogarTafi.Controlador;

import com.hogarTafi.hogarTafi.Servicio.impl.ServicioPacientesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hogarTafi.hogarTafi.Entidad.Paciente;

import java.util.List;

@RestController
@RequestMapping("/pacientes")
public class ControladorPacientes {
    @Autowired
    ServicioPacientesImpl servicioPacientes;

    @GetMapping
    public ResponseEntity<List<Paciente>> todosLosPacientes() {
        return ResponseEntity.ok(servicioPacientes.todosLosPacientes());
    }

    @PostMapping
    public ResponseEntity<?> guardarPaciente(@RequestParam String nombre,
                                             @RequestParam String apellido,
                                             @RequestParam Integer dni,
                                             @RequestParam String obraSocial,
                                             @RequestParam Boolean activo,
                                             @RequestParam String observaciones,
                                             @RequestParam byte[] fotoFrenteCarnet,
                                             @RequestParam byte[] fotoAtrasCarnet,
                                             @RequestParam byte[] fotoFrenteDni,
                                             @RequestParam byte[] fotoAtrasDni) {

        if(servicioPacientes.guardarPaciente(nombre, apellido, dni, obraSocial, activo,observaciones, fotoFrenteCarnet, fotoAtrasCarnet, fotoFrenteDni, fotoAtrasDni)) {
            return ResponseEntity.ok("Paciente registrado.");
        }else{
            return ResponseEntity.badRequest().body("El paciente ya esta registrado");
        }

    }

    @GetMapping("/{dni}")
    public ResponseEntity<?> buscarPaciente(@PathVariable Integer dni){

        Paciente paciente = servicioPacientes.buscarPaciente(dni);
        if (paciente == null){
            return ResponseEntity.badRequest().body("Paciente no encontrado.");
        }
        else
        {
            return ResponseEntity.ok(paciente);
        }
    }


}
