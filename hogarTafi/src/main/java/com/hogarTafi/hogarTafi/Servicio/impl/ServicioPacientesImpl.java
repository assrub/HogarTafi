package com.hogarTafi.hogarTafi.Servicio.impl;

import com.hogarTafi.hogarTafi.Consulta.ActualizarPacienteConsulta;
import com.hogarTafi.hogarTafi.Consulta.OcultarPacienteConsulta;
import com.hogarTafi.hogarTafi.Entidad.Paciente;
import com.hogarTafi.hogarTafi.Repositorio.RepositorioPaciente;
import com.hogarTafi.hogarTafi.Servicio.ServicioPacientes;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ServicioPacientesImpl implements ServicioPacientes {

    @Autowired
    private RepositorioPaciente repositorioPacientes;


    @Override
    public List<Paciente> todosLosPacientes() {
        return repositorioPacientes.findAll();
    }

    @Override
    public boolean guardarPaciente(String nombre, String apellido, Integer dni, String obraSocial, Boolean activo, String observaciones, byte[] fotoFrenteCarnet,
                                   byte[] fotoAtrasCarnet, byte[] fotoFrenteDni, byte[] fotoAtrasDni) {
        // Establecer activo en true al crear un nuevo paciente
        Paciente paciente = new Paciente(nombre, apellido, dni, obraSocial, true, observaciones, fotoFrenteCarnet, fotoAtrasCarnet, fotoFrenteDni, fotoAtrasDni);

        // Verificar si el paciente ya existe
        if (repositorioPacientes.findByDni(paciente.getDni()).isPresent()) {
            return false; // El paciente ya está registrado
        } else {
            repositorioPacientes.save(paciente);
            return true; // Paciente guardado correctamente
        }
    }



    @Override
    public Paciente buscarPaciente(Integer dni) {
        return repositorioPacientes.findByDni(dni).orElse(null);
    }

    @Override
    public boolean modificarPaciente(ActualizarPacienteConsulta consulta) {

        // Validaciones básicas de los parámetros
        if (consulta == null ||
                consulta.getDni() == null ||
                consulta.getNombre() == null || consulta.getNombre().trim().isEmpty() ||
                consulta.getApellido() == null || consulta.getApellido().trim().isEmpty() ||
                consulta.getObraSocial() == null || consulta.getObraSocial().trim().isEmpty() ||
                consulta.getFotoFrenteCarnet() == null || consulta.getFotoAtrasCarnet() == null ||
                consulta.getFotoFrenteDni() == null || consulta.getFotoAtrasDni() == null) {
            throw new IllegalArgumentException("Todos los campos deben estar completos y no deben ser nulos.");
        }

        Paciente existePaciente = repositorioPacientes.findByDni(consulta.getDni())
                .orElseThrow(() -> new NoSuchElementException("Paciente con el DNI " + consulta.getDni() + " no se encontró."));

        // Actualizar los campos del paciente encontrado
        existePaciente.setNombre(consulta.getNombre());
        existePaciente.setApellido(consulta.getApellido());
        existePaciente.setObraSocial(consulta.getObraSocial());
        existePaciente.setActivo(consulta.getActivo());
        existePaciente.setObservaciones(consulta.getObservaciones());
        existePaciente.setFotoFrenteCarnet(consulta.getFotoFrenteCarnet());
        existePaciente.setFotoAtrasCarnet(consulta.getFotoAtrasCarnet());
        existePaciente.setFotoFrenteDni(consulta.getFotoFrenteDni());
        existePaciente.setFotoAtrasDni(consulta.getFotoAtrasDni());

        repositorioPacientes.save(existePaciente);
        return true;
    }
    @Override
    public boolean desactivarPaciente(OcultarPacienteConsulta consulta) {
        Paciente existePaciente = repositorioPacientes.findByDni(consulta.getDni())
                .orElseThrow(() -> new NoSuchElementException("Paciente con el DNI " + consulta.getDni() + " no se encontró."));

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
