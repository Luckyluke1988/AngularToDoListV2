import { Component, OnInit } from '@angular/core';
import{Todo} from '../_interface/todo';
import{EventPing} from '../_interface/eventping';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit 
{

  public todoShow: boolean;
  public doneShow: boolean;

  public todos: Todo[];
  public todosdone: Todo[];

  constructor() 
  { 
    this.todoShow = true;
    this.doneShow = true;
    this.todos =
    [
      {
        id: 0,
        label:'test',
        status: false,
        position: 1
      },

      {
        id: 1,
        label:'test 2',
        status: false,
        position: 1
      }
    ];
    
    this.todosdone=[];

  }
  
  ngOnInit() 
  {

  }
    public create(event: Todo): void 
    {
      event.position = this.todos.length + 1;
      this.todos.push(event);
    }

    public update(event: EventPing): void 
    { 
      if ('Check' === event.label)
      {
        
        if(!event.object.status)
        {
          this.todosdone.splice(this.todosdone.indexOf(event.object), 1);
          this.todos.push(event.object);
        }
        else
        {
          this.todos.splice(this.todos.indexOf(event.object), 1);
          this.todosdone.push(event.object);
        }
      }

      if ('delete' === event.label)
      {
        if(event.object.status)
        {
          this.todosdone.splice(this.todosdone.indexOf(event.object), 1);
        }
        else
        {
          this.todos.splice(this.todos.indexOf(event.object), 1);
        }
      }

    }
}
