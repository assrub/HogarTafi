package com.hogarTafi.hogarTafi.Servicio;

import com.hogarTafi.hogarTafi.Entidad.EntidadPaciente;
import com.hogarTafi.hogarTafi.Entidad.EntidadPacienteEliminado;
import com.hogarTafi.hogarTafi.Repositorio.RepositorioPacientesEliminados;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class ServicioPacientesEliminados {
    @Autowired
    RepositorioPacientesEliminados repositorioPacientesEliminados;

    public List<EntidadPacienteEliminado> todosLosPacientes(){
        return repositorioPacientesEliminados.findAll();
    }


    public boolean guardarPaciente(String nombre, String apellido, String dni, String obraSocial, byte[] fotoFrenteCarnet,
                                   byte[] fotoAtrasCarnet, byte[] fotoFrenteDni, byte[] fotoAtrasDni) {
        try{
            EntidadPacienteEliminado paciente = new EntidadPacienteEliminado(nombre, apellido, dni, obraSocial, fotoFrenteCarnet,fotoAtrasCarnet, fotoFrenteDni,fotoAtrasDni);
            repositorioPacientesEliminados.save(paciente);
            return true;
        }catch (Error e){
            return false;
        }

    }

    public boolean eliminarPaciente(String dni){
        try{
            repositorioPacientesEliminados.deleteByDni(dni);
            if (repositorioPacientesEliminados.findByDni(dni) == null){
                return true;
            }else{
                return false;
            }
        }catch (Error e){
            return false;
        }
    }


}
