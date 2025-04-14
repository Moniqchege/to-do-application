import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';

@Component({
  selector: 'app-modal-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent {
  @Input() task: Task = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: '',
  };
  @Input() index: number | null = null;
  @Input() saveFn!: (index: number, updatedTask: Task) => void;

  @Output() modalClosed = new EventEmitter<void>();

  save(): void {
    if (this.index !== null) {
      this.saveFn(this.index, this.task);
      this.closeModal();
    }
  }

  closeModal(): void {
    this.modalClosed.emit();
  }
}
