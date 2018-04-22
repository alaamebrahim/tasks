import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationPipe } from './pagination/pagination.pipe';
import { ProfilePicturePipe } from './profilePicture/profilePicture.pipe';
import { ChatPersonSearchPipe } from './search/chat-person-search.pipe';
import { UserSearchPipe } from './search/user-search.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';
import { MailSearchPipe } from './search/mail-search.pipe';
import { UsersExceptRootPipe } from './users/users-except-root.pipe';
import { RolesExceptRootPipe } from './roles/roles-except-root.pipe';
import { TasksFilterPipe } from './tasks/tasks-filter.pipe';
import { UserFilterPipe } from './users/user-filter.pipe';
import { TaskSearchPipe } from './tasks/task-search.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PaginationPipe,
        ProfilePicturePipe,
        ChatPersonSearchPipe,
        UserSearchPipe,
        UsersExceptRootPipe,
        RolesExceptRootPipe,
        TasksFilterPipe,
        TruncatePipe,
        MailSearchPipe,
        UserFilterPipe,
        TaskSearchPipe
    ],
    exports: [
        PaginationPipe,
        ProfilePicturePipe,
        ChatPersonSearchPipe,
        UserSearchPipe,
        UsersExceptRootPipe,
        RolesExceptRootPipe,
        TasksFilterPipe,
        TruncatePipe,
        MailSearchPipe,
        UserFilterPipe,
        TaskSearchPipe
    ]
})
export class PipesModule { }
