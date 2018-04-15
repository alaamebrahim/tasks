import { User } from '../users/user.model';

export class Mail {
    constructor(// public id: number,
        public attachment: string,
        public created_at: Date,
        public draft: boolean,
        public id: number,
        public message: string,
        public readed: boolean,
        public receiver: User,
        public receiver_id: number,
        public sender: User,
        public sender_id: number,
        public starred: boolean,
        public subject: string,
        public trash: boolean,
        public updated_at: boolean
    ) { }
}
