package com.hogarTafi.hogarTafi.stock.entidad;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EListStock {
    private String medicacion;
    private String cantidad;
    private String cant_minima;
}
