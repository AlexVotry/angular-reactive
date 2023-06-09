import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Message} from '../model/message';
import {tap} from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  showMessages = false;

  error$: Observable<string[]>;

  constructor(public messagesServices: MessagesService) {
    console.log("created messages component")

  }

  ngOnInit() {
    this.error$ = this.messagesServices.error$
      .pipe(
        tap(() => this.showMessages = true),
      )

  }


  onClose() {
    this.showMessages = false;
  }

}
