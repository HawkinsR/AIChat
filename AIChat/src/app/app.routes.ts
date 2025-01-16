import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { passwordGuard } from './password.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'chat',
    component: ChatComponent,
    title: 'Chat',
    canActivate: [passwordGuard],
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'Home',
  },
];
