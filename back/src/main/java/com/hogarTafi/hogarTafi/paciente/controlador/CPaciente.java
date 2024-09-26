package com.hogarTafi.hogarTafi.paciente.controlador;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hogarTafi.hogarTafi.paciente.entidad.EPaciente;
import com.hogarTafi.hogarTafi.paciente.servicio.SPaciente;

@RestController
@RequestMapping("/pacientes")
public class CPaciente {

    @Autowired
    private SPaciente servicioPacientes;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> todosLosPacientes() {
        List<Map<String, Object>> pacientesConFotos = servicioPacientes.obtenerPacientesConFotos();
        return ResponseEntity.ok(pacientesConFotos);
    }
    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> guardarPaciente(@RequestParam("dni") Integer dni,
                                                               @RequestParam("nombre") String nombre,
                                                               @RequestParam("apellido") String apellido,
                                                               @RequestParam("obraSocial") String obraSocial,
                                                               @RequestParam("observaciones") String observaciones,
                                                               @RequestParam(value = "fotoFrenteCarnet", required = false) MultipartFile fotoFrenteCarnet,
                                                               @RequestParam(value = "fotoAtrasCarnet", required = false) MultipartFile fotoAtrasCarnet,
                                                               @RequestParam(value = "fotoFrenteDni", required = false) MultipartFile fotoFrenteDni,
                                                               @RequestParam(value = "fotoAtrasDni", required = false) MultipartFile fotoAtrasDni
    ) {
        Map<String, String> response = new HashMap<>();
        try {
            
            // Crear instancia de EPaciente y asignar valores
            EPaciente paciente = new EPaciente();
            paciente.setDni(dni);
            paciente.setNombre(nombre);
            paciente.setApellido(apellido);
            paciente.setObraSocial(obraSocial);
            paciente.setActivo(true);
            paciente.setObservaciones(observaciones);
        
            // Convertir archivos MultipartFile a byte[] si no están vacíos
            if (fotoFrenteCarnet != null && !fotoFrenteCarnet.isEmpty()) {
                paciente.setFotoFrenteCarnet(fotoFrenteCarnet.getBytes());
            }
            if (fotoAtrasCarnet != null && !fotoAtrasCarnet.isEmpty()) {
                paciente.setFotoAtrasCarnet(fotoAtrasCarnet.getBytes());
            }
            if (fotoFrenteDni != null && !fotoFrenteDni.isEmpty()) {
                paciente.setFotoFrenteDni(fotoFrenteDni.getBytes());
            }
            if (fotoAtrasDni != null && !fotoAtrasDni.isEmpty()) {
                paciente.setFotoAtrasDni(fotoAtrasDni.getBytes());
            } 

            if (servicioPacientes.guardarPaciente(paciente)) {
                response.put("message", "Paciente registrado.");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "El paciente ya está registrado.");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (IOException e) {
            response.put("message", "Error al procesar las imágenes.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PatchMapping("/modificar/{dni}")
    public ResponseEntity<Map<String, String>> modificarPaciente(@PathVariable Integer dni,
                                                                 @RequestParam(value = "nombre", required = false) String nombre,
                                                                 @RequestParam(value = "apellido", required = false) String apellido,
                                                                 @RequestParam(value = "obraSocial", required = false) String obraSocial,
                                                                 @RequestParam(value = "observaciones", required = false) String observaciones,
                                                                 @RequestParam(value = "fotoFrenteCarnet", required = false) MultipartFile fotoFrenteCarnet,
                                                                 @RequestParam(value = "fotoAtrasCarnet", required = false) MultipartFile fotoAtrasCarnet,
                                                                 @RequestParam(value = "fotoFrenteDni", required = false) MultipartFile fotoFrenteDni,
                                                                 @RequestParam(value = "fotoAtrasDni", required = false) MultipartFile fotoAtrasDni
    ) {
        Map<String, String> response = new HashMap<>();
        try {
            // Convertir imágenes de base64 a bytes
            byte[] fotoFrenteCarnetBytes = fotoFrenteCarnet != null ? fotoFrenteCarnet.getBytes() : null;
            byte[] fotoAtrasCarnetBytes = fotoAtrasCarnet != null ? fotoAtrasCarnet.getBytes() : null;
            byte[] fotoFrenteDniBytes = fotoFrenteDni != null ? fotoFrenteDni.getBytes() : null;
            byte[] fotoAtrasDniBytes = fotoAtrasDni != null ? fotoAtrasDni.getBytes() : null;

            EPaciente paciente = new EPaciente();

            paciente.setDni(dni);
            paciente.setNombre(nombre);
            paciente.setApellido(apellido);
            paciente.setObraSocial(obraSocial);
            paciente.setObservaciones(observaciones);
            paciente.setFotoFrenteCarnet(fotoFrenteCarnetBytes);
            paciente.setFotoAtrasCarnet(fotoAtrasCarnetBytes);
            paciente.setFotoFrenteDni(fotoFrenteDniBytes);
            paciente.setFotoAtrasDni(fotoAtrasDniBytes);

            boolean actualizar = servicioPacientes.actualizarPaciente(paciente);
    
            if (actualizar) {
                response.put("message", "Paciente actualizado correctamente.");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "No se pudo actualizar el paciente.");
                return ResponseEntity.badRequest().body(response);
            }

        } catch (IllegalArgumentException e) {
            response.put("message", "Los datos proporcionados son inválidos.");
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("message", "Error al procesar la solicitud.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    

    @GetMapping("/{dni}")
    public ResponseEntity<?> buscarPaciente(@PathVariable Integer dni) {
        EPaciente paciente = servicioPacientes.buscarPaciente(dni);
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
        Map<String, String> response = new HashMap<>();
        try {
            servicioPacientes.desactivarPaciente(dni);
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
