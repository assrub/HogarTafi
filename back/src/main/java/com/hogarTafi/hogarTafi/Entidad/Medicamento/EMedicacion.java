package com.hogarTafi.hogarTafi.Entidad.Medicamento;

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
@Document(collection = "Medicacion")
public class EMedicacion {
    @Id
    private Integer dni;  // Clave primaria para relacionar con el paciente
    private List<EMedicamento> medicamentos = new ArrayList<>();  // Lista de medicamentos

    // Getters y setters generados por Lombok
}
