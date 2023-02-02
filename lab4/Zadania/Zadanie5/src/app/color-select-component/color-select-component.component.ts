import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-color-select-component',
  templateUrl: './color-select-component.component.html',
  styleUrls: ['./color-select-component.component.css']
})
export class ColorSelectComponentComponent {
  @Input() color: Array<string> = [];
  @Input() colorDisabled: boolean = false;
  selectedColor: string = "";
  specDisabled: boolean = false;
  @Output() notifyDisabled: EventEmitter<number> = new EventEmitter<number>();
  @Output() notifyColor: EventEmitter<number> = new EventEmitter<number>();

  setSelectedColor(index: number): void{
    this.selectedColor = this.color[index];
    this.specDisabled = true;
    this.notifyDisabled.emit(1);
    this.notifyColor.emit(index);
  }
}
