import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  // Hier hab ich erstmal kein OnPush gemacht, müsste man paar sachen umbauen, damit das hier auch geht
})
export class MessagesComponent {
  constructor(public messageService: MessageService ) { }

  // Wenn OnInit leer ist kann die weg.
}
