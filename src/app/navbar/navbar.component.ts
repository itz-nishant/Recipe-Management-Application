import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  userName: string = '';

  constructor(
    private authService: AuthService,
    private mainService: MainService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.userName = user?.firstName || 'Unknown';

    this.items = [
      {
        label: this.userName,
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
              this.authService.logout();
              this.router.navigate(['/login']);
            }
          }
        ]
      },
    ];
  }
}

