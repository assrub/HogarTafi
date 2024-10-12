package com.hogarTafi.hogarTafi.fotos.entidad;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Fotos")
public class EFotos {

    @Id
    private String id;  // MongoDB generará un identificador único automáticamente
    private List<Integer> dni;
    private String descripcion;
    private byte[] foto;
}
