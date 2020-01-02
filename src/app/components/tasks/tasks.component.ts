import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {


constructor(private taskService: TaskService){}
  
myTask : Task = {
 label: "",
 completed: false
}

searchText = "";

showForm : boolean = false;
condition : boolean = false;

  tasks : Task[] = [];
  resultTasks : Task[] = [];

  ngOnInit() {
    this.getTasks();
  }


  getTasks(){
    this.taskService.findAll().subscribe(tasks => this.resultTasks = this.tasks = tasks);
  }

  deleteTask(id){
    this.taskService.delete(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id != id)
    }
    )
  }

  persistTask(){
    this.taskService.persist(this.myTask).subscribe((task) =>{
    this.tasks = [task, ...this.tasks];
    this.resetTask()
    this.showForm = false;
  }
    )
  }

  resetTask(){
   this.myTask = {
     label : "",
     completed : false
   }
  }

  showFormFunction(){
    this.showForm = true;
  }

  toggleCompleted(task){
    this.taskService.completed(task.id, task.completed).subscribe(() => 
    {
      task.completed = !task.completed;
      this.resetTask();
    }
    )
  }

  editTask(task){
    this.myTask = task;
    this.condition = true;
  }

  updateTask(){
      this.taskService.update(this.myTask).subscribe( task => {
      this.condition = false;
      //this.getTasks();
    }
      )
  }

  searchTask(){
    //this.searchText = "0";
    //if(!this.searchText){this.getTasks;}
    this.resultTasks = this.tasks.filter((task)=> task.label.toLowerCase().includes(this.searchText.toLowerCase()));

  }

}
