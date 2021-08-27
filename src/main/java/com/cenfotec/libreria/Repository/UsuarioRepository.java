package com.cenfotec.libreria.Repository;

import com.cenfotec.libreria.Domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
