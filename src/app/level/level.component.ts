
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent {
  @Output() levelChange = new EventEmitter<number>();
  public level = 0;

  update() {
    this.levelChange.emit(this.level);
  }
}
