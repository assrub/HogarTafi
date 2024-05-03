package Entidad;

public class Medicamento {
    private String nombre;
    private int cantPorMes;
    private int cantActual;
    private int aviso;

    public Medicamento(String nombre, int cantPorMes, int cantActual, int aviso) {
        this.nombre = nombre;
        this.cantPorMes = cantPorMes;
        this.cantActual = cantActual;
        this.aviso = aviso;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getCantPorMes() {
        return cantPorMes;
    }

    public void setCantPorMes(int cantPorMes) {
        this.cantPorMes = cantPorMes;
    }

    public int getCantActual() {
        return cantActual;
    }

    public void setCantActual(int cantActual) {
        this.cantActual = cantActual;
    }

    public int getAviso() {
        return aviso;
    }

    public void setAviso(int aviso) {
        this.aviso = aviso;
    }
}
