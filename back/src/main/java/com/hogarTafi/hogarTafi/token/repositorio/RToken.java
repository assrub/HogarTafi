package com.hogarTafi.hogarTafi.token.repositorio;

import org.springframework.data.mongodb.repository.MongoRepository; // Cambia esto
import com.hogarTafi.hogarTafi.token.entidad.EToken;

import java.util.Optional;

public interface RToken extends MongoRepository<EToken, String> { // Cambia Long a String si el token es un String

    Optional<EToken> findByToken(String token);

    void deleteByToken(String token);  // Para borrar el token después de usarlo
}
