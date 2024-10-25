package com.hogarTafi.hogarTafi.medicamento.entidad;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EListMedicamento {
    private String medicamento;
    private String horario_1;
    private String desayuno;
    private String almuerzo;
    private String merienda;
    private String cena;
    private String horario_2;
    private String observaciones;
}
