import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return [...this.tasks];
  }

  addTask(task: Task): void {
    this.tasks.push({ ...task });
  }

  updateTask(index: number, updatedTask: Task): void {
    this.tasks[index] = updatedTask;
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}
