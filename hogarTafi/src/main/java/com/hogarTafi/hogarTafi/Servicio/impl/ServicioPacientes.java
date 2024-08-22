package com.hogarTafi.hogarTafi.Servicio.impl;

import com.hogarTafi.hogarTafi.Entidad.EntidadPaciente;
import com.hogarTafi.hogarTafi.Repositorio.RepositorioPacientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioPacientes {

    @Autowired
    RepositorioPacientes repositorioPacientes;

    public List<EntidadPaciente> todosLosPacientes(){
        return repositorioPacientes.findAll();
    }

    //Pide los datos de un paciente y los almacena
    public boolean guardarPaciente(String nombre, String apellido, String dni, String obraSocial, byte[] fotoFrenteCarnet,
                                   byte[] fotoAtrasCarnet, byte[] fotoFrenteDni, byte[] fotoAtrasDni) {


        EntidadPaciente paciente = new EntidadPaciente(nombre, apellido, dni, obraSocial, fotoFrenteCarnet,fotoAtrasCarnet, fotoFrenteDni,fotoAtrasDni);

        if (repositorioPacientes.findByDni(paciente.getDni()) != null){
            return false;
        }
        else{
            repositorioPacientes.save(paciente);
            return true;
        }
    }

    public EntidadPaciente buscarPaciente(String dni){
        EntidadPaciente paciente = repositorioPacientes.findByDni(dni);
        return paciente;
    }

    public boolean eliminarPaciente(String dni){
        try{
            repositorioPacientes.deleteByDni(dni);
            if (repositorioPacientes.findByDni(dni) == null){
                return true;
            }else{
                return false;
            }
        }catch (Error e){
            return false;
        }
    }

}