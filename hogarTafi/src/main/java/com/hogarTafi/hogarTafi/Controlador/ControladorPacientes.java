package com.hogarTafi.hogarTafi.Controlador;

import com.hogarTafi.hogarTafi.Servicio.impl.ServicioPacientesEliminados;
import com.hogarTafi.hogarTafi.Servicio.impl.ServicioPacientes;
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

    @Autowired
    ServicioPacientesEliminados servicioPacientesEliminados;

    @GetMapping
    public ResponseEntity<List<EntidadPaciente>> todosLosPacientes() {
        return ResponseEntity.ok(servicioPacientes.todosLosPacientes());
    }

    @PostMapping
    public ResponseEntity<?> guardarPaciente(@RequestParam String nombre,@RequestParam String apellido,
                                             @RequestParam String dni,@RequestParam String obraSocial,
                                             @RequestParam byte[] fotoFrenteCarnet, @RequestParam byte[] fotoAtrasCarnet,
                                             @RequestParam byte[] fotoFrenteDni, @RequestParam byte[] fotoAtrasDni) {

        if(servicioPacientes.guardarPaciente(nombre, apellido, dni, obraSocial, fotoFrenteCarnet, fotoAtrasCarnet, fotoFrenteDni, fotoAtrasDni)) {
            return ResponseEntity.ok("Paciente registrado.");
        }else{
            return ResponseEntity.badRequest().body("El paciente ya esta registrado");
        }

    }

    @GetMapping("/{dni}")
    public ResponseEntity<?> buscarPaciente(@PathVariable String dni){

        EntidadPaciente paciente = servicioPacientes.buscarPaciente(dni);
        if (paciente == null){
            return ResponseEntity.badRequest().body("Paciente no encontrado.");
        }
        else
        {
            return ResponseEntity.ok(paciente);
        }
    }

    @PostMapping("/eliminar/{dni}")
    public ResponseEntity<?> eliminarPaciente(@PathVariable String dni){
        try {
            EntidadPaciente paciente = servicioPacientes.buscarPaciente(dni);


            servicioPacientesEliminados.guardarPaciente(paciente.getNombre(), paciente.getApellido(), paciente.getDni(),
                    paciente.getObraSocial(), paciente.getFotoFrenteCarnet(), paciente.getFotoAtrasCarnet(),
                    paciente.getFotoFrenteDni(), paciente.getFotoAtrasDni());
            servicioPacientes.eliminarPaciente(paciente.getDni());
                return ResponseEntity.ok("Paciente eliminado.");

        }catch (Error e){
            return ResponseEntity.badRequest().body("No se puedo borrar al paciente.");
        }
    }
}
