import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetListComponent } from './asset-list/asset-list.component';  // 資産リストコンポーネントのインポート

const routes: Routes = [
  { path: '', component: AssetListComponent },  // ルートURLで資産リストを表示
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
