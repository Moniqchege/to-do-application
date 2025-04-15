import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
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
export class ModalPopupComponent implements OnChanges {
  @Input() task: Task = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'To Do',
    ownerId: ''
  };
  @Input() index: number | null = null;
  @Input() saveFn!: (index: number, updatedTask: Task) => void;

  @Output() modalClosed = new EventEmitter<void>();

  showModal = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['index'] && this.index !== null) {
      this.showModal = true;
    }
  }

  ngOnInit(): void {
    if (!this.task.status) {
      this.task.status = 'To Do';
    }
  }

  save(): void {
    if (this.index !== null) {
      this.saveFn(this.index, this.task);
      this.closeModal();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.modalClosed.emit();
  }
}
