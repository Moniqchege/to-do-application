export interface Task {
  id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    attachmentBase64?: string;
    attachmentName?: string;
    completed: boolean;
  }
  
  