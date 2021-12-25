import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-card-dash-board',
  templateUrl: './card-dash-board.component.html',
  styleUrls: ['./card-dash-board.component.scss'],
})
export class CardDashBoardComponent implements OnInit {
  @Input() item = '';
  @Input() number = 0;
  @Input() myIcon = '';
  @Input() color = '';
  constructor(private appSateService: AppStateService) {}

  ngOnInit(): void {}
}
