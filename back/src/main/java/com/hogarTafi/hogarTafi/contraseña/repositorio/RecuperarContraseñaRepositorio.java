package com.hogarTafi.hogarTafi.contraseña.repositorio;

import com.hogarTafi.hogarTafi.usuario.entidad.EUsuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecuperarContraseñaRepositorio extends MongoRepository<EUsuario, Integer> {
    EUsuario findByEmail(String email);  // Método para buscar usuario por email
}
