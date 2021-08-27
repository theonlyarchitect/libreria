package com.cenfotec.libreria.Repository;

import com.cenfotec.libreria.Domain.Tema;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TemaRepository extends JpaRepository<Tema, Long> {
}
