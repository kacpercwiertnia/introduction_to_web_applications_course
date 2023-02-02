import { Component } from '@angular/core';
import TopicsJson from '../../assets/topics.json';
import { ITopic } from '../model/itopic';
import { ITopics } from '../model/itopics';

@Component({
  selector: 'app-topic-display',
  templateUrl: './topic-display.component.html',
  styleUrls: ['./topic-display.component.css']
})

export class TopicDisplayComponent {
  topics: ITopics = TopicsJson;
  topicss: Array<ITopic> = this.topics.topics;
  title: string = "";
  contents: string = "";

  onNotifyClicked(index: number): void{
    this.title = this.topicss[index].title;
    this.contents = this.topicss[index].contents;
  }
}
