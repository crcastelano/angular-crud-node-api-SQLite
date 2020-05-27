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
  ) { }

  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //     id: ['', ],
    //     name: ['', Validators.required],
    //     description: ['', []],
    //     price: ['', []],
    //     available: ['', []]
    // }
    // );

    // this.form = new FormGroup({
    //   id: new FormControl("", [Validators.required, Validators.maxLength(60)]),
    //   name: new FormControl(new Date()),
    //   description: new FormControl("", [
    //     Validators.required,
    //     Validators.maxLength(100)
    //   ]),
    //   price: new FormControl("", []),
    //   available: new FormControl("", [])
    // });

    this.key = this.route.snapshot.paramMap.get("id");

    if (this.key !== null) {
      this.operacao = "Alteração";
      this.produtoService.get(this.key).subscribe(data => {
        this.produto = {
          id: data.id,
          nome: data.nome,
          descricao: data.descricao,
          quantidade: data.quantidade,
          preco: data.preco,
        };
      });
    }
  }

  // createProduct(): void {
  //   this.produtoService.create(this.product).subscribe(() => {
  //     this.produtoService.showMessage("Produto criado com sucesso !!!");
  //     this.router.navigate(["/products"]);
  //   });
  // }

  save() {
    const data = {
      nome: this.produto.nome,
      descricao: this.produto.descricao,
      quantidade: this.produto.quantidade,
      preco: this.produto.preco
    };

    if (this.key !== null) {
      this.produtoService.update(this.produto.id, data)
        .subscribe(
          response => {
            this.produtoService.showMessage("Produto atualizado com sucesso !!!");
            this.router.navigate(["/products"]);
          },
          error => {
            this.produtoService.showMessage("Erro na alteração do produto !");
          });
    } else {
      this.produtoService.create(data)
        .subscribe(
          response => {
            this.produtoService.showMessage("Produto cadastrado com sucesso !!!");
            this.router.navigate(["/products"]);
          },
          error => {
            this.produtoService.showMessage("Erro na alteração do produto !");
          });
    }
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
