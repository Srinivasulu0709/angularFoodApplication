import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  isCollapsed = false;
  activeRoute: string = '';

  navItems = [
    { label: 'Dashboard', route: '/dashboard', icon: 'fas fa-tachometer-alt' },
    { label: 'Profile', route: '/profile', icon: 'fas fa-user' },
    { label: 'Settings', route: '/settings', icon: 'fas fa-cog' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.activeRoute = this.router.url;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = this.router.url;
      }
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

}


