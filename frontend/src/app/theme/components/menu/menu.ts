import { Menu } from './menu.model';

export const verticalMenuItems = [
    new Menu(1, 'الرئيسية', '/', null, 'dashboard', null, false, 0),
    new Menu(2, 'المستخدمين', '/users', null, 'supervisor_account', null, false, 0),
    new Menu(3, 'المهام', '/tasks', null, 'access_alarm', null, false, 0),
    new Menu(16, 'البريد', '/mailbox', null, 'email', null, false, 0),
];

export const horizontalMenuItems = [
    new Menu(1, 'الرئيسية', '/', null, 'dashboard', null, false, 0),
    new Menu(2, 'المستخدمين', '/users', null, 'supervisor_account', null, false, 0),
    new Menu(3, 'المهام', '/tasks', null, 'access_alarm', null, false, 0),
    new Menu(16, 'البريد', '/mailbox', null, 'email', null, false, 40),
];
