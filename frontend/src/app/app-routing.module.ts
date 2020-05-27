// import { ProdutoDeleteComponent } from './components/produto/Produto-delete/product-delete.component';
// import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./views/home/home.component";
import { ProdutoCrudComponent } from "./views/produto-crud/produto-crud.component";
import { ProdutoFormComponent } from './components/produto/produto-form/produto-form.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "produtos",
    component: ProdutoCrudComponent
  },
  {
    path: "produtos/create",
    component: ProdutoFormComponent
  },
  {
    path: "produtos/update/:id",
    component: ProdutoFormComponent
  },
  // {
  //   path: "produtos/delete/:id",
  //   component: ProdutoDeleteComponent
  // },
  // {
  //   path: "produtos/update/:id",
  //   component: ProdutoUpdateComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
