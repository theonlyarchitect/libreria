package com.cenfotec.libreria.Domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "temas")
public class Tema implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    public Tema(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
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
}
