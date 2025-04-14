import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { ActivatedRoute } from '@angular/router';

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
  };
  selectedIndex: number | null = null;
  taskListId: string = '';

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.taskListId = localStorage.getItem('taskListId') || '';

    if (this.taskListId) {
      this.taskService.getTasks(this.taskListId).subscribe((tasks: Task[]) => {
        if (tasks && tasks.length > 0) {
          this.tasks = tasks;
        } else {
          console.log('No tasks found for this task list.');
        }
      });
    } else {
      console.error('Task list ID is missing.');
    }
  }

  openEdit(index: number): void {
    this.selectedTask = { ...this.tasks[index] };
    this.selectedIndex = index;
  }

  closeModal(): void {
    this.selectedIndex = null;
  }

  saveEditedTask(index: number, updatedTask: Task): void {
    const taskListId = this.taskListId;
    const existingTask = this.tasks[index];
    const taskId = existingTask?.id;

    if (!taskListId || !taskId) {
      console.error('Missing taskListId or taskId');
      return;
    }

    const updatedTaskWithId = { ...updatedTask, id: taskId };
    this.taskService.updateTask(taskListId, taskId, updatedTaskWithId).subscribe(() => {
      this.tasks[index] = updatedTaskWithId;
      this.closeModal();
    });
  }

  deleteTask(index: number): void {
    const taskId = this.tasks[index].id;
    const taskListId = this.taskListId;

    if (taskListId) {
      this.taskService.deleteTask(taskListId, taskId).subscribe({
        next: () => {
          this.tasks.splice(index, 1);
        },
        error: (err) => {
          console.error('Error deleting task:', err);
        }
      });
    } else {
      console.error('Task list ID is missing.');
    }
  }

  markInProgress(index: number): void {
    const taskId = this.tasks[index].id;
    const taskListId = this.taskListId;

    if (taskListId) {
      this.taskService.updateTaskStatus(taskListId, taskId, 'In Progress').subscribe({
        next: () => {
          this.tasks[index].status = 'In Progress';
          console.log('Task status updated to In Progress.');
        },
        error: (err) => {
          console.error('Error updating task status:', err);
          this.tasks[index].status = 'To Do';
        }
      });
    } else {
      console.error('Task list ID is missing.');
    }
  }

  markCompleted(index: number): void {
    const taskId = this.tasks[index].id;
    const taskListId = this.taskListId;

    if (taskListId) {
      this.taskService.updateTaskStatus(taskListId, taskId, 'Completed').subscribe({
        next: () => {
          this.tasks[index].status = 'Completed';
          console.log('Task status updated to Completed.');
        },
        error: (err) => {
          console.error('Error updating task status:', err);
          this.tasks[index].status = 'To Do';
        }
      });
    } else {
      console.error('Task list ID is missing.');
    }
  }
}
