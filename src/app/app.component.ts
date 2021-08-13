import { Component,OnInit } from '@angular/core';
import { environment } from '@src/environments/environment';
import { test } from '@app/test';
// import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-front-back-course';

  constructor(){

  }

  ngOnInit() {

  }
}
