package com.hogarTafi.hogarTafi.Servicio.impl;

import com.hogarTafi.hogarTafi.Entidad.Paciente;
import com.hogarTafi.hogarTafi.Repositorio.RepositorioPacientes;
import com.hogarTafi.hogarTafi.Servicio.ServicioPacientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioPacientesImpl implements ServicioPacientes {

    @Autowired
    private RepositorioPacientes repositorioPacientes;


    @Override
    public List<Paciente> todosLosPacientes() {
        return repositorioPacientes.findAll();
    }

    @Override
    public boolean guardarPaciente(String nombre, String apellido, Integer dni, String obraSocial,Boolean activo,String observaciones, byte[] fotoFrenteCarnet,
                                   byte[] fotoAtrasCarnet, byte[] fotoFrenteDni, byte[] fotoAtrasDni) {
        Paciente paciente = new Paciente(nombre, apellido, dni, obraSocial,activo,observaciones, fotoFrenteCarnet, fotoAtrasCarnet, fotoFrenteDni, fotoAtrasDni);

        if (repositorioPacientes.findByDni(paciente.getDni()) != null) {
            return false;
        } else {
            repositorioPacientes.save(paciente);
            return true;
        }
    }

    @Override
    public Paciente buscarPaciente(Integer dni) {
        return repositorioPacientes.findByDni(dni);
    }

    @Override
    public boolean eliminarPaciente(Integer dni) {
        try {
            repositorioPacientes.deleteByDni(dni);
            return repositorioPacientes.findByDni(dni) == null;
        } catch (Error e) {
            return false;
        }
    }
}
