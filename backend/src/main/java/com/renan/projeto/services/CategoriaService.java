package com.renan.projeto.services;

import com.renan.projeto.dtos.CategoriaCreateDTO;
import com.renan.projeto.dtos.CategoriaUpdateDTO;
import com.renan.projeto.entities.Categoria;
import com.renan.projeto.exceptions.BadRequestException;
import com.renan.projeto.exceptions.NotFoundException;
import com.renan.projeto.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Transactional(readOnly = true)
    public List<Categoria> listar() {
        return categoriaRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @Transactional(readOnly = false)
    public Categoria cadastrar(CategoriaCreateDTO dto) {

        boolean existsCategoria = categoriaRepository.existsByNome(dto.getNome());

        if (existsCategoria) {
            throw new BadRequestException("O nome de categoria informado já existe");
        }

        Categoria categoria = new Categoria();
        categoria.setNome(dto.getNome());

        return categoriaRepository.save(categoria);
    }

    @Transactional(readOnly = true)
    public Categoria buscarPeloId(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Categoria não encontrada com o id: " + id));
    }

    @Transactional(readOnly = false)
    public Categoria update(CategoriaUpdateDTO dto, Long id) {

        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Categoria não encontrada com o id: " + id));


        if (!categoria.getNome().equals(dto.getNome()) &&
                categoriaRepository.existsByNome(dto.getNome())) {
            throw new BadRequestException("O nome de categoria informado já existe");
        }

        categoria.setNome(dto.getNome());
        return categoriaRepository.save(categoria);
    }
}
