import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import{Todo} from '../_interface/todo';
import{EventPing} from '../_interface/eventping';
import {DataService} from '../_service/data.service';
import{Subscription} from 'rxjs';
import{DragulaService} from 'ng2-dragula';




@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit, OnDestroy
{

  public todoShow: boolean;
  public doneShow: boolean;

  public todos: Todo[];
  public todosdone: Todo[];

  public subs = new Subscription();

  constructor(public _dataService: DataService, 
              public _DragulaService:DragulaService) 
  { 
    this.todoShow = true;
    this.doneShow = true;
    this.todos =[];
    this.todosdone=[];
    this.LoadData();

    this._DragulaService.createGroup('todos',{
      removeOnSpill:true
    });
      
    this.subs.add(this._DragulaService.dropModel('todos')
      .subscribe(({name,el,targetModel,sourceModel,item})=> {
        
        targetModel.forEach((todo: Todo, index)=> {

          todo.position = index;
  
          this._dataService.puttodo(todo).subscribe((data: Todo) => 
              {
          
  
            }, error => 
              {
                console.log(error)
                console.log('Error in changing Position number ')
              });
                })
      })
    )
  }
  
  ngOnInit() {}

  ngOnDestroy()
  {
    this.subs.unsubscribe();
  }




    public LoadData(): void
    {
      this.todos = [];
      this.todosdone = [];
      this._dataService.gettodo().subscribe((data: Todo[]) => 
      {
       data.forEach((todo: Todo)=> {
         if (todo.status === true)
         {
           this.todosdone.push(todo);
         }
         else
         {
           this.todos.push(todo);
         }
       })
       this.todos.forEach(this.ConvertStringToBool);
       this.todos.sort((obj1, obj2) => {
         return obj1.position - obj2.position;
       })
;}, error => 
      {
       console.log(error)
      })

      
    }

    public create(event: Todo): void 
    {
      event.position = this.todos.length + 1;
      this._dataService.posttodo(event).subscribe((data: Todo) => 
      {
        this.todos.push(data);

      }, error => 
      {
       console.log(error)
      })

    }


    public update(event: EventPing): void 
    { 
      if ('check' === event.label)
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

    
    public ConvertStringToBool(element,index,array)
    {
      
      if(element.status == "false")
      {
        element.status = false;
        console.log('False')
      }
      else if (element.status == "true")
      {
        element.status = true;
        console.log('True')
      }
    }

    
}
