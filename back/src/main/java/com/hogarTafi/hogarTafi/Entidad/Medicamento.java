package com.hogarTafi.hogarTafi.Entidad;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medicamento {
    private String medicamento;
    private String almuerzo;
    private String merienda;
    private String cena;
    private String horario;
    private String observaciones;
}
