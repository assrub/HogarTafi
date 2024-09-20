package com.hogarTafi.hogarTafi.Repositorio.Medicamento;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.hogarTafi.hogarTafi.Entidad.Medicamento.EMedicacion;

import java.util.Optional;

public interface RMedicamento extends MongoRepository<EMedicacion, Integer> {
    Optional<EMedicacion> findByDni(Integer dni);  // Buscar medicamentos por el DNI del paciente
}
