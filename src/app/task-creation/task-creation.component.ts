import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Task } from '../task.model';
import { TaskListService } from '../task-list.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.css']
})
export class TaskCreationComponent implements OnInit {
  taskForm: FormGroup;
  taskId: string | null = null;
  pageTitle = 'Create Task';
  taskListId: string = '';
  taskList: Task[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private taskListService: TaskListService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['Medium', Validators.required],
      attachment: [null]
    });
  }

  ngOnInit(): void {
    this.taskListId = localStorage.getItem('taskListId') || '';
    if (!this.taskListId) {
      console.error('No taskListId found');
      return;
    }

    // Load tasks from localStorage
    const storedTaskList = localStorage.getItem(`tasks_${this.taskListId}`);
    this.taskList = storedTaskList ? JSON.parse(storedTaskList) : [];

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
        localStorage.setItem(`tasks_${this.taskListId}`, JSON.stringify(this.taskList));
        this.taskListService.updateTask(this.taskList[taskIndex]);
        this.taskListService.setTasks(this.taskList); // Sync with service
      }
    } else {
      const newTask = { ...taskData, id: this.generateUniqueId() };
      this.taskList.push(newTask);
      localStorage.setItem(`tasks_${this.taskListId}`, JSON.stringify(this.taskList));
      this.taskListService.addTask(newTask);
      this.taskListService.setTasks(this.taskList); // Sync with service
    }

    this.router.navigate(['/task-list']);
  }

  private generateUniqueId(): string {
    return 'task-' + Math.random().toString(36).substr(2, 9);
  }
}
