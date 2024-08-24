package com.hogarTafi.hogarTafi.Entidad;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class HorarioLista {
    @JsonProperty("Horario")
    private List<Horario> tablaDeHorarios;
}
