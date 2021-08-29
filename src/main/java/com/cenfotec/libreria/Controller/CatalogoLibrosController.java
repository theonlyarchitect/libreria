package com.cenfotec.libreria.Controller;

import com.cenfotec.libreria.Domain.Autor;
import com.cenfotec.libreria.Domain.CatalogoLibros;
import com.cenfotec.libreria.Domain.Tema;
import com.cenfotec.libreria.Repository.AutorRepository;
import com.cenfotec.libreria.Repository.CatalogoLibrosRepository;
import com.cenfotec.libreria.Repository.TemaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"api/CatalogoLibro"})
public class CatalogoLibrosController {

    private final CatalogoLibrosRepository catalogoLibrosRepository;

    private final AutorRepository autorRepository;

    private final TemaRepository temaRepository;

    public CatalogoLibrosController(CatalogoLibrosRepository catalogoLibrosRepository, AutorRepository autorRepository, TemaRepository temaRepository) {
        this.catalogoLibrosRepository = catalogoLibrosRepository;
        this.autorRepository = autorRepository;
        this.temaRepository = temaRepository;
    }

    /*
    @PostMapping
    @ResponseStatus()
    public ResponseEntity<CatalogoLibros> createOne(@RequestBody CatalogoLibros catalogoLibro) throws URISyntaxException {


        if(catalogoLibro.getId() != null){
            return ResponseEntity.badRequest().build();
        }

        if(!catalogoLibro.getAutores().isEmpty()){
            for ( Autor autor : catalogoLibro.getAutores() ) {
                if(!autorRepository.existsById(autor.getId())){
                    autor.setId(null);
                    autor = autorRepository.save(autor);
                }

                autor = autorRepository.getById(autor.getId());
                autor.addCatalogoLibros(catalogoLibro);
            }
        }
        if(!catalogoLibro.getTemas().isEmpty()){
            for ( Tema tema : catalogoLibro.getTemas() ) {
                if(!temaRepository.existsById(tema.getId())){
                    tema.setId(null);
                    tema = temaRepository.save(tema);
                }

                tema = temaRepository.getById(tema.getId());
                tema.addCatalogoLibros(catalogoLibro);
            }
        }

        CatalogoLibros result = catalogoLibrosRepository.save(catalogoLibro);
        return ResponseEntity
                .created(new URI("api/CatalogoLibro/" +result.getId()))
                .body(result);
    }
     */

    @PostMapping
    @ResponseStatus()
    public ResponseEntity<CatalogoLibros> createOne(@RequestBody CatalogoLibros catalogoLibro) throws URISyntaxException {
        catalogoLibro.setAutores(null);
        catalogoLibro.setTemas(null);
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

    @GetMapping(path = "enexistencia/")
    public ResponseEntity<List<CatalogoLibros>> getInExistence(){
        List<CatalogoLibros> entityList = catalogoLibrosRepository.findCatalogoLibrosByInventarioGreaterThan(0L);
        return ResponseEntity.ok().body(entityList);
    }

    @GetMapping(path = "soldOut/")
    public ResponseEntity<List<CatalogoLibros>> getOuExistence(){
        List<CatalogoLibros> entityList = catalogoLibrosRepository.findCatalogoLibrosByInventarioEquals(0L);
        return ResponseEntity.ok().body(entityList);
    }

    @GetMapping(value = "titulo/{titulo}")
    public ResponseEntity<List<CatalogoLibros>> getByTitle(
            @PathVariable(value = "titulo") final String filter
    ){
        List<CatalogoLibros> entityList = catalogoLibrosRepository.findCatalogoLibrosByTituloContaining(filter);
        return ResponseEntity.ok().body(entityList);
    }

    @GetMapping(value = "autor/{autor}")
    public ResponseEntity<List<CatalogoLibros>> getByAutor(
            @PathVariable(value = "autor") final String filter
    ){
        List<CatalogoLibros> entityList = catalogoLibrosRepository.findCatalogoLibrosByAutorContaining(filter);
        return ResponseEntity.ok().body(entityList);
    }

    @GetMapping(value = "tematica/{tema}")
    public ResponseEntity<List<CatalogoLibros>> getByTopic(
            @PathVariable(value = "tema") final String filter
    ){
        List<CatalogoLibros> entityList = catalogoLibrosRepository.findCatalogoLibrosByTematicaContaining(filter);
        return ResponseEntity.ok().body(entityList);
    }

    @GetMapping(value = "editorial/{editorial}")
    public ResponseEntity<List<CatalogoLibros>> getByEditorial(
            @PathVariable(value = "editorial") final String filter
    ){
        List<CatalogoLibros> entityList = catalogoLibrosRepository.findCatalogoLibrosByEditorialContains(filter);
        return ResponseEntity.ok().body(entityList);
    }

    @GetMapping(value = "anno/{anno}")
    public ResponseEntity<List<CatalogoLibros>> getByAnno(
            @PathVariable(value = "anno") final Long filter
    ){
        List<CatalogoLibros> entityList = catalogoLibrosRepository.findAll();
        List<CatalogoLibros> result = new ArrayList<>();
        for (CatalogoLibros catalogo : entityList
             ) {
            if(catalogo.getFechaLanzamiento().getYear() == filter){
                result.add(catalogo);
            }

        }
        return ResponseEntity.ok().body(result);
    }

    @GetMapping(value = "prestar/{id}")
    public ResponseEntity<CatalogoLibros> getBorrow(
            @PathVariable(value = "id") final Long id
    ){
        Optional<CatalogoLibros> entity = catalogoLibrosRepository.findById(id);
        if(entity.isPresent()){
            CatalogoLibros instance  = entity.get();
            instance.setInventario(entity.get().getInventario() - 1);
            catalogoLibrosRepository.save(instance);
            return ResponseEntity.ok(instance);
        }
return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "devolver/{id}")
    public ResponseEntity<CatalogoLibros> getUnBorrow(
            @PathVariable(value = "id") final Long id
    ){
        Optional<CatalogoLibros> entity = catalogoLibrosRepository.findById(id);
        if(entity.isPresent()){
            CatalogoLibros instance  = entity.get();
            instance.setInventario(entity.get().getInventario() + 1);
            catalogoLibrosRepository.save(instance);
            return ResponseEntity.ok(instance);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<CatalogoLibros> getOne(
            @PathVariable(value = "id") final Long id
    ){
        Optional<CatalogoLibros> entity = catalogoLibrosRepository.findById(id);
        return entity.map(catalogoLibros -> ResponseEntity.ok().body(catalogoLibros)).orElseGet(() -> ResponseEntity.notFound().build());

    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<CatalogoLibros> deleteOne(
            @PathVariable(value = "id") final Long id
    ){
        Optional<CatalogoLibros> entity = catalogoLibrosRepository.findById(id);
        catalogoLibrosRepository.delete(entity.get());
        return entity.map(catalogoLibros -> ResponseEntity.ok().body(catalogoLibros)).orElseGet(() -> ResponseEntity.notFound().build());

    }


}
