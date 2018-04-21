export class Task {
    id: number;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    priority: number;
    user_id: number[];
    progress: number = 0;
    completed: boolean = false;
    cancelled: boolean = false;
    attachment: string;
    created_at: Date;
    updated_at: Date;
  }
