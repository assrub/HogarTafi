package com.hogarTafi.hogarTafi.stock.entidad;

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
public class EStock {
    @Id
    private Integer dni;  // Clave primaria para relacionar con el paciente
    private List<EListStock> medicamentos = new ArrayList<>();  // Lista de medicamentos
}

