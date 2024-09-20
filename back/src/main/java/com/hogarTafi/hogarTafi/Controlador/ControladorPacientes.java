package com.hogarTafi.hogarTafi.Controlador;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hogarTafi.hogarTafi.Consulta.ActualizarPacienteConsulta;
import com.hogarTafi.hogarTafi.Consulta.OcultarPacienteConsulta;
import com.hogarTafi.hogarTafi.Entidad.Medicamento;
import com.hogarTafi.hogarTafi.Entidad.Paciente;
import com.hogarTafi.hogarTafi.Servicio.impl.ServicioMedicamento;
import com.hogarTafi.hogarTafi.Servicio.impl.ServicioPacientesImpl;

@RestController
@RequestMapping("/pacientes")
public class ControladorPacientes {

    @Autowired
    private ServicioPacientesImpl servicioPacientes;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> todosLosPacientes() {
        List<Paciente> pacientes = servicioPacientes.todosLosPacientes();
        List<Map<String, Object>> pacientesConFotos = pacientes.stream().map(paciente -> {
            Map<String, Object> pacienteMap = new HashMap<>();

        if (paciente.getActivo())
        {
            pacienteMap.put("dni", paciente.getDni());
            pacienteMap.put("nombre", paciente.getNombre());
            pacienteMap.put("apellido", paciente.getApellido());
            pacienteMap.put("obraSocial", paciente.getObraSocial());
            pacienteMap.put("observaciones", paciente.getObservaciones());

            // Convertir fotos de binario a base64
            if (paciente.getFotoFrenteCarnet() != null) {
                pacienteMap.put("fotoFrenteCarnet", convertirABase64(paciente.getFotoFrenteCarnet()));
            }
            if (paciente.getFotoAtrasCarnet() != null) {
                pacienteMap.put("fotoAtrasCarnet", convertirABase64(paciente.getFotoAtrasCarnet()));
            }
            if (paciente.getFotoFrenteDni() != null) {
                pacienteMap.put("fotoFrenteDni", convertirABase64(paciente.getFotoFrenteDni()));
            }
            if (paciente.getFotoAtrasDni() != null) {
                pacienteMap.put("fotoAtrasDni", convertirABase64(paciente.getFotoAtrasDni()));
            }
        }
        else
        {
            return null;
        }

            return pacienteMap;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(pacientesConFotos);
    }

    private String convertirABase64(byte[] bytes) {
        return Base64.getEncoder().encodeToString(bytes);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> guardarPaciente(
            @RequestParam("dni") Integer dni,
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
            // Maneja las imágenes que pueden ser null
            byte[] fotoFrenteCarnetBytes = fotoFrenteCarnet != null ? fotoFrenteCarnet.getBytes() : null;
            byte[] fotoAtrasCarnetBytes = fotoAtrasCarnet != null ? fotoAtrasCarnet.getBytes() : null;
            byte[] fotoFrenteDniBytes = fotoFrenteDni != null ? fotoFrenteDni.getBytes() : null;
            byte[] fotoAtrasDniBytes = fotoAtrasDni != null ? fotoAtrasDni.getBytes() : null;

            boolean pacienteGuardado = servicioPacientes.guardarPaciente(
                    dni, nombre, apellido, obraSocial, true, observaciones,
                    fotoFrenteCarnetBytes, fotoAtrasCarnetBytes,
                    fotoFrenteDniBytes, fotoAtrasDniBytes
            );

            if (pacienteGuardado) {
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
    public ResponseEntity<Map<String, String>> modificarPaciente(
            @PathVariable Integer dni,
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
    
            System.out.println("Nombre: " + nombre);
            System.out.println("Apellido: " + apellido);
            System.out.println("Obra Social: " + obraSocial);
            System.out.println("Observaciones: " + observaciones);

            System.out.println("Foto Frente Carnet: " + fotoFrenteCarnet);
            System.out.println("Foto Atras Carnet: " + fotoAtrasCarnet);
            System.out.println("Foto Frente Dni: " + fotoFrenteDni);
            System.out.println("Foto Atras Dni: " + fotoAtrasDni);
            System.out.println("------------------------");

            // Convertir imágenes de base64 a bytes
            byte[] fotoFrenteCarnetBytes = fotoFrenteCarnet != null ? fotoFrenteCarnet.getBytes() : null;
            byte[] fotoAtrasCarnetBytes = fotoAtrasCarnet != null ? fotoAtrasCarnet.getBytes() : null;
            byte[] fotoFrenteDniBytes = fotoFrenteDni != null ? fotoFrenteDni.getBytes() : null;
            byte[] fotoAtrasDniBytes = fotoAtrasDni != null ? fotoAtrasDni.getBytes() : null;

            // Llamar al servicio para modificar el paciente
            boolean pacienteActualizado = servicioPacientes.modificarPaciente(
                    dni, nombre, apellido, obraSocial, observaciones,
                    fotoFrenteCarnetBytes, fotoAtrasCarnetBytes,
                    fotoFrenteDniBytes, fotoAtrasDniBytes
            );
    
            if (pacienteActualizado) {
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

    @Autowired
    private ServicioMedicamento servicioMedicamento;  // Inyecta el servicio

    @PostMapping("/medicamentos/{dni}")
    public ResponseEntity<Map<String, String>> registrarMedicamento(
        @PathVariable("dni") Integer dni,  // Obtener el DNI desde la URL
        @RequestBody Medicamento medicamentoRequest // Recibir el cuerpo como JSON
    )
    {  
        Map<String, String> response = new HashMap<>();
        try {
            // Usar los datos del cuerpo JSON
            boolean registrarMedicamento = servicioMedicamento.registrarMedicamento(
                    dni,
                    medicamentoRequest.getMedicamento(),
                    medicamentoRequest.getAlmuerzo(),
                    medicamentoRequest.getMerienda(),
                    medicamentoRequest.getCena(),
                    medicamentoRequest.getHorario(),
                    medicamentoRequest.getObservaciones()
            );

            if (registrarMedicamento) {
                response.put("message", "El medicamento se ha registrado.");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "Hubo un error al guardar el medicamento.");
                return ResponseEntity.badRequest().body(response);
            }
        } 
        catch (Exception e) {
            response.put("message", "Error interno al registrar el medicamento.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


}
