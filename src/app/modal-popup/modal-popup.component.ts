import { Component, Input } from '@angular/core';
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
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: '',
    completed: false
  };
  @Input() index: number | null = null;
  @Input() saveFn!: (index: number, updatedTask: Task) => void;

  save(): void {
    if (this.index !== null) {
      this.saveFn(this.index, this.task);
      this.closeModal();
    }
  }

  closeModal(): void {
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }  }
}
