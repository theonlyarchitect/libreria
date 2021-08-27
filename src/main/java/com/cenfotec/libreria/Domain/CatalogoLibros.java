package com.cenfotec.libreria.Domain;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "catalogo_libros")
public class CatalogoLibros {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "fecha_lanzamiento")
    private LocalDate fechaLanzamiento;

    @Column(name = "inventario")
    private long inventario;

    @ManyToMany()
    @JoinTable(
            name = "autores_catalogo_libros",
            joinColumns = @JoinColumn(name = "catalogo_libros_id"),
            inverseJoinColumns = @JoinColumn(name = "autores_id")
    )
    private List<Autor> autores = new ArrayList<>();

    @ManyToMany()
    @JoinTable(
            name = "temas_catalogos_libros",
            joinColumns = @JoinColumn(name = "catalogo_libros_id"),
            inverseJoinColumns = @JoinColumn(name = "temas_id")
    )
    private List<Tema> temas = new ArrayList<>();

    public CatalogoLibros(Long id, String titulo, LocalDate fechaLanzamiento, long inventario, List<Autor> autores, List<Tema> temas) {
        this.id = id;
        this.titulo = titulo;
        this.fechaLanzamiento = fechaLanzamiento;
        this.inventario = inventario;
        this.autores = autores;
        this.temas = temas;
    }

    public CatalogoLibros() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public LocalDate getFechaLanzamiento() {
        return fechaLanzamiento;
    }

    public void setFechaLanzamiento(LocalDate fechaLanzamiento) {
        this.fechaLanzamiento = fechaLanzamiento;
    }

    public long getInventario() {
        return inventario;
    }

    public void setInventario(long inventario) {
        this.inventario = inventario;
    }

    public List<Autor> getAutores() {
        return autores;
    }

    public void setAutores(List<Autor> autores) {
        this.autores = autores;
    }

    public List<Tema> getTemas() {
        return temas;
    }

    public void setTemas(List<Tema> temas) {
        this.temas = temas;
    }

}
