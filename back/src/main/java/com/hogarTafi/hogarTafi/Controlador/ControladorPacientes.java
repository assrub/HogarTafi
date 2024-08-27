package com.hogarTafi.hogarTafi.Controlador;

import com.hogarTafi.hogarTafi.Consulta.ActualizarPacienteConsulta;
import com.hogarTafi.hogarTafi.Consulta.GuardarPacienteConsulta;
import com.hogarTafi.hogarTafi.Consulta.OcultarPacienteConsulta;
import com.hogarTafi.hogarTafi.Servicio.impl.ServicioPacientesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hogarTafi.hogarTafi.Entidad.Paciente;


import java.util.List;
import java.util.NoSuchElementException;


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
    public ResponseEntity<?> guardarPaciente(@RequestBody GuardarPacienteConsulta consulta) {
        if(servicioPacientes.guardarPaciente(consulta.getDni(), consulta.getNombre(), consulta.getApellido(),
                consulta.getObraSocial(), true, consulta.getObservaciones(),
                consulta.getFotoFrenteCarnet(), consulta.getFotoAtrasCarnet(),
                consulta.getFotoFrenteDni(), consulta.getFotoAtrasDni())) {
            return ResponseEntity.ok("Paciente registrado.");
        } else {
            return ResponseEntity.badRequest().body("El paciente ya está registrado.");
        }
    }

    @PatchMapping("/modificar/{dni}")
    public ResponseEntity<?> modificarPaciente(@PathVariable Integer dni, @RequestBody ActualizarPacienteConsulta consulta) {
        consulta.setDni(dni);

        try {
            if (servicioPacientes.modificarPaciente(consulta)) {
                return ResponseEntity.ok("Paciente actualizado correctamente.");
            } else {
                return ResponseEntity.badRequest().body("No se pudo actualizar el paciente.");
            }
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Los datos proporcionados son inválidos.");
        }
    }

    @GetMapping("/{dni}")
    public ResponseEntity<?> buscarPaciente(@PathVariable Integer dni) {
        Paciente paciente = servicioPacientes.buscarPaciente(dni);
        if (paciente == null) {
            return ResponseEntity.badRequest().body("Paciente no encontrado.");
        } else {
            return ResponseEntity.ok(paciente);
        }
    }

    @PatchMapping("/desactivar/{dni}")
    public ResponseEntity<?> desactivarPaciente(@PathVariable Integer dni) {
        OcultarPacienteConsulta consulta = new OcultarPacienteConsulta();
        consulta.setDni(dni);

        try {
            servicioPacientes.desactivarPaciente(consulta);
            return ResponseEntity.ok("Paciente desactivado.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al desactivar el paciente.");
        }
    }
}
