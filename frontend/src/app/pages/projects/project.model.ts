export class Project {
    id: number;
    title: string;
    description: string;
    opened: number;
    created_at: Date;
    updated_at: Date;
    created_by: number;
    allowed_users: any[];
    image: string;
}
