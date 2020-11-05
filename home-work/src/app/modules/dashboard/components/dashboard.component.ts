import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { MyMessage } from '../models/MyMessage'
import {FormControl,Validators} from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _messageService: MessageService) { }

  messages: MyMessage[];
  ngOnInit(): void {
    this._messageService.get().subscribe((data) => {
      this.messages = data;
      console.log(data);
    });
  }
  MSG = new FormControl('', [
    Validators.required
  ]);
  EditMessageControl = new FormControl('', [
    Validators.required
  ]);
  CreateMessage() {
    if(this.MSG.valid) {
      this._messageService.post(this.MSG.value).subscribe(() => {
        this._messageService.get().subscribe((data) => {
          this.messages = data;
          this.MSG.setValue('');
        });
      });
    }
  }
  DeleteMessage(id: number) {
    this._messageService.delete(id).subscribe(() => {
      this._messageService.get().subscribe((data) => {
        this.messages = data;
      });
    });
  }
  EditMessage(idt: number) {
    if(this.EditMessageControl.valid)
    {
      let message: MyMessage = {
        id: idt,
        msg: this.EditMessageControl.value
      }     
      this._messageService.put(message).subscribe(() => {
        this._messageService.get().subscribe((data) => {
          this.messages = data;
          this.EditMessageControl.setValue('');
        });
      })
    }
  }
}
