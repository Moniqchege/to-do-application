export interface Task {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    attachmentBase64?: string;
    attachmentName?: string;
    status: string;
    completed: boolean;
  }
  enum Priority {
    'Low',
    'Medium',
    'High'
  }
  