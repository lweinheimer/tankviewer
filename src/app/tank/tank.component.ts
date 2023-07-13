
import { Component } from '@angular/core';

@Component({
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.css']
})
export class TankComponent {
  public level = 0;

  update(event: number) {
    this.level = event;
  }
}
