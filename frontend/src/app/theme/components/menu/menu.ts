import { Menu } from './menu.model';

export const verticalMenuItems = [
    new Menu(1, 'الرئيسية', '/', null, 'dashboard', null, false, 0, ['root', 'admin', 'user']),
    new Menu(2, 'المستخدمين', '/users', null, 'supervisor_account', null, false, 0, ['root', 'admin']),
    new Menu(3, 'المهام', '/tasks', null, 'access_alarm', null, false, 0, ['root', 'admin', 'user']),
    new Menu(4, 'المشاريع', '/projects', null, 'access_alarm', null, false, 0, ['root', 'admin', 'user']),
    new Menu(16, 'البريد', '/mailbox', null, 'email', null, false, 0, ['root', 'admin', 'user']),
];

export const horizontalMenuItems = [
    new Menu(1, 'الرئيسية', '/', null, 'dashboard', null, false, 0, ['root', 'admin', 'user']),
    new Menu(2, 'المستخدمين', '/users', null, 'supervisor_account', null, false, 0, ['root', 'admin']),
    new Menu(3, 'المهام', '/tasks', null, 'access_alarm', null, false, 0, ['root', 'admin', '']),
    new Menu(4, 'المشاريع', '/projects', null, 'access_alarm', null, false, 0, ['root', 'admin', 'user']),
    new Menu(16, 'البريد', '/mailbox', null, 'email', null, false, 40, ['root', 'admin', 'user']),
];
