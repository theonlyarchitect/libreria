package com.cenfotec.libreria.Controller;

import com.cenfotec.libreria.Domain.Usuario;
import com.cenfotec.libreria.Repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"api/Usuario" })
public class UsuarioController {
    
    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
    @ResponseStatus()
    public ResponseEntity<Usuario> createOne(@RequestBody Usuario usuario) throws URISyntaxException {


        if(usuario.getId() != null){
            return ResponseEntity.badRequest().build();
        }

        Usuario result = usuarioRepository.save(usuario);
        return ResponseEntity
                .created(new URI("api/Usuario/" +result.getId()))
                .body(result);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus()
    public ResponseEntity<Usuario> updateOne(
            @PathVariable(value = "id", required = false) final Long id,
            @RequestBody Usuario usuario) throws URISyntaxException {


        if(usuario.getId() == null){
            return ResponseEntity.badRequest().build();
        }

        Usuario result = usuarioRepository.save(usuario);
        return ResponseEntity
                .created(new URI("api/Usuario/" +result.getId()))
                .body(result);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> getAll(){
        List<Usuario> entityList = usuarioRepository.findAll();
        return ResponseEntity.ok().body(entityList);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Usuario> getOne(
            @PathVariable(value = "id") final Long id
    ){
        Optional<Usuario> entity = usuarioRepository.findById(id);
        return entity.map(usuario -> ResponseEntity.ok().body(usuario)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Usuario> deleteOne(
            @PathVariable(value = "id") final Long id
    ){
        Optional<Usuario> entity = usuarioRepository.findById(id);
        usuarioRepository.delete(entity.get());
        return entity.map(usuario -> ResponseEntity.ok().body(usuario)).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
