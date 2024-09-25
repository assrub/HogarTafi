package com.hogarTafi.hogarTafi.stock.Entidad;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Stock")
public class EArregloStock {
    @Id
    private Integer dni;  // Clave primaria para relacionar con el paciente
    private List<EStock> medicamentos = new ArrayList<>();  // Lista de medicamentos
}

