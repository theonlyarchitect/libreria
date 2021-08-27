package com.cenfotec.libreria.Controller;

import com.cenfotec.libreria.Domain.Autor;
import com.cenfotec.libreria.Repository.AutorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"api/autor"})
public class AutorController {

    private final AutorRepository autorRepository;

    public AutorController(AutorRepository autorRepository) {
        this.autorRepository = autorRepository;
    }

    @PostMapping
    @ResponseStatus()
    public ResponseEntity<Autor> createOne(@RequestBody Autor autor) throws URISyntaxException {
        if(autor.getId() != null){
            return ResponseEntity.badRequest().build();
        }

        Autor result = autorRepository.save(autor);
        return ResponseEntity
                .created(new URI("/autor/" +result.getId()))
                .body(result);
    }

    @GetMapping
    public ResponseEntity<List<Autor>> getAll(){
        List<Autor> entityList = autorRepository.findAll();
        return ResponseEntity.ok().body(entityList);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Autor> getOne(
            @PathVariable(value = "id") final Long id
    ){
        Optional<Autor> entity = autorRepository.findById(id);
        return entity.map(autor -> ResponseEntity.ok().body(autor)).orElseGet(() -> ResponseEntity.notFound().build());

    }

}
