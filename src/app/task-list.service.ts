import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private taskListId: string = '';
  private userId: string = '';
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  setTaskListId(taskListId: string, userId: string): void {
    this.taskListId = taskListId;
    this.userId = userId;

    const stored = localStorage.getItem(`tasks_${taskListId}`);
    const tasks = stored ? JSON.parse(stored) : [];
    this.setTasks(tasks);
  }

  setTasks(tasks: Task[]): void {
    this.tasksSubject.next([...tasks]);
  }

  addTask(task: Task): void {
    const current = [...this.tasksSubject.getValue(), task];
    this.setTasks(current);
    this.saveToLocalStorage(current);
  }

  updateTask(updatedTask: Task): void {
    const current = this.tasksSubject.getValue().map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.setTasks(current);
    this.saveToLocalStorage(current);
  }

  deleteTask(taskId: string): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('tasks_')) {
        const taskListId = key.replace('tasks_', ''); 
        const tasks: Task[] = JSON.parse(localStorage.getItem(key) || '[]');
        
        const updatedTasks = tasks.filter(task => task.id !== taskId);
  
        if (tasks.length !== updatedTasks.length) {
          localStorage.setItem(key, JSON.stringify(updatedTasks));
          break; 
        }
      }
    }
  }

  
  
  

  private saveToLocalStorage(tasks: Task[]): void {
    localStorage.setItem(`tasks_${this.taskListId}`, JSON.stringify(tasks));
  }
}
