import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent {

  categorias: Categoria[] = [];
  categoriaForm: FormGroup;

  editarCategoria: boolean = false;
  idCategoria: number = 0;

  @ViewChild('modalCategoria') modalCategoria!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService
  ) {
    this.categoriaForm = this.fb.group({
      nome: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarCategorias();
  }

  ngAfterViewInit(): void {
    this.modalCategoria.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.clearModal();
    });
  }

  listarCategorias() {
    this.categoriaService.listar().subscribe({
      next: (response: Categoria[]) => {
        this.categorias = response;
      }, error: (error) => {
        alert("Erro ao listar categorias: " + error)
      }
    })
  }

  buscarCategoriaPorId(id: number) {
    this.categoriaService.buscarPorId(id).subscribe({
      next: (response: Categoria) => {
        this.categoriaForm.patchValue({
          nome: response.nome
        });
        this.editarCategoria = true;
        this.idCategoria = response.id;
      }, error: (error) => {
        this.editarCategoria = false;
        alert(error)
      }
    })
  }

  onSubmit(): void {
    if (this.categoriaForm.invalid) {
      // Marca todos os campos como "tocados" para exibir as mensagens de erro
      this.categoriaForm.markAllAsTouched();
      return;
    }

    if (this.editarCategoria) {
      this.categoriaService.update(this.categoriaForm.value, this.idCategoria).subscribe({
        next: (response: Categoria) => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Categoria editada com sucesso.',
          }).then(() => {
            this.editarCategoria = false;
            this.idCategoria = 0;
            this.closeModalCategoria();
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: error.error.message,
          })
        }
      });
    } else {
      this.categoriaService.cadastrar(this.categoriaForm.value).subscribe({
        next: (response: Categoria) => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Categoria cadastrada com sucesso.',
          }).then(() => {
            this.closeModalCategoria();
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: error.error.message,
          })
        }
      });
    }
  }

  closeModalCategoria(): void {
    const modal = bootstrap.Modal.getInstance(this.modalCategoria.nativeElement);
    if (modal) {
      modal.hide();
    }
  }

  clearModal() {
    this.categoriaForm.reset();
    this.listarCategorias();
  }
}
