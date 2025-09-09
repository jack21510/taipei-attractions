import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Attraction } from '../../../core/models/attraction.model';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [ NgIf, NgFor]
})
export class CardComponent {
  @Input() item!: Attraction;
  @Input() selected = false;
  @Input() isFav = false;
  @Input() isEdit = false;

  @Output() toggle = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<Attraction>();

  onToggleChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggle.emit(checked);
  }

  onToggleEdit(event: Event) {
    event.stopPropagation();
    this.edit.emit(this.item);
  }
}
