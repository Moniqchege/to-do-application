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
  taskId: string | null = null;  // Use taskId instead of taskIndex
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

    const taskListIdParam = this.route.snapshot.paramMap.get('taskListId');
    const taskIdParam = this.route.snapshot.paramMap.get('id');

    if (taskListIdParam) {
      this.taskListId = taskListIdParam;

      if (taskIdParam) {
        this.taskId = taskIdParam;

        // Fetch the task to edit
        this.taskService.getTask(this.taskListId, this.taskId).subscribe({
          next: (task) => {
            if (task) {
              this.pageTitle = 'Edit Task';
              this.taskForm.patchValue(task); // Populate the form with task data
            }
          },
          error: (err) => {
            console.error('Error fetching task:', err);
            // Optionally show a user-friendly error message
          }
        });
      }
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
    if (this.taskForm.invalid) return;

    const taskData: Task = this.taskForm.value;

    if (this.taskId) {
      // If we have a taskId, update the task
      this.taskService.updateTask(this.taskListId, this.taskId, taskData).subscribe({
        next: () => {
          this.router.navigate(['/task-list']);
        },
        error: (err) => {
          console.error('Error updating task:', err);
          // Optionally show an error message to the user
        }
      });
    } else {
      // Create a new task
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
