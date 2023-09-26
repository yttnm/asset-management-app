import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) { }

  getAssets() {
    return this.http.get('http://localhost:5000/assets');
  }

  addAsset(assetData: any) {
    return this.http.post('http://localhost:5000/assets', assetData);
  }

  deleteAsset(id: string) {
    return this.http.delete(`http://localhost:5000/assets/${id}`);
  }
  
  updateAsset(id: string, assetData: any) {
    return this.http.put(`http://localhost:5000/assets/${id}`, assetData);
  }
  

  // 更新と削除のメソッドはこの後で追加
}
