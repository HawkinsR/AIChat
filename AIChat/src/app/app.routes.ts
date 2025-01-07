import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
{
  path: 'chat',
  component: ChatComponent,
  title: 'Chat',
},
];

