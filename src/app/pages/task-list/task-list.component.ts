import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) {
    this.tasks = this.taskService.getTasks();
  }

  editTask(index: number): void {
    this.router.navigate(['/edit', index]);
  }

  deleteTask(index: number): void {
    this.taskService.deleteTask(index);
    this.tasks = this.taskService.getTasks();
  }
}
