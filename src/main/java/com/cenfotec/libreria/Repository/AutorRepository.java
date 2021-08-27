package com.cenfotec.libreria.Repository;

import com.cenfotec.libreria.Domain.Autor;
import com.cenfotec.libreria.Domain.CatalogoLibros;
import com.cenfotec.libreria.Domain.Editorial;
import com.cenfotec.libreria.Domain.Tema;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AutorRepository extends JpaRepository<Autor, Long> {
}

