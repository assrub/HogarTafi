package com.hogarTafi.hogarTafi.Entidad.Horario;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class HorarioLista {
    @JsonProperty("Horario")
    private List<Horario> tablaDeHorarios;
}
