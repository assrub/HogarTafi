package com.hogarTafi.hogarTafi.Entidad;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Horario")
public class EntidadHorario {

    private EntidadPaciente paciente;
    private EntidadMedicacion[] medicacion;
    //private
}
