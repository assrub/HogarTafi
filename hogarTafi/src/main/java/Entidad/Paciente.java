package Entidad;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collation = "Pacientes")
public class Paciente {
    private String nombre;
    private String apellido;
    private int dni;
    private String obraSocial;
    private String[] fotoCarnet; // Buscar algun tipo para poder usar imagenes
    private String[] fotoDni; // Buscar algun tipo para poder usar imagenes

    public Paciente(String nombre, String apellido, int dni, String obraSocial, String[] fotoCarnet, String[] fotoDni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.obraSocial = obraSocial;
        this.fotoCarnet = fotoCarnet;
        this.fotoDni = fotoDni;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public int getDni() {
        return dni;
    }

    public void setDni(int dni) {
        this.dni = dni;
    }

    public String getObraSocial() {
        return obraSocial;
    }

    public void setObraSocial(String obraSocial) {
        this.obraSocial = obraSocial;
    }

    public String[] getFotoCarnet() {
        return fotoCarnet;
    }

    public void setFotoCarnet(String[] fotoCarnet) {
        this.fotoCarnet = fotoCarnet;
    }

    public String[] getFotoDni() {
        return fotoDni;
    }

    public void setFotoDni(String[] fotoDni) {
        this.fotoDni = fotoDni;
    }
}
