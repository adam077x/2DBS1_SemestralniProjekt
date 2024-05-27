import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../services/user/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    email: null,
    password: null,
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if(!this.loginForm.value.email || !this.loginForm.value.password) return console.error('Email a heslo musí být vyplněny');

    this.authService.prihlasit(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (response) => {
        this.router.navigate(['/reports'])
      },
      error: (err) => console.error('Login failed', err)
    });
  }
}
