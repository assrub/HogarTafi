package com.hogarTafi.hogarTafi.Servicio;

import com.hogarTafi.hogarTafi.Entidad.EntidadPaciente;
import com.hogarTafi.hogarTafi.Repositorio.RepositorioPacientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioPacientes {

    @Autowired
    RepositorioPacientes repositorioPacientes;

    public List<EntidadPaciente> todosLosPacientes(){
        return repositorioPacientes.findAll();
    }

    public boolean guardarPaciente(String nombre, String apellido, String dni, String obraSocial, String[] fotoCarnet, String[] fotoDni) {


        EntidadPaciente paciente = new EntidadPaciente(nombre, apellido, dni, obraSocial, fotoCarnet, fotoDni);

        if (repositorioPacientes.findByDni(paciente.getDni()) != null){
            return false;
        }
        else{
            repositorioPacientes.save(paciente);
            return true;
        }
    }
}