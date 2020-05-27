import { Injectable, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Produto } from "./produto.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ProductService implements OnInit {
  private collection: AngularFirestoreCollection<Product>;

  constructor(
    private snackBar: MatSnackBar,
    private db: AngularFirestore) {
    this.collection = db.collection<Product>('products');
  }

  ngOnInit() {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"]
    });
  }

  createProduct(product: Product) {
      return this.collection.add(product);
  }

  updateProduct(id: string, data: any) {
    return this.collection.doc(id).set(data);
  }

  getAll() {
    return this.db.collection<Product>('products').snapshotChanges();
  }

  getById(key: string): Observable<any> {
    return this.collection.doc(key).get();
  }

  delete(key) {
    this.collection.doc(key).delete();
  }

  generateId() {

    // let max2 = this.db.collection<Product>('products', ref => ref.orderBy('id', 'desc').limit(1))
    //    .snapshotChanges()
    //    .pipe(flatMap(products => products));

    const max = this.db.collection<Product>('products', ref => ref.orderBy('id', 'desc').limit(1)).valueChanges();

    //       this.valor = this.max;
    //       return this.max;
    // });
    // max.snapshotChanges().forEach(actions => {
    //   console.log(actions);
    // })

//    return this.db.createId();
//    return this.max;
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
