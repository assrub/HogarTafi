package com.hogarTafi.hogarTafi.stock.Entidad;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EStock {
    private String medicacion;
    private String cantidad;
    private String cant_minima;
}
