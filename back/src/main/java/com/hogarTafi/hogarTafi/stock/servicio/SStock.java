package com.hogarTafi.hogarTafi.stock.servicio;

import java.util.List;

import com.hogarTafi.hogarTafi.stock.Entidad.EStock;
import com.hogarTafi.hogarTafi.stock.Entidad.EListStock;

public interface SStock {
    boolean registrarStock(Integer dni, List<EListStock> medicamentoRequest);
    EStock buscarStockPorDni(Integer dni);
    List<EStock> buscarStock();
}
