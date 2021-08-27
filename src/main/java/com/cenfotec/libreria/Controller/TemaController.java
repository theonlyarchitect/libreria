package com.cenfotec.libreria.Controller;

import com.cenfotec.libreria.Domain.Tema;
import com.cenfotec.libreria.Repository.TemaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"api/Tema" })
public class TemaController {

    private final TemaRepository temaRepository;

    public TemaController(TemaRepository temaRepository) {
        this.temaRepository = temaRepository;
    }

    @PostMapping
    @ResponseStatus()
    public ResponseEntity<Tema> createOne(@RequestBody Tema tema) throws URISyntaxException {


        if(tema.getId() != null){
            return ResponseEntity.badRequest().build();
        }

        Tema result = temaRepository.save(tema);
        return ResponseEntity
                .created(new URI("api/Tema/" +result.getId()))
                .body(result);
    }

    @GetMapping
    public ResponseEntity<List<Tema>> getAll(){
        List<Tema> entityList = temaRepository.findAll();
        return ResponseEntity.ok().body(entityList);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Tema> getOne(
            @PathVariable(value = "id") final Long id
    ){
        Optional<Tema> entity = temaRepository.findById(id);
        return entity.map(tema -> ResponseEntity.ok().body(tema)).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
