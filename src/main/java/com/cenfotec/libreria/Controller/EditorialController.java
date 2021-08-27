package com.cenfotec.libreria.Controller;

import com.cenfotec.libreria.Domain.Editorial;
import com.cenfotec.libreria.Repository.EditorialRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"api/Editorial"})
public class EditorialController {

    private final EditorialRepository editorialRepository;

    public EditorialController(EditorialRepository editorialRepository) {
        this.editorialRepository = editorialRepository;
    }

    @PostMapping
    @ResponseStatus()
    public ResponseEntity<Editorial> createCatalogoLibros(@RequestBody Editorial editorial) throws URISyntaxException {


        if(editorial.getId() != null){
            return ResponseEntity.badRequest().build();
        }

        Editorial result = editorialRepository.save(editorial);
        return ResponseEntity
                .created(new URI("api/Editorial/" +result.getId()))
                .body(result);
    }

    @GetMapping
    public ResponseEntity<List<Editorial>> getAllCondominios(){
        List<Editorial> entityList = editorialRepository.findAll();
        return ResponseEntity.ok().body(entityList);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Editorial> getOne(
            @PathVariable(value = "id") final Long id
    ){
        Optional<Editorial> entity = editorialRepository.findById(id);
        return entity.map(editorial -> ResponseEntity.ok().body(editorial)).orElseGet(() -> ResponseEntity.notFound().build());

    }

}
