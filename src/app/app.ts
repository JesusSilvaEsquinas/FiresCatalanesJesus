import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './view/layout/header/header.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = 'Fires Catalanes';
}
