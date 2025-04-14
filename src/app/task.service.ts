import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = `${environment.apiUrl}/task-lists`;

  constructor(private http: HttpClient) {}

  getTask(taskListId: string, taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${taskListId}/tasks/${taskId}`);
  }

  getTasks(taskListId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/${taskListId}/tasks`);
  }

  addTask(taskListId: string, taskData: Task) {
    return this.http.post(`http://localhost:8080/task-lists/${taskListId}/tasks`, taskData);
  }  

  updateTask(taskListId: string, taskId: string, updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${taskListId}/tasks/${taskId}`, updatedTask);
  }

  deleteTask(taskListId: string, taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${taskListId}/tasks/${taskId}`);
  }

  updateTaskStatus(taskListId: string, taskId: string, status: string): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${taskListId}/tasks/${taskId}`, { status });
  }
}
