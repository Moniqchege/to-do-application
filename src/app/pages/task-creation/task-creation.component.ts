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
  taskIndex: number | null = null;
  pageTitle = 'Create Task';

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

    const indexParam = this.route.snapshot.paramMap.get('id');
    if (indexParam !== null) {
      this.taskIndex = +indexParam;
      const taskToEdit = this.taskService.getTasks()[this.taskIndex];
      if (taskToEdit) {
        this.pageTitle = 'Edit Task';
        this.taskForm.patchValue(taskToEdit);
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

    if (this.taskIndex !== null) {
      this.taskService.updateTask(this.taskIndex, taskData);
    } else {
      this.taskService.addTask(taskData);
    }

    this.router.navigate(['/tasks']);
  }
}
