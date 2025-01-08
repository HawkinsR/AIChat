import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { OpenAI } from 'openai';
import { environment } from './../../../environments/environment';
import { FormsModule } from '@angular/forms';

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

  showSpinner = false;

  constructor() { }

  ngOnInit(): void {
  }

  checkResponse() {
    this.pushChatContent(this.promptText, 'You', 'person');
    this.invokeGPT();
  }

  pushChatContent(content: string, person: string, cssClass: string) {
    const chatToPush: any = { person: person, response: content, cssClass: cssClass };
    this.chatConversation.push(chatToPush);
  }

  getText(data: string) {
    return data.split('\n').filter(f => f.length > 0);
  }

  async invokeGPT() {
    if (this.promptText.length < 2)
      return;
    try {
      this.response = undefined;
      this.messages.push({"role": "user", "content": this.promptText});
      let openai = new OpenAI({apiKey: environment.apiKey, dangerouslyAllowBrowser: true});
      let requestData = {
        model: 'gpt-4o',
        messages: this.messages,
        temperature: 0.95,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stream: false
      };
      this.promptText = '';

      let apiResponse =  await openai.chat.completions.create(requestData);

      this.showSpinner = true;

      this.response = apiResponse;

      this.showSpinner = false;

      this.pushChatContent(this.response.choices[0].message.content.trim(), 'Bot', 'bot');

      this.showSpinner = false;

    }
    catch (error: any) {
      this.showSpinner = false;

      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
      }
      else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }
  }
}
