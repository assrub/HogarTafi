package com.hogarTafi.hogarTafi.usuario.repositorio;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hogarTafi.hogarTafi.usuario.entidad.EUsuario;

import java.util.List;
import java.util.Optional;

@Repository
public interface RUsuario extends MongoRepository<EUsuario, Integer> {
    @Override
    List<EUsuario> findAll();

    Optional<EUsuario> findByDni(Integer dni);
}
