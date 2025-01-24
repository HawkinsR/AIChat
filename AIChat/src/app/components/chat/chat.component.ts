import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { OpenAI } from 'openai';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [ CommonModule, FormsModule ],
})

export class ChatComponent {
  title = 'ChatGPT';
  chatConversation: Array<any> = [];
  messages: Array<any> = [];
  response!: any | undefined;
  promptText = '';
  promptPw = '';

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

  checkResponse() {
    this.pushChatContent(this.promptText,  'user', 0);
    if (this.promptPw != '250121AIUpskill') {
      this.showToast();
      this.promptText = '';
      return;
    }
    this.removeToast();
    this.invokeGPT();
  }

  pushChatContent(content: string, cssClass: string, rT: number) {
    const chatToPush: any = { response: content, cssClass: cssClass, responseTime: rT};
    this.chatConversation.push(chatToPush);
  }

  getText(data: string) {
    return data.split('\n').filter(f => f.length > 0);
  }

  async invokeGPT() {
    if (this.promptText.length < 2)
      return;
    try {
      var responseTS = Date.now();
      this.response = undefined;
      this.messages.push({"role": "user", "content": this.promptText});
      let openai = new OpenAI({apiKey: environment.apiKey, dangerouslyAllowBrowser: true});
      let requestData = {
        model: 'gpt-4o',
        messages: this.messages,
        temperature: 1,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stream: false
      };
      this.promptText = '';
      let apiResponse =  await openai.chat.completions.create(requestData);
      this.response = apiResponse;
      
      var responseTF = Date.now();
      var responseTime = responseTF - responseTS;
      
      this.pushChatContent(this.response.choices[0].message.content.trim(), 'bot', responseTime);
    }
    catch (error: any) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
      }
      else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }
  }

  showToast() {
    this.toastService.add("Password Incorrect");
  }

  removeToast() {
    this.toastService.remove();
  }
}
