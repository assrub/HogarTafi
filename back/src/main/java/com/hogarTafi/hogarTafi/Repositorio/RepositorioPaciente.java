package com.hogarTafi.hogarTafi.Repositorio;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.hogarTafi.hogarTafi.Entidad.Paciente;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepositorioPaciente extends MongoRepository<Paciente, Integer> {
    @Override
    List<Paciente> findAll();

    Optional<Paciente> findByDni(Integer dni);
}
