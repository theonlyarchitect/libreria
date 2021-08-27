package com.cenfotec.libreria.Controller;

import com.cenfotec.libreria.Domain.CatalogoLibros;
import com.cenfotec.libreria.Repository.CatalogoLibrosRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"api/CatalogoLibro"})
public class CatalogoLibrosController {

    private final CatalogoLibrosRepository catalogoLibrosRepository;

    public CatalogoLibrosController(CatalogoLibrosRepository catalogoLibrosRepository) {
        this.catalogoLibrosRepository = catalogoLibrosRepository;
    }

    @PostMapping
    @ResponseStatus()
    public ResponseEntity<CatalogoLibros> createOne(@RequestBody CatalogoLibros catalogoLibro) throws URISyntaxException {


        if(catalogoLibro.getId() != null){
            return ResponseEntity.badRequest().build();
        }

        CatalogoLibros result = catalogoLibrosRepository.save(catalogoLibro);
        return ResponseEntity
                .created(new URI("api/CatalogoLibro/" +result.getId()))
                .body(result);
    }

    @GetMapping
    public ResponseEntity<List<CatalogoLibros>> getAll(){
        List<CatalogoLibros> entityList = catalogoLibrosRepository.findAll();
        return ResponseEntity.ok().body(entityList);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<CatalogoLibros> getOne(
            @PathVariable(value = "id") final Long id
    ){
        Optional<CatalogoLibros> entity = catalogoLibrosRepository.findById(id);
        return entity.map(catalogoLibros -> ResponseEntity.ok().body(catalogoLibros)).orElseGet(() -> ResponseEntity.notFound().build());

    }

}
