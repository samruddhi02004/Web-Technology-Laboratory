import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  onSave(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    mobile: string,
    dob: string,
    gender: string,
    address: string,
    city: string,
    state: string,
    country: string,
    pincode: string,
    occupation: string,
    password: string,
    confirmPassword: string
  ): void {
    if (!firstName.trim()) {
      alert('Please enter first name');
      return;
    }

    if (!lastName.trim()) {
      alert('Please enter last name');
      return;
    }

    if (!username.trim()) {
      alert('Please enter username');
      return;
    }

    if (!email.trim()) {
      alert('Please enter email');
      return;
    }

    if (!mobile.trim()) {
      alert('Please enter mobile');
      return;
    }

    if (!dob.trim()) {
      alert('Please enter date of birth');
      return;
    }

    if (!gender.trim()) {
      alert('Please enter gender');
      return;
    }

    if (!address.trim()) {
      alert('Please enter address');
      return;
    }

    if (!city.trim()) {
      alert('Please enter city');
      return;
    }

    if (!state.trim()) {
      alert('Please enter state');
      return;
    }

    if (!country.trim()) {
      alert('Please enter country');
      return;
    }

    if (!pincode.trim()) {
      alert('Please enter pincode');
      return;
    }

    if (!occupation.trim()) {
      alert('Please enter occupation');
      return;
    }

    if (!password.trim()) {
      alert('Please enter password');
      return;
    }

    if (!confirmPassword.trim()) {
      alert('Please enter confirm password');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password and confirm password must match');
      return;
    }

    alert('Registration successful');
  }
}
