import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../backend.service';
@Component({
  selector: 'app-config-events',
  templateUrl: './config-events.component.html',
  styleUrls: ['./config-events.component.scss']
})
export class ConfigEventsComponent implements OnInit {

  configEvents$: Observable<any[]>;
  flight: any = {};
  constructor(public backendService: BackendService) { }

  ngOnInit() {
    this.configEvents$ = this.backendService.getConfigEvents();
  }
  loadFlight(event: any) {
    delete this.flight[event.id];
    this.backendService.getFlight(event.id).toPromise()
      .then(response => {
        console.log("RESPONSE", response);
        this.flight[event.id] = response;
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  }

}
