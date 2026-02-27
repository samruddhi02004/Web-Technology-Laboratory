import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  onLogin(
    username: string,
    email: string,
    mobile: string,
    password: string
  ): void {
    const cleanUsername = username.trim();
    const cleanEmail = email.trim();
    const cleanMobile = mobile.trim();
    const cleanPassword = password.trim();

    if (!cleanUsername) {
      alert('Please enter username');
      return;
    }

    if (!cleanEmail) {
      alert('Please enter email');
      return;
    }

    if (!cleanMobile) {
      alert('Please enter mobile');
      return;
    }

    if (!cleanPassword) {
      alert('Please enter password');
      return;
    }

    alert('Login successful');
  }
}
