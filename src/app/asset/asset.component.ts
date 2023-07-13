import { Component } from '@angular/core';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent {
  public assets = ['Tank1', 'Tank2', 'Tank3'];
}
