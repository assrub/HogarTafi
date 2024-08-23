package com.hogarTafi.hogarTafi.Servicio;

import com.hogarTafi.hogarTafi.Entidad.Paciente;

import java.util.List;

public interface ServicioPacientes {
    List<Paciente> todosLosPacientes();
    boolean guardarPaciente(String nombre, String apellido, Integer dni, String obraSocial, Boolean activo,String observaciones, byte[] fotoFrenteCarnet,
                            byte[] fotoAtrasCarnet, byte[] fotoFrenteDni, byte[] fotoAtrasDni);

    Paciente buscarPaciente(Integer dni);
    boolean eliminarPaciente(Integer dni);
}
