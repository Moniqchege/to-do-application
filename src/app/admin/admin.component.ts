import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';
import { User } from '../user.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  allTasks: Task[] = [];
  currentUser: User | null = null;

  groupedTasks: { 
    [ownerId: string]: { 
      [taskListId: string]: Task[] 
    } 
  } = {};

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('tasks_')) {
        const taskData = localStorage.getItem(key);
        if (taskData) {
          const tasks: Task[] = JSON.parse(taskData);
          this.allTasks.push(...tasks);
        }
      }
    }

    this.groupTasksByOwnerAndList();
  }

  groupTasksByOwnerAndList(): void {
    this.groupedTasks = {};

    for (const task of this.allTasks) {
      const owner = task.ownerId || 'Unknown';
      const list = task.taskList || 'Default';

      if (!this.groupedTasks[owner]) {
        this.groupedTasks[owner] = {};
      }

      if (!this.groupedTasks[owner][list]) {
        this.groupedTasks[owner][list] = [];
      }

      this.groupedTasks[owner][list].push(task);
    }
  }

  archiveTask(task: Task): void {
    task.status = 'Archived';
    this.saveTask(task);
    this.groupTasksByOwnerAndList(); // Refresh grouping
  }

  saveTask(updatedTask: Task): void {
    const taskListId = updatedTask.taskList;
    if (taskListId) {
      const key = `tasks_${taskListId}`;
      const storedTasks = JSON.parse(localStorage.getItem(key) || '[]');
      const updatedTasks = storedTasks.map((task: Task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      localStorage.setItem(key, JSON.stringify(updatedTasks));
    }
  }
}
