
import { Component } from '@angular/core';
import { DatahubService } from '../datahub.service';

@Component({
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.css']
})

export class TankComponent {
  public level = 0;

  constructor(private datahub: DatahubService) {
    datahub.getData('TankID').subscribe(data => {
      this.level = Math.min(parseFloat(data[0].value),68);
    });
  }
}
