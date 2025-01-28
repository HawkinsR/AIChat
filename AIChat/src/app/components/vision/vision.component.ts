import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { OpenAI } from 'openai';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { ToastService } from './../../services/toast.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-vision',
  standalone: true,
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.css'],
  imports: [ CommonModule, FormsModule, NgOptimizedImage ],
})

export class VisionComponent {
  title = 'ChatGPT';
  chatConversation: Array<any> = [];
  messages: Array<any> = [
    {
      role: "user",
      content: [
        { type: "text", text: "What's in this image?" },
        {
          type: "image_url",
          image_url: {
            "url": "",
            "detail":"low"
          },
        },
      ],
    },
  ];
  response!: any | undefined;
  promptText = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/USA_New_Hampshire_relief_location_map.svg/200px-USA_New_Hampshire_relief_location_map.svg.png";
  promptPw = '';

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

  checkResponse() {
    this.pushChatContent(this.promptText,  'user', 0);
    if (this.promptPw != '250121AIUpskill') {
      this.showToast();
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
      this.messages[0].content[1].image_url.url = this.promptText;
      let openai = new OpenAI({apiKey: environment.apiKey, dangerouslyAllowBrowser: true});
      let requestData = {
        model: 'gpt-4o',
        messages: this.messages,
        temperature: 1,
        max_tokens: 2500,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stream: false
      };
      let apiResponse =  await openai.chat.completions.create(requestData);
      this.response = apiResponse;

      var responseTF = Date.now();
      var responseTime = responseTF - responseTS;

      this.pushChatContent(this.response.choices[0].message.content.trim(), 'bot', responseTime);
    }
    catch (error: any) {
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
