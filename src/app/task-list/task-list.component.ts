import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';

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
    ownerId: ''
  };
  selectedIndex: number | null = null;
  taskListId: string = '';

  constructor() {}

  ngOnInit(): void {
    this.taskListId = localStorage.getItem('taskListId') || '';

    if (this.taskListId) {
      const storedTaskList = localStorage.getItem(this.taskListId);
      if (storedTaskList) {
        this.tasks = JSON.parse(storedTaskList);
      } else {
        console.log('No tasks found for this task list.');
      }
    } else {
      console.error('Task list ID is missing.');
    }
  }

  openEdit(index: number): void {
    this.selectedTask = { ...this.tasks[index] }; 
    this.selectedIndex = index;
    document.getElementById('modal')?.classList.add('open'); 
  }

  closeModal(): void {
    this.selectedIndex = null;
    document.getElementById('modal')?.classList.remove('open'); 
  }

  saveEditedTask(index: number, updatedTask: Task): void {
    const taskId = this.tasks[index].id;

    if (!taskId) {
      console.error('Missing taskId');
      return;
    }

    const updatedTaskWithId = { ...updatedTask, id: taskId };
    this.tasks[index] = updatedTaskWithId;
    localStorage.setItem(this.taskListId, JSON.stringify(this.tasks));
    this.closeModal();
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    localStorage.setItem(this.taskListId, JSON.stringify(this.tasks));
  }

  markInProgress(index: number): void {
    this.tasks[index].status = 'In Progress';
    localStorage.setItem(this.taskListId, JSON.stringify(this.tasks));
    console.log('Task status updated to In Progress.');
  }

  markCompleted(index: number): void {
    this.tasks[index].status = 'Completed';
    localStorage.setItem(this.taskListId, JSON.stringify(this.tasks));
    console.log('Task status updated to Completed.');
  }
}
