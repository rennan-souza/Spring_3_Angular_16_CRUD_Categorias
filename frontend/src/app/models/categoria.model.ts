export class Categoria {
    constructor(
        public id: number,
        public nome: string
    ) { }
}

export class CategoriaCreate {
    constructor(
        public nome: string
    ) {}
}

export class CategoriaUpdate {
    constructor(
        public nome: string
    ) {}
}