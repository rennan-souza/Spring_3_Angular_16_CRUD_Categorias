package com.renan.projeto.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CategoriaCreateDTO {

    @NotEmpty(message = "A categoria é obrigatória")
    private String nome;
}
