package com.hogarTafi.hogarTafi.token.entidad;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.hogarTafi.hogarTafi.usuario.entidad.EUsuario;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data  // Genera automáticamente getters, setters y otros métodos como toString(), equals(), y hashCode()
@NoArgsConstructor  // Genera un constructor sin parámetros
@Document(collection = "tokens") // Nombre de la colección en MongoDB
public class EToken {
    @Id
    private String token; 
    private EUsuario usuario; 
    private LocalDateTime fechaExpiracion;
}
