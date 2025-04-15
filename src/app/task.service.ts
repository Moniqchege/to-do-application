import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = 'taskList';

  constructor() {}

  private getTaskList(): any[] {
    const taskListId = localStorage.getItem('taskListId');
    if (!taskListId) return []; 

    const taskList = JSON.parse(localStorage.getItem(taskListId) || '[]');
    return taskList;
  }

  private saveTaskList(taskList: any[]): void {
    const taskListId = localStorage.getItem('taskListId');
    if (taskListId) {
      localStorage.setItem(taskListId, JSON.stringify(taskList));
    }
  }

  getTask(taskListId: string, taskId: string): Task | null {
    const taskList = this.getTaskList();
    return taskList.find(task => task.id === taskId) || null;
  }

  getTasks(): Task[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  addTask(taskListId: string, taskData: Task): void {
    const taskList = this.getTaskList();
    taskData.id = this.generateTaskId(); 
    taskList.push(taskData);
    this.saveTaskList(taskList);
  }

  updateTask(taskListId: string, taskId: string, updatedTask: Task): void {
    const taskList = this.getTaskList();
    const taskIndex = taskList.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      taskList[taskIndex] = { ...taskList[taskIndex], ...updatedTask }; 
      this.saveTaskList(taskList);
    }
  }

  deleteTask(taskListId: string, taskId: string): void {
    let taskList = this.getTaskList();
    taskList = taskList.filter(task => task.id !== taskId);
    this.saveTaskList(taskList);
  }

  private generateTaskId(): string {
    return Math.random().toString(36).substr(2, 9); // Simple ID generation
  }

  updateTaskStatus(taskListId: string, taskId: string, status: string): void {
    const taskList = this.getTaskList();
    const task = taskList.find(task => task.id === taskId);
    if (task) {
      task.status = status;
      this.saveTaskList(taskList);
    }
  }
  archiveTask(taskId: string): void {
    const tasks = this.getTasks();
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: 'Archived' };
      }
      return task;
    });
    this.saveTaskList(updatedTasks);
  }
}
