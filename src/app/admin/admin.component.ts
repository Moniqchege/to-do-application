import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';
import { User } from '../user.model';
import { TaskListService } from '../task-list.service';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ModalPopupComponent, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  allTasks: Task[] = [];
  groupedTasks: { [ownerId: string]: { [taskListId: string]: Task[] } } = {};
  currentUser: User | null = null;
  selectedTask: Task = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'To Do',
    ownerId: '',
    taskListId: ''
  };
  selectedIndex: number | null = null;
  showEditModal: boolean = false;

  constructor(private taskListService: TaskListService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }

    this.refreshTasks();
  }

  refreshTasks(): void {
    this.allTasks = [];
    this.groupedTasks = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('tasks_')) {
        const taskListId = key.replace('tasks_', '');
        const tasks = JSON.parse(localStorage.getItem(key) || '[]');

        tasks.forEach((task: Task) => {
          const ownerId = task.ownerId;
          if (!this.groupedTasks[ownerId]) {
            this.groupedTasks[ownerId] = {};
          }
          if (!this.groupedTasks[ownerId][taskListId]) {
            this.groupedTasks[ownerId][taskListId] = [];
          }
          this.groupedTasks[ownerId][taskListId].push(task);
          this.allTasks.push(task);
        });
      }
    }
  }

  updateTask(): void {
    const tasks = this.getTasksFromStorage(this.selectedTask.taskListId);
    const taskIndex = tasks.findIndex(t => t.id === this.selectedTask.id);

    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...this.selectedTask };
      this.saveTasksToStorage(this.selectedTask.taskListId, tasks);
      this.closeModal();
    }
  }

  groupTasks(tasks: Task[]): void {
    this.groupedTasks = {};
    tasks.forEach(task => {
      const ownerId = task.ownerId;
      if (!this.groupedTasks[ownerId]) {
        this.groupedTasks[ownerId] = {};
      }
      if (!this.groupedTasks[ownerId][task.taskListId]) {
        this.groupedTasks[ownerId][task.taskListId] = [];
      }
      this.groupedTasks[ownerId][task.taskListId].push(task);
    });
  }

  openEditModal(task: Task, ownerId: string, taskListId: string): void {
    this.selectedTask = { ...task };
    this.selectedIndex = this.allTasks.findIndex(t => t.id === task.id);
    this.showEditModal = true;
  }

  closeModal(): void {
    this.selectedIndex = null;
    this.showEditModal = false;
  }

  saveEditedTask(updatedTask: Task): void {
    const taskListId = this.selectedTask.taskListId;
    const tasks = JSON.parse(localStorage.getItem(`tasks_${taskListId}`) || '[]');
    const taskIndex = tasks.findIndex((t: Task) => t.id === updatedTask.id);

    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...updatedTask };
      localStorage.setItem(`tasks_${taskListId}`, JSON.stringify(tasks));
      this.refreshTasks();
      this.closeModal();
    }
  }

  deleteTask(task: Task): void {
    const taskListId = task.taskListId;
    const tasks = JSON.parse(localStorage.getItem(`tasks_${taskListId}`) || '[]');
    const updatedTasks = tasks.filter((t: Task) => t.id !== task.id);
    localStorage.setItem(`tasks_${taskListId}`, JSON.stringify(updatedTasks));
    this.refreshTasks();
  }

  archiveTask(ownerId: string, listId: string, taskId: string): void {
    const tasks = this.getTasksFromStorage(listId);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
  
    if (taskIndex !== -1) {
      tasks[taskIndex].status = 'Archived';
      this.saveTasksToStorage(listId, tasks);
      console.log(`Task ${taskId} archived successfully.`);
    }
  }
  

  updateTaskStatus(task: Task, newStatus: 'To Do' | 'In Progress' | 'Completed' | 'Archived'): void {
    task.status = newStatus;
    const taskListId = task.taskListId;
    const tasks = JSON.parse(localStorage.getItem(`tasks_${taskListId}`) || '[]');
    const updatedTasks = tasks.map((t: Task) => t.id === task.id ? task : t);
    localStorage.setItem(`tasks_${taskListId}`, JSON.stringify(updatedTasks));
    this.refreshTasks();
  }

  getTasksFromStorage(taskListId: string): Task[] {
    return JSON.parse(localStorage.getItem(`tasks_${taskListId}`) || '[]');
  }

  saveTasksToStorage(taskListId: string, tasks: Task[]): void {
    localStorage.setItem(`tasks_${taskListId}`, JSON.stringify(tasks));
    console.log(`Tasks for taskListId ${taskListId} updated in localStorage`);
  }
}
