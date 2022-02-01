import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  //card: string = '';
  game!: Game;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.game = new Game();
    
  }

  takeCard(){
    if(!this.pickCardAnimation) {
    this.currentCard = String(this.game.stack.pop());
   console.log(this.currentCard);
   this.pickCardAnimation = true;
   console.log('New card:' + this.currentCard);
   console.log('Game is', this.game);



   setTimeout(()=>{
    this.game.playedCards.push(this.currentCard);
    this.pickCardAnimation = false;

   },1000);
  }
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
  

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
    });
  }
}


