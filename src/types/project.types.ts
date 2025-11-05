export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  dueDate?: string;
  attachments: FileAttachment[];
  comments: Comment[];
}

export interface FileAttachment {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  replies: Comment[];
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

export interface ProjectBoard {
  id: string;
  title: string;
  columns: Column[];
  members: string[];
}
