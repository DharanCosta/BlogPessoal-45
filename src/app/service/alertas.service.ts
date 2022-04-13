import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal'
import { mergeScan } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(
    private bsModalService: BsModalService
  ) { }

  private showAlert(message:string, tipo:string){
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertComponent)
    bsModalRef.content.tipo = tipo
    bsModalRef.content.message = message
  }

  showAlertDanger(message:string){
    this.showAlert(message,'danger')
  }
  showAlertSuccess(message:string){
    this.showAlert(message,'success')
  }

  showAlertInfo(message: string){
    this.showAlert(message,'info')
  }
}
