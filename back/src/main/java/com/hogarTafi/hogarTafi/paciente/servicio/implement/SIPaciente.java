package com.hogarTafi.hogarTafi.paciente.servicio.implement;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hogarTafi.hogarTafi.paciente.entidad.EPaciente;
import com.hogarTafi.hogarTafi.paciente.repositorio.RPaciente;
import com.hogarTafi.hogarTafi.paciente.servicio.SPaciente;

@Service
public class SIPaciente implements SPaciente {

    @Autowired
    private RPaciente repositorioPacientes;
    
    @Override
    public List<EPaciente> todosLosPacientes() {
        return repositorioPacientes.findAll();
    }

    @Override
    public boolean guardarPaciente(EPaciente PacienteDtos) {
       
        // Verificar si el paciente ya existe
        if (repositorioPacientes.findByDni(PacienteDtos.getDni()).isPresent()) {
            return false; // El paciente ya está registrado
        }
        // Guardar el paciente en la base de datos
        repositorioPacientes.save(PacienteDtos);
        return true; // Paciente registrado con éxito
    }

    @Override
    public EPaciente buscarPaciente(Integer dni) {
        return repositorioPacientes.findByDni(dni).orElseThrow(() -> new NoSuchElementException("Paciente con el DNI " + dni + " no se encontró."));
    }

    public boolean actualizarPaciente(EPaciente PacienteDtos) 
    {
        // Obtener el paciente existente
        EPaciente paciente = repositorioPacientes.findByDni(PacienteDtos.getDni()).orElseThrow(() -> new NoSuchElementException("Paciente no encontrado."));
       
        // Actualizar solo los campos proporcionados
        if (PacienteDtos.getNombre() != null) paciente.setNombre(PacienteDtos.getNombre());
        if (PacienteDtos.getApellido() != null) paciente.setApellido(PacienteDtos.getApellido());
        if (PacienteDtos.getObraSocial() != null) paciente.setObraSocial(PacienteDtos.getObraSocial());
        if (PacienteDtos.getObservaciones() != null) paciente.setObservaciones(PacienteDtos.getObservaciones());

        if (PacienteDtos.getFotoFrenteCarnet() != null) paciente.setFotoFrenteCarnet(PacienteDtos.getFotoFrenteCarnet());
        if (PacienteDtos.getFotoAtrasCarnet() != null) paciente.setFotoAtrasCarnet(PacienteDtos.getFotoAtrasCarnet());
        if (PacienteDtos.getFotoFrenteDni() != null) paciente.setFotoFrenteDni(PacienteDtos.getFotoFrenteDni());
        if (PacienteDtos.getFotoAtrasDni() != null) paciente.setFotoAtrasDni(PacienteDtos.getFotoAtrasDni());

        // Guardar los cambios
        repositorioPacientes.save(paciente);

        // Devolver verdadero si el paciente fue modificado correctamente
        return true;
    }

    @Override
    public boolean desactivarPaciente(Integer dni) {
        
        EPaciente existePaciente = buscarPaciente(dni);

        // Verificar si el paciente ya está oculto
        if (!existePaciente.getActivo()) {
            throw new IllegalArgumentException("El paciente ya está oculto.");
        }

        // Si el paciente está activo, se desactiva
        existePaciente.setActivo(false);
        repositorioPacientes.save(existePaciente);
        return true;
    }

    public String convertirABase64(byte[] bytes) {
        return Base64.getEncoder().encodeToString(bytes);
    }

    @Override
    public List<Map<String, Object>> obtenerPacientesConFotos() {
        List<EPaciente> pacientes = repositorioPacientes.findAll();
        
        return pacientes.stream()
            .filter(EPaciente::getActivo) // Filtra solo los pacientes activos
            .map(paciente -> {
                Map<String, Object> pacienteMap = new HashMap<>();
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
                if (paciente.getFotoAtrasDni() != null) {
                    pacienteMap.put("fotoAtrasDni", convertirABase64(paciente.getFotoAtrasDni()));
                }
                if (paciente.getFotoFrenteDni() != null) {
                    pacienteMap.put("fotoFrenteDni", convertirABase64(paciente.getFotoFrenteDni()));
                }
    
                return pacienteMap;
            })
            .collect(Collectors.toList());
    }


    @Override
    public List<Map<String, Object>> pacientesInactivos() {
        List<EPaciente> pacientes = repositorioPacientes.findAll();

        return pacientes.stream()
                .filter(paciente -> !paciente.getActivo()) // Filtra solo los pacientes activos
                .map(paciente -> {
                    Map<String, Object> pacienteMap = new HashMap<>();
                    pacienteMap.put("dni", paciente.getDni());
                    pacienteMap.put("nombre", paciente.getNombre());
                    pacienteMap.put("apellido", paciente.getApellido());
                    pacienteMap.put("obraSocial", paciente.getObraSocial());
                    pacienteMap.put("observaciones", paciente.getObservaciones());



                    return pacienteMap;
                })
                .collect(Collectors.toList());
    }
    
}
