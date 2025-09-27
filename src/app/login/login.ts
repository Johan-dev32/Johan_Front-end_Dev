import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  usuario: string = '';
  clave: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  Ingresar() {
    if (this.usuario === 'tamarajohan10@gmail.com' && this.clave === '12345678') {
      this.router.navigateByUrl('/dashboard', {
        state: {
          usuario: {
            id: 1,
            nombre: 'Johan Tamara',
            avatar: 'https://tse1.mm.bing.net/th/id/OIP.O7C6zj74BSyiIP3YjfsVRAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
            email: this.usuario
          }
        }
      });
    } else {
      this.errorMessage = 'Por favor ingrese usuario y contraseña';
    }
  }
}