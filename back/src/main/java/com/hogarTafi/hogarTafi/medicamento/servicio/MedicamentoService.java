package com.hogarTafi.hogarTafi.medicamento.servicio;

import java.util.List;

import com.hogarTafi.hogarTafi.medicamento.entidad.EMedicacion;
import com.hogarTafi.hogarTafi.medicamento.entidad.EMedicamento;

public interface MedicamentoService {
    boolean registrarMedicamento(Integer dni, EMedicamento medicamentoRequest);
    EMedicacion buscarMedicacionPorDni(Integer dni);
    List<EMedicacion> buscarMedicacion();
}