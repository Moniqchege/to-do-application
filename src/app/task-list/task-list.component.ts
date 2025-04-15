import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';
import { TaskListService } from '../task-list.service';
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
    ownerId: '',
    taskListId: ''
  };
  selectedIndex: number | null = null;
  currentUserRole: string = '';
  taskListId: string = '';
  showModal: boolean = false;

  constructor(private taskListService: TaskListService) {}

  ngOnInit(): void {
    this.taskListId = localStorage.getItem('taskListId') || '';
    const currentUserId = localStorage.getItem('userId') || '';
    console.log('Checking IDs:', this.taskListId, currentUserId);


    if (!this.taskListId || !currentUserId) {
      console.error('Missing taskListId or userId in localStorage');
      return;
    }

    this.taskListService.setTaskListId(this.taskListId, currentUserId);

    this.taskListService.tasks$.subscribe(tasks => {
      console.log('Received tasks:', tasks);
      this.tasks = tasks;
    });
  }

  saveToStorage(): void {
    this.taskListService.setTasks(this.tasks);
  }

  addTask(newTask: Task): void {
    this.tasks.push(newTask);
    this.saveToStorage();
  }

  openEdit(index: number): void {
    this.selectedTask = { ...this.tasks[index] };
    this.selectedIndex = index;
    this.showModal = true;
  }

  closeModal(): void {
    this.selectedIndex = null;
    this.showModal = false;
  }

  saveEditedTask(index: number, updatedTask: Task): void {
    const taskId = this.tasks[index].id;

    if (!taskId) {
      console.error('Missing taskId');
      return;
    }

    this.tasks[index] = { ...updatedTask, id: taskId };
    this.saveToStorage();
    this.taskListService.updateTask(this.tasks[index]);
    this.closeModal();
  }

  deleteTask(index: number): void {
    const taskId = this.tasks[index].id;
    this.tasks.splice(index, 1);
    this.saveToStorage();
    this.taskListService.deleteTask(taskId);
  }

  markInProgress(index: number): void {
    this.tasks[index].status = 'In Progress';
    this.saveToStorage();
    this.taskListService.updateTask(this.tasks[index]);
  }

  markCompleted(index: number): void {
    this.tasks[index].status = 'Completed';
    this.saveToStorage();
    this.taskListService.updateTask(this.tasks[index]);
  }
}
