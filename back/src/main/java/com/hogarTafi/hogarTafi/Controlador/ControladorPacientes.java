package com.hogarTafi.hogarTafi.Controlador;

import com.hogarTafi.hogarTafi.Consulta.ActualizarPacienteConsulta;
import com.hogarTafi.hogarTafi.Consulta.GuardarPacienteConsulta;
import com.hogarTafi.hogarTafi.Consulta.OcultarPacienteConsulta;
import com.hogarTafi.hogarTafi.Servicio.impl.ServicioPacientesImpl;
import com.hogarTafi.hogarTafi.Entidad.Paciente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/pacientes")
public class ControladorPacientes {

    @Autowired
    private ServicioPacientesImpl servicioPacientes;

    @GetMapping
    public ResponseEntity<List<Paciente>> todosLosPacientes() {
        return ResponseEntity.ok(servicioPacientes.todosLosPacientes());
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> guardarPaciente(@RequestBody GuardarPacienteConsulta consulta) {
        Map<String, String> response = new HashMap<>();
        if (servicioPacientes.guardarPaciente(consulta.getDni(), consulta.getNombre(), consulta.getApellido(),
                consulta.getObraSocial(), true, consulta.getObservaciones(),
                consulta.getFotoFrenteCarnet(), consulta.getFotoAtrasCarnet(),
                consulta.getFotoFrenteDni(), consulta.getFotoAtrasDni())) {
            response.put("message", "Paciente registrado.");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "El paciente ya está registrado.");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PatchMapping("/modificar/{dni}")
    public ResponseEntity<Map<String, String>> modificarPaciente(@PathVariable Integer dni, @RequestBody ActualizarPacienteConsulta consulta) {
        consulta.setDni(dni);
        Map<String, String> response = new HashMap<>();
        
        try {
            if (servicioPacientes.modificarPaciente(consulta)) {
                response.put("message", "Paciente actualizado correctamente.");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "No se pudo actualizar el paciente.");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (NoSuchElementException e) {
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (IllegalArgumentException e) {
            response.put("message", "Los datos proporcionados son inválidos.");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{dni}")
    public ResponseEntity<?> buscarPaciente(@PathVariable Integer dni) {
        Paciente paciente = servicioPacientes.buscarPaciente(dni);
        if (paciente == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Paciente no encontrado.");
            return ResponseEntity.badRequest().body(response);
        } else {
            return ResponseEntity.ok(paciente);
        }
    }

    @PatchMapping("/desactivar/{dni}")
    public ResponseEntity<Map<String, String>> desactivarPaciente(@PathVariable Integer dni) {
        OcultarPacienteConsulta consulta = new OcultarPacienteConsulta();
        consulta.setDni(dni);
        Map<String, String> response = new HashMap<>();
        
        try {
            servicioPacientes.desactivarPaciente(consulta);
            response.put("message", "Paciente desactivado.");
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (IllegalArgumentException e) {
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("message", "Error al desactivar el paciente.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
