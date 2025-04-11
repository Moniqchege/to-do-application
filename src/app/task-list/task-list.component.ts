import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ModalPopupComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] = [];
  selectedTask: Task = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: '',
    completed: false
  };
  selectedIndex: number | null = null;

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
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

  saveEditedTask(index: number, updatedTask: Task): void {
    this.taskService.updateTask(index, updatedTask);
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(index: number): void {
    this.taskService.deleteTask(index);
    this.tasks = this.taskService.getTasks();
  }

  markInProgress(index: number): void {
    this.tasks[index].status = 'In Progress';
    this.taskService.updateTaskStatus(index, 'In Progress');
  }
  
  markCompleted(index: number): void {
    this.tasks[index].status = 'Completed';
    this.taskService.updateTaskStatus(index, 'Completed');
  }
  
}
