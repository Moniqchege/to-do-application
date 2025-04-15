import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
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
  taskList: any[] = [];

  constructor(
    private fb: FormBuilder,
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

    const storedTaskList = localStorage.getItem(this.taskListId);
    if (storedTaskList) {
      this.taskList = JSON.parse(storedTaskList);
    } else {
      this.taskList = [];
    }

    const taskIdParam = this.route.snapshot.paramMap.get('id');
    if (taskIdParam) {
      this.taskId = taskIdParam;

      const task = this.taskList.find((task) => task.id === this.taskId);
      if (task) {
        this.pageTitle = 'Edit Task';
        this.taskForm.patchValue(task);
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
    if (this.taskForm.invalid || !this.taskListId) return;

    const taskData: Task = this.taskForm.value;

    if (this.taskId) {
      const taskIndex = this.taskList.findIndex(task => task.id === this.taskId);
      if (taskIndex !== -1) {
        this.taskList[taskIndex] = { ...this.taskList[taskIndex], ...taskData };
        localStorage.setItem(this.taskListId, JSON.stringify(this.taskList));
      }
    } else {
      const newTask = { ...taskData, id: this.generateUniqueId() };
      this.taskList.push(newTask);
      localStorage.setItem(this.taskListId, JSON.stringify(this.taskList));
    }

    this.router.navigate(['/task-list']);
  }

  private generateUniqueId(): string {
    return 'task-' + Math.random().toString(36).substr(2, 9); 
  }
}
