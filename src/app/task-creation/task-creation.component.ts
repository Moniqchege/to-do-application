import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.css']
})
export class TaskCreationComponent {
  taskForm: FormGroup;
  taskId: string | null = null; 
  pageTitle = 'Create Task';

  taskListId: string = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['Medium', Validators.required],
      attachment: [null]
    });

    this.taskListId = localStorage.getItem('taskListId') || '';  

    const taskIdParam = this.route.snapshot.paramMap.get('id');
    if (taskIdParam) {
      this.taskId = taskIdParam;

      this.taskService.getTask(this.taskListId, this.taskId).subscribe({
        next: (task) => {
          if (task) {
            this.pageTitle = 'Edit Task';
            this.taskForm.patchValue(task);
          }
        },
        error: (err) => {
          console.error('Error fetching task:', err);
        }
      });
    }
  }

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.taskForm.patchValue({
        attachment: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.taskForm.invalid || !this.taskListId) return;

    const taskData: Task = this.taskForm.value;

    if (this.taskId) {
      this.taskService.updateTask(this.taskListId, this.taskId, taskData).subscribe({
        next: () => {
          this.router.navigate(['/task-list']);
        },
        error: (err) => {
          console.error('Error updating task:', err);
        }
      });
    } else {
      this.taskService.addTask(this.taskListId, taskData).subscribe({
        next: () => {
          this.router.navigate(['/task-list']);
        },
        error: (err) => {
          console.error('Error creating task:', err);
        }
      });
    }
  }
}
