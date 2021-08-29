package com.cenfotec.libreria.Repository;

import com.cenfotec.libreria.Domain.CatalogoLibros;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CatalogoLibrosRepository extends JpaRepository<CatalogoLibros, Long> {
    public List<CatalogoLibros> findCatalogoLibrosByInventarioGreaterThan(Long inventario);
    public List<CatalogoLibros> findCatalogoLibrosByInventarioEquals(Long inventario);
    public List<CatalogoLibros> findCatalogoLibrosByTituloContaining(String filter);
    public List<CatalogoLibros> findCatalogoLibrosByEditorialContains(String filter);
    public List<CatalogoLibros> findCatalogoLibrosByTematicaContaining(String filter);
    public List<CatalogoLibros> findCatalogoLibrosByAutorContaining(String filter);

}
