package com.hogarTafi.hogarTafi.Entidad.Medicamento;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EMedicamento {
    private String medicamento;
    private String horario_1;
    private String desayuno;
    private String almuerzo;
    private String merienda;
    private String cena;
    private String horario_2;
    private String observaciones;
}
