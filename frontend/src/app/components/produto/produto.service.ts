import { Injectable } from "@angular/core";
import { Produto } from "./produto.model";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from "@angular/material/snack-bar";

const baseUrl = 'http://localhost:7000/api/produtos';

@Injectable({
  providedIn: "root"
})
export class ProdutoService {

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(id, data) {
    return this.http.patch(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByNome(nome) {
    return this.http.get(`${baseUrl}?nome=${nome}`);
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"]
    });
  }

}
