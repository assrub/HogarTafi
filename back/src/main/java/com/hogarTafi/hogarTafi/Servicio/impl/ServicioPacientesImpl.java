package com.hogarTafi.hogarTafi.Servicio.impl;

import java.util.Base64;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hogarTafi.hogarTafi.Consulta.ActualizarPacienteConsulta;
import com.hogarTafi.hogarTafi.Consulta.OcultarPacienteConsulta;
import com.hogarTafi.hogarTafi.Entidad.Paciente;
import com.hogarTafi.hogarTafi.Repositorio.RepositorioPaciente;
import com.hogarTafi.hogarTafi.Servicio.ServicioPacientes;

@Service
public class ServicioPacientesImpl implements ServicioPacientes {

    @Autowired
    private RepositorioPaciente repositorioPacientes;


    @Override
    public List<Paciente> todosLosPacientes() {
        return repositorioPacientes.findAll();
    }

    @Override
    public boolean guardarPaciente(Integer dni,String nombre, String apellido,  String obraSocial, Boolean activo, String observaciones, byte[] fotoFrenteCarnet,
                                   byte[] fotoAtrasCarnet, byte[] fotoFrenteDni, byte[] fotoAtrasDni) {
       
        // Verificar si el paciente ya existe
        if (repositorioPacientes.findByDni(dni).isPresent()) {
            return false; // El paciente ya está registrado
        }

        // Crear una nueva instancia de Paciente y establecer sus propiedades
        Paciente paciente = new Paciente();
        paciente.setDni(dni);
        paciente.setNombre(nombre);
        paciente.setApellido(apellido);
        paciente.setObraSocial(obraSocial);
        paciente.setActivo(activo);
        paciente.setObservaciones(observaciones);
        paciente.setFotoFrenteCarnet(fotoFrenteCarnet);
        paciente.setFotoAtrasCarnet(fotoAtrasCarnet);
        paciente.setFotoFrenteDni(fotoFrenteDni);
        paciente.setFotoAtrasDni(fotoAtrasDni);

        // Guardar el paciente en la base de datos
        repositorioPacientes.save(paciente);
        return true; // Paciente registrado con éxito
    }

    private String convertirABase64(byte[] bytes) {
        return Base64.getEncoder().encodeToString(bytes);
    }

    @Override
    public Paciente buscarPaciente(Integer dni) {
        return repositorioPacientes.findByDni(dni).orElseThrow(() -> new NoSuchElementException("Paciente con el DNI " + dni + " no se encontró."));
    }

    public boolean modificarPaciente(
        Integer dni,
        String nombre,
        String apellido,
        String obraSocial,
        Boolean activo,
        String observaciones,
        byte[] fotoFrenteCarnet,
        byte[] fotoAtrasCarnet,
        byte[] fotoFrenteDni,
        byte[] fotoAtrasDni
) {
    // Obtener el paciente existente
    Paciente paciente = repositorioPacientes.findByDni(dni)
            .orElseThrow(() -> new NoSuchElementException("Paciente no encontrado."));



        byte[] fotoFrenteCarnetBytes = fotoFrenteCarnet != null ? fotoFrenteCarnet.getBytes() : null;
        byte[] fotoAtrasCarnetBytes = fotoAtrasCarnet != null ? fotoAtrasCarnet.getBytes() : null;
        byte[] fotoFrenteDniBytes = fotoFrenteDni != null ? fotoFrenteDni.getBytes() : null;
        byte[] fotoAtrasDniBytes = fotoAtrasDni != null ? fotoAtrasDni.getBytes() : null;

    // Actualizar solo los campos proporcionados
    if (nombre != null) paciente.setNombre(nombre);
    if (apellido != null) paciente.setApellido(apellido);
    if (obraSocial != null) paciente.setObraSocial(obraSocial);
    if (activo != null) paciente.setActivo(activo);
    if (observaciones != null) paciente.setObservaciones(observaciones);

    if (fotoFrenteCarnetBytes != null) paciente.setFotoFrenteCarnet(fotoFrenteCarnetBytes);
    if (fotoAtrasCarnetBytes != null) paciente.setFotoAtrasCarnet(fotoAtrasCarnetBytes);
    if (fotoFrenteDniBytes != null) paciente.setFotoFrenteDni(fotoFrenteDniBytes);
    if (fotoAtrasDniBytes != null) paciente.setFotoAtrasDni(fotoAtrasDniBytes);

    // Guardar los cambios
    repositorioPacientes.save(paciente);

    // Devolver verdadero si el paciente fue modificado correctamente
    return true;
}

    @Override
    public boolean desactivarPaciente(OcultarPacienteConsulta consulta) {
       Paciente existePaciente = buscarPaciente(consulta.getDni());


        // Verificar si el paciente ya está oculto
        if (!existePaciente.getActivo()) {
            throw new IllegalArgumentException("El paciente ya está oculto.");
        }

        // Si el paciente está activo, se desactiva
        existePaciente.setActivo(false);
        repositorioPacientes.save(existePaciente);
        return true;
    }

}
