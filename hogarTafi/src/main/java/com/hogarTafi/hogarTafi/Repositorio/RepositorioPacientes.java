package com.hogarTafi.hogarTafi.Repositorio;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.hogarTafi.hogarTafi.Entidad.Paciente;

import java.util.List;

@Repository
public interface RepositorioPacientes extends MongoRepository<Paciente, String> {
    @Override
    List<Paciente> findAll();

    Paciente findByDni(Integer dni);
    void deleteByDni(Integer dni);
}