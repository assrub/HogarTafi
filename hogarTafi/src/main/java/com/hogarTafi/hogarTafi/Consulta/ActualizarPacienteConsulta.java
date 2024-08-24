package com.hogarTafi.hogarTafi.Consulta;

import lombok.Data;

@Data
public class ActualizarPacienteConsulta {
    private Integer dni;
    private String nombre;
    private String apellido;
    private String obraSocial;
    private Boolean activo;
    private String observaciones;
    private byte[] fotoFrenteCarnet;
    private byte[] fotoAtrasCarnet;
    private byte[] fotoFrenteDni;
    private byte[] fotoAtrasDni;
}
