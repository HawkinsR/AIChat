
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { AdvancedChatComponent } from './components/advanced-chat/advanced-chat.component';
import { VisionComponent } from './components/vision/vision.component';
import { PasswordGuard } from './password.guard';

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
  },
  {
    path: 'advanced',
    component: AdvancedChatComponent,
    title: 'AdvChat',
  },
  {
    path: 'vision',
    component: VisionComponent,
    title: 'Vision',
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'Home',
  },
];
