package com.hogarTafi.hogarTafi.Entidad;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Horario")
public class EntidadHorario {

    private Paciente paciente;
    private Medicacion[] medicacion;
    private HorarioLista horario;


}
