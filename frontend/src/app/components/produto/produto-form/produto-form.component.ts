import { Component, OnInit } from "@angular/core";
import { ProdutoService } from "../produto.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Produto } from "../produto.model";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-produto-form",
  templateUrl: "./produto-form.component.html",
  styleUrls: ["./produto-form.component.css"]
})
export class ProdutoFormComponent implements OnInit {
  produto: Produto = {
    id: null,
    nome: "",
    descricao: "",
    quantidade: null,
    preco: null
  };

  key: string = "";
  operacao = "Novo Produto";
  form: FormGroup;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      nome: [null],
      descricao: [null],
      quantidade: [null],
      preco: [null]
    });
  }

  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get("id");

    if (this.key !== null) {
      this.operacao = "Alteração";

      this.produtoService.get(this.key).subscribe((data: any) => {
        const produto = data;

        this.form = this.formBuilder.group({
          id: [produto.data.id],
          nome: [produto.data.nome, Validators.required],
          descricao: [produto.data.descricao],
          quantidade: [produto.data.quantidade],
          preco: [produto.data.preco]
        }
        );
      });
    }
  }

  save() {
    const data = {
      nome: this.form.get('nome').value,
      descricao: this.form.get('descricao').value,
      quantidade: this.form.get('quantidade').value,
      preco: this.form.get('preco').value,
    };

    const id = this.form.get('id').value;

    if (id != 0) {
      this.produtoService.update(id, data)
        .subscribe(
          response => {
            this.produtoService.showMessage("Produto atualizado com sucesso !!!");
            this.router.navigate(["/produtos"]);
          },
          error => {
            this.produtoService.showMessage("Erro na alteração do produto !" + error.error.error);
          });
    } else {
      this.produtoService.create(data)
        .subscribe(
          response => {
            this.produtoService.showMessage("Produto cadastrado com sucesso !!!");
            this.router.navigate(["/produtos"]);
          },
          error => {
            this.produtoService.showMessage("Erro na inclusão do produto !" + error.error.error);
          });
    }
  }

  cancel(): void {
    this.router.navigate(["/produtos"]);
  }
}
