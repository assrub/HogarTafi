package com.hogarTafi.hogarTafi.Entidad.Horario;

import com.hogarTafi.hogarTafi.Entidad.Medicacion.EntidadMedicacion;
import com.hogarTafi.hogarTafi.Entidad.Paciente.EntidadPaciente;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection = "Horario")
public class EntidadHorario {

    private EntidadPaciente paciente;
    private EntidadMedicacion[] medicacion;
    private HorarioLista horario;

    public void main(String[] args){

    }



}
