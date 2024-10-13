package com.hogarTafi.hogarTafi.stock.servicio;

import java.util.List;

import com.hogarTafi.hogarTafi.stock.entidad.EStock;
import com.hogarTafi.hogarTafi.stock.entidad.EListStock;

public interface SStock {
    boolean registrarStock(Integer dni, List<EListStock> medicamentoRequest);
    EStock buscarStockPorDni(Integer dni);
    List<EStock> buscarStock();
    boolean actualizarCantidadMedicamentos(Integer dni, Integer cant_minima, Integer cant_maxima, String medicamento);
}
