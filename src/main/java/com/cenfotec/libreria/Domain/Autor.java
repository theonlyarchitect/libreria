package com.cenfotec.libreria.Domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "autores")
public class Autor implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @ManyToMany(mappedBy = "autores")
    @JsonIgnoreProperties("autores")
    private List<CatalogoLibros> catalogoLibros = new ArrayList<>();

    public Autor(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public Autor(String nombre) {
        this.nombre = nombre;
    }

    public Autor() {

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

    public List<CatalogoLibros> getCatalogoLibros() {
        return catalogoLibros;
    }

    public void setCatalogoLibros(List<CatalogoLibros> catalogoLibros) {
        this.catalogoLibros = catalogoLibros;
    }

    public void addCatalogoLibros(CatalogoLibros catalogoLibros){
        this.catalogoLibros.add(catalogoLibros);
    }
}
