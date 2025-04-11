import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] = [];

  showEditModal = false;
  editTaskIndex: number | null = null;
  editTaskObj: Task = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: '',
    completed: false
  };

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  openEditModal(index: number): void {
    this.editTaskIndex = index;
    this.editTaskObj = { ...this.tasks[index] };
    this.showEditModal = true;
  }

  saveEdit(): void {
    if (this.editTaskIndex !== null) {
      this.taskService.updateTask(this.editTaskIndex, this.editTaskObj);
      this.tasks = this.taskService.getTasks();
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.showEditModal = false;
    this.editTaskIndex = null;
  }

  deleteTask(index: number): void {
    this.taskService.deleteTask(index);
    this.tasks = this.taskService.getTasks();
  }

  toggleCompleted(index: number): void {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.taskService.updateTask(index, this.tasks[index]);
  }
}
