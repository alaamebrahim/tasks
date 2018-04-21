import { Injectable } from '@angular/core'  ;

@Injectable()
export class MessagesService {
    public meetings = [
        {
            day: '09',
            month: 'May',
            title: 'Meeting with Bruno',
            text: 'Fusce ut condimentum velit, quis egestas eros. Quisque sed condimentum neque.',
            color: 'danger'
        }
    ];

    public getMeetings(): Array<Object> {
        return this.meetings;
    }

}
