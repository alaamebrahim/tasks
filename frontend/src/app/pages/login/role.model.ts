import { Permission } from '../users/permissions/permission.model';

export class Role {
    constructor(
        public id: number,
        public name: string,
        public translation: string,
        public created_at: Date,
        public updated_at: Date,
        public permissions: Permission[]
    ) {}
}
