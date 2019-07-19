import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// llama a la función de custom.ts
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // necesito poder navegar desde el Router
  constructor( public router: Router ) { }

  ngOnInit() {
    init_plugins();
  }

  ingresar() {

    this.router.navigate([ '/dashboard' ]);
  }

}
