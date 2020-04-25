import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {Player} from "../../models/player.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.scss']
})
export class ResultatsComponent {

  playerList: Player[] = [];
  playerForm: FormGroup;
  constructor(private playerService: PlayerService, private formBuilder: FormBuilder) {
      this.playerService.setPlayersFromUrl();
      this.playerService.players$.subscribe((player) => this.playerList = player);
      this.playerForm = this.formBuilder.group({
        player: []
      });
  }

}
