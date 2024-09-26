package com.hogarTafi.hogarTafi.medicamento.servicio;

import java.util.List;

import com.hogarTafi.hogarTafi.medicamento.entidad.EMedicamento;
import com.hogarTafi.hogarTafi.medicamento.entidad.EListMedicamento;

public interface SMedicamento {
    boolean registrarMedicamento(Integer dni, List<EListMedicamento> medicamentoRequest);
    EMedicamento buscarMedicacionPorDni(Integer dni);
    List<EMedicamento> buscarMedicacion();
}