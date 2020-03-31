import { Component, OnInit } from '@angular/core';
import {Player} from '../../models/player.model';
import {PlayerService} from '../../services/player.service';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {
  public playerList: Player[];
  constructor(private playerService: PlayerService) {
    this.playerService.players$.subscribe((player) => this.playerList = player);
  }

  ngOnInit() {
  }

}
