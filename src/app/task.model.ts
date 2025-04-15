export interface Task {
  id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'To Do' | 'In Progress' | 'Completed' | 'Archived';
    ownerId: string;
    archived?: boolean;
    taskList?: string;
  }
  
   