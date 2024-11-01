package com.renan.projeto.controllers;

import com.renan.projeto.dtos.CategoriaCreateDTO;
import com.renan.projeto.dtos.CategoriaUpdateDTO;
import com.renan.projeto.entities.Categoria;
import com.renan.projeto.services.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<List<Categoria>> listar() {
        return ResponseEntity.ok().body(categoriaService.listar());
    }

    @PostMapping
    public ResponseEntity<Categoria> cadastrar(@RequestBody @Valid CategoriaCreateDTO dto) {
        Categoria categoria = categoriaService.cadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoria);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Categoria> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok().body(categoriaService.buscarPeloId(id));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Categoria> update(@RequestBody @Valid CategoriaUpdateDTO dto,
                                            @PathVariable Long id) {
        Categoria categoria = categoriaService.update(dto, id);
        return ResponseEntity.ok().body(categoria);
    }
}
