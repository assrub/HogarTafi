package com.hogarTafi.hogarTafi.usuario.repositorio;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.hogarTafi.hogarTafi.usuario.entidad.EUsuario;

import java.util.List;
import java.util.Optional;

@Repository
public interface RUsuario extends MongoRepository<EUsuario, Integer> {
    @Override
    List<EUsuario> findAll();



    //esto es para forzar que traiga el campo activo de la base de datos. Con la otra funcion se lo saltea
    @Query(value = "{}", fields = "{activo : 1, nombre : 1, apellido : 1, email : 1, telefono : 1, direccion : 1, asociado : 1, tipo : 1, password : 1, fotoCarnet : 1}")
    List<EUsuario> findUsuariosConCampos();

    Optional<EUsuario> findByDni(Integer dni);

    Optional<EUsuario> findByEmail(String email);


}
