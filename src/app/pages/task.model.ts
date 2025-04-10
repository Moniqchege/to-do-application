export interface Task {
    title: string;
    description: string;
    dueDate: string;
    priority: 'Low' | 'Medium' | 'High';
    attachmentBase64?: string;
    attachmentName?: string;
    status: string;
  }
  