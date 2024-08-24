package com.hogarTafi.hogarTafi.Consulta;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GuardarPacienteConsulta {
    @NotBlank(message = "No puede estar vacio el campo")
    @Size(min = 0, max = 50,message = "No entra dentro de los limites")
    private String nombre;

    @NotBlank(message = "No puede estar vacio el campo")
    @Size(min = 0, max = 50,message = "No entra dentro de los limites")
    private String apellido;

    private Integer dni;

    @Size(min = 0, max = 50,message = "No entra dentro de los limites")
    private String obraSocial;


    @Size(min = 0, max = 255,message = "No entra dentro de los limites")
    private String observaciones;

    private byte[] fotoFrenteCarnet;

    private byte[] fotoAtrasCarnet;

    private byte[] fotoFrenteDni;

    private byte[] fotoAtrasDni;


}
