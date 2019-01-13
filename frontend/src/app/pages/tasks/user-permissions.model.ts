export class UserPermissions {
    user_id: number;
    username: string;
    enabled: boolean;
    permissions: PermissionsModel;
}

export class PermissionsModel {
    can_view = true;
    send_notifications: boolean;
    can_comment: boolean;
    update_progress: boolean;
    view_attachments: boolean;
}