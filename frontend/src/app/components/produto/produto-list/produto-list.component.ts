import { Produto } from "../produto.model";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { MatTableDataSource } from "@angular/material/table";
import { ProdutoService } from "../produto.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-produto-list",
  templateUrl: "./produto-list.component.html",
  styleUrls: ["./produto-list.component.css"]
})
export class ProdutoListComponent implements AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  produtos: Produto[];
  dataSource: MatTableDataSource<any>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  colunas = ["id", "nome", "descricao", "quantidade", "preco"];

  constructor(private router: Router, private produtoService: ProdutoService) { }

  update(id) {
    this.router.navigate(["/produtos/update/" + id]);
  }

  delete(id: number) {
    if (window.confirm("Confirma exclusão do produto ?")) {
      this.produtoService.delete(id)
        .subscribe(
          response => {
            this.produtoService.showMessage("Produto Excluído com sucesso !!!");
            this.router.navigate(["/produtos"]);
          },
          error => {
            console.log(error);
          });
    }

  }

  ngAfterViewInit() {
    this.produtoService.getAll().subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(result.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
