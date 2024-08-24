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
    public boolean guardarPaciente(Integer dni,String nombre, String apellido,  String obraSocial, Boolean activo, String observaciones, byte[] fotoFrenteCarnet,
                                   byte[] fotoAtrasCarnet, byte[] fotoFrenteDni, byte[] fotoAtrasDni) {
        // Establecer activo en true al crear un nuevo paciente
        Paciente paciente = new Paciente(dni, nombre, apellido, obraSocial, true, observaciones, fotoFrenteCarnet, fotoAtrasCarnet, fotoFrenteDni, fotoAtrasDni);

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
        return repositorioPacientes.findByDni(dni).orElseThrow(() -> new NoSuchElementException("Paciente con el DNI " + dni + " no se encontró."));
    }

    @Override
    public boolean modificarPaciente(ActualizarPacienteConsulta consulta) {

        // Buscar el paciente existente por DNI
        Paciente existePaciente = repositorioPacientes.findByDni(consulta.getDni())
                .orElseThrow(() -> new NoSuchElementException("Paciente con el DNI " + consulta.getDni() + " no se encontró."));

        // Actualizar los campos permitidos del paciente
        existePaciente.setNombre(consulta.getNombre());
        existePaciente.setApellido(consulta.getApellido());
        existePaciente.setObraSocial(consulta.getObraSocial());
        existePaciente.setObservaciones(consulta.getObservaciones());

        // Guardar los cambios en la base de datos
        repositorioPacientes.save(existePaciente);
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
