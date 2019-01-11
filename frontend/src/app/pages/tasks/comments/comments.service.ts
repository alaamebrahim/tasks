import {Injectable} from '@angular/core';
import {ApiRequestService} from '../../../shared/services/api-request.service';
import {Comment} from './comments.model';

@Injectable()
export class CommentsService {

    constructor(
        private apiRequestService: ApiRequestService,
    ) {
    }

    public addOrUpdateComment(data: Comment): Promise<Comment[]>{
        return new Promise<Comment[]>((res, rej) => {
            this.apiRequestService.post('comments/add-update-comments', data)
                .subscribe(response => {
                    if (response.success === true) {
                        res(response.data);
                    } else {
                        rej(response.success);
                    }
                }, error1 => rej(error1));
        });
    }

    public getComments(taskId: any): Promise<Comment[]> {
        return new Promise<Comment[]>((res, rej) => {
            this.apiRequestService.get('comments/get-comments/' + taskId)
                .subscribe(response => {
                    console.log(response)
                    if (response.success === 'true') {
                        res(response.data);
                    } else {
                        rej(response.success);
                    }
                }, error1 => rej(error1));
        });
    }

    public deleteComment(comment: Comment) {
        return this.apiRequestService.post('comments/delete-comment', comment);
    }

}
