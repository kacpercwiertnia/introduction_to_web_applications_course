import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-topic-selector',
  templateUrl: './topic-selector.component.html',
  styleUrls: ['./topic-selector.component.css']
})
export class TopicSelectorComponent {
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() contents: string = "";
  @Input() index: number = 0;
  @Output() notify: EventEmitter<number> = new EventEmitter<number>();

  onClick(): void{
    this.notify.emit(this.index)
  }
}
