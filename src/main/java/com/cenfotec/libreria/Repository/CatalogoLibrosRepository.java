package com.cenfotec.libreria.Repository;

import com.cenfotec.libreria.Domain.CatalogoLibros;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatalogoLibrosRepository extends JpaRepository<CatalogoLibros, Long> {
}
