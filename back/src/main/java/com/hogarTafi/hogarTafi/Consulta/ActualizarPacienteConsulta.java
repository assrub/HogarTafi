package com.hogarTafi.hogarTafi.Consulta;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActualizarPacienteConsulta {
    private Integer dni;
    private String nombre;
    private String apellido;
    private String obraSocial;
    private Boolean activo;
    private String observaciones;
    
    private MultipartFile fotoFrenteCarnet;
    private MultipartFile fotoAtrasCarnet;
    private MultipartFile fotoFrenteDni;
    private MultipartFile fotoAtrasDni;

}
