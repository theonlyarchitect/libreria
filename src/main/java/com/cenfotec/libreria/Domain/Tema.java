package com.cenfotec.libreria.Domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "temas")
public class Tema implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @ManyToMany(mappedBy = "temas")
    @JsonIgnoreProperties("temas")
    private List<CatalogoLibros> catalogoLibros = new ArrayList<>();


    public Tema(Long id, String nombre, List<CatalogoLibros> catalogoLibros) {
        this.id = id;
        this.nombre = nombre;
        this.catalogoLibros = catalogoLibros;
    }

    public Tema() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void addCatalogoLibros(CatalogoLibros catalogoLibro) {
        this.catalogoLibros.add(catalogoLibro);
    }

    public List<CatalogoLibros> getCatalogoLibros() {
        return catalogoLibros;
    }

    public void setCatalogoLibros(List<CatalogoLibros> catalogoLibros) {
        this.catalogoLibros = catalogoLibros;
    }
}
