import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MessageService, ModalState } from '../../services/message.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  constructor(
    private modal: MessageService
  ) {}
  /** Host 會把狀態丟進來 */
  @Input() state: ModalState | null = null;

  onClose() {
     this.modal.close();
    }

}
