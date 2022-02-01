import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.game = new Game();
    console.log(this.game);
  }

  takeCard(){
    if(!this.pickCardAnimation) {
    this.currentCard = String(this.game.stack.pop());
   console.log(this.currentCard);
   this.pickCardAnimation = true;

   setTimeout(()=>{
    this.pickCardAnimation = false;

   },1500);
  }
  }
  }

