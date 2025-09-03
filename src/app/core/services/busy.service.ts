import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";


@Injectable({providedIn: 'root'})


export class BusyService {
  busyRequestCount = 0;

  constructor(
    private spinnerService: NgxSpinnerService,
  ){}

  busy() {
    this.busyRequestCount++;
    this.spinnerService;
    this.spinnerService.show(undefined,
      {
        type: 'ball-scale-multiple',
        bdColor: 'rgba(73, 71, 71, 0.6)',
        color: "#fff",
        size: 'medium',
      }
    )
  }

  idle() {
    this.busyRequestCount--;
    if(this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }



}
