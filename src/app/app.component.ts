import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ModalComponent } from './core/components/modal/modal.component';
import { MessageService } from './core/services/message.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ModalComponent, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    public modal: MessageService
  ) {}


  title = 'taipei-attractions';


}
