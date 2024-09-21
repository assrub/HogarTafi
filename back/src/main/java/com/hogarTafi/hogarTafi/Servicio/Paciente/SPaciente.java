package com.hogarTafi.hogarTafi.Servicio.Paciente;

import java.util.Base64;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hogarTafi.hogarTafi.Entidad.Paciente.EPaciente;
import com.hogarTafi.hogarTafi.Repositorio.Paciente.RPaciente;

@Service
public class SPaciente implements SIPacientes {

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
    public EPaciente buscarPaciente(EPaciente PacienteDtos) {
        return repositorioPacientes.findByDni(PacienteDtos.getDni()).orElseThrow(() -> new NoSuchElementException("Paciente con el DNI " + PacienteDtos.getDni() + " no se encontró."));
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
    public boolean desactivarPaciente(EPaciente PacienteDtos) {
        
        EPaciente existePaciente = buscarPaciente(PacienteDtos);

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

}
