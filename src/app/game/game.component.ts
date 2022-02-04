import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';


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

  constructor(private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this
    .firestore
    .collection('games')
    .valueChanges()
    .subscribe((game) =>{
      console.log('Game update', game);

    });
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

   //Reihenfolge der Spieler
   this.game.currentPlayer++;
   this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // :3 = 0 oder :4 = 1


   setTimeout(()=>{
    this.game.playedCards.push(this.currentCard);
    this.pickCardAnimation = false;

   },1000);
  }
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
  

    dialogRef.afterClosed().subscribe((name: string) => { 
      if(name && name.length > 0){ //string=Text
     this.game.players.push(name);
    }
    
    });
  }
}


