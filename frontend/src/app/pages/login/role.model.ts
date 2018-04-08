export class Role {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public created_at: Date,
        public updated_at: Date
    ) {}
}
