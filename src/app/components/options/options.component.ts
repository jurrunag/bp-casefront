import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  @Output() editarClicked = new EventEmitter<void>();
  @Output() eliminarClicked = new EventEmitter<void>();
}
