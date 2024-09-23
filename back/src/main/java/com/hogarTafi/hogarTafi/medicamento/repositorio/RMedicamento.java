package com.hogarTafi.hogarTafi.medicamento.repositorio;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.hogarTafi.hogarTafi.medicamento.entidad.EMedicacion;

import java.util.Optional;

public interface RMedicamento extends MongoRepository<EMedicacion, Integer> {
    Optional<EMedicacion> findByDni(Integer dni);  // Buscar medicamentos por el DNI del paciente
}
