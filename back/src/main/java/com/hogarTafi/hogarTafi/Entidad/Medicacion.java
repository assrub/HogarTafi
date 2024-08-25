package com.hogarTafi.hogarTafi.Entidad;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Medicacion")
public class Medicacion {
    private String nombre;
    private int cantPorMEs;
    private int cantActual;
    private int aviso;


}
