package com.hogarTafi.hogarTafi.Entidad.Horario;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"Medicacion", "6:00", "Des", "Alm", "Mer", "Cena", "22:30", "Observaciones"})
public class Horario {
    private String medicacion;
    private String seis;
    private String des;
    private String alm;
    private String mer;
    private String cena;
    private String veintidosTreinta;
    private String observaciones;
}
