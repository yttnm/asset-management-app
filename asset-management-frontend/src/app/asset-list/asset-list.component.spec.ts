import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';  // 追加
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetListComponent } from './asset-list.component';
import { AssetService } from '../asset.service';
import { of } from 'rxjs';

describe('AssetListComponent', () => {
  let component: AssetListComponent;
  let fixture: ComponentFixture<AssetListComponent>;
  let mockAssetService: jasmine.SpyObj<AssetService>;

  beforeEach(() => {
    mockAssetService = jasmine.createSpyObj(['getAssets']);
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule], 
      declarations: [ AssetListComponent ],
      providers: [
        { provide: AssetService, useValue: mockAssetService }
      ]
    });
    fixture = TestBed.createComponent(AssetListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get assets from the service', () => {
    mockAssetService.getAssets.and.returnValue(of([
      { id: 1, name: 'Asset 1', purchase_date: '2021-01-01', purchase_price: 1000, asset_type: 'Type 1', notes: 'Note 1' },
      { id: 2, name: 'Asset 2', purchase_date: '2021-02-01', purchase_price: 2000, asset_type: 'Type 2', notes: 'Note 2' }
    ]));
    component.ngOnInit();
    expect(component.assets.length).toBe(2);
  });
});
