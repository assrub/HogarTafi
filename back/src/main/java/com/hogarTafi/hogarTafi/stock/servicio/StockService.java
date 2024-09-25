package com.hogarTafi.hogarTafi.stock.servicio;

import java.util.List;

import com.hogarTafi.hogarTafi.stock.Entidad.EArregloStock;
import com.hogarTafi.hogarTafi.stock.Entidad.EStock;

public interface StockService {
    boolean registrarStock(Integer dni, List<EStock> medicamentoRequest);
    EArregloStock buscarStockPorDni(Integer dni);
    List<EArregloStock> buscarStock();
}
