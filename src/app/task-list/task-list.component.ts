import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ModalPopupComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'To Do', 
    completed: false
  };
  selectedIndex: number | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks('your-task-list-id')  
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
  }

  openEdit(index: number): void {
    this.selectedTask = { ...this.tasks[index] };
    this.selectedIndex = index;

    const modal = document.getElementById('editModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'flex';
    }
  }

  closeModal(): void {
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  saveEditedTask = (index: number, updatedTask: Task): void => {
    const taskId = this.tasks[index].id;
    this.taskService.updateTask('your-task-list-id', taskId, updatedTask)
      .subscribe(() => {
        this.tasks[index] = updatedTask;
        this.closeModal();
      });
  };
  
  deleteTask(index: number): void {
    const taskId = this.tasks[index].id; 
    this.taskService.deleteTask('your-task-list-id', taskId) 
      .subscribe(() => {
        this.tasks.splice(index, 1);  
      });
  }

  markInProgress(index: number): void {
    const taskId = this.tasks[index].id;  
    this.tasks[index].status = 'In Progress';
    this.taskService.updateTaskStatus('your-task-list-id', taskId, 'In Progress')
      .subscribe(() => {
        this.tasks[index].status = 'In Progress'; 
      });
  }

  markCompleted(index: number): void {
    const taskId = this.tasks[index].id;  
    this.tasks[index].status = 'Completed';
    this.taskService.updateTaskStatus('your-task-list-id', taskId, 'Completed')
      .subscribe(() => {
        this.tasks[index].status = 'Completed'; 
      });
  }

}
