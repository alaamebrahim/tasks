export class ComposedMail {
    public receiver_id: number[];
    public subject: string;
    public message: string;
    public sender_id: number;
    public attachment: string;
    public readed: boolean;
    public starred: boolean;
    public draft: boolean;
    public trash: boolean;
}
