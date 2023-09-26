import { Component, OnInit } from '@angular/core';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  
      // New fields added below
      purchase_date?: string;
      purchase_price?: number;
      asset_type?: string;
      notes?: string;
      // End of new fields

  assets: any[] = [];

  constructor(private assetService: AssetService) { }

  ngOnInit(): void {
    this.assetService.getAssets().subscribe((data: any) => {
      this.assets = data;
    });
  }

  addAsset(assetData: any) {
    this.assetService.addAsset(assetData).subscribe(() => {
      // 更新後の資産リストを取得
      this.assetService.getAssets().subscribe((data: any) => {
        this.assets = data;
      });
    });
  }

  updateAsset(asset: any) {
    // 更新処理（詳細は後で）
  }
  
  deleteAsset(id: string) {
    this.assetService.deleteAsset(id).subscribe(() => {
      // 更新後の資産リストを取得
      this.assetService.getAssets().subscribe((data: any) => {
        this.assets = data;
      });
    });
  }
  
}
