import { Menu } from './menu.model';

export const verticalMenuItems = [
    new Menu(1, 'الرئيسية', '/', null, 'dashboard', null, false, 0),
    new Menu(2, 'المستخدمين', '/users', null, 'supervisor_account', null, false, 0),
    new Menu(3, 'المهام', '/tasks', null, 'access_alarm', null, false, 0),
    new Menu(16, 'البريد', '/mailbox', null, 'email', null, false, 0),
    new Menu(81, 'UI Features', null, null, 'computer', null, true, 0),
    new Menu(4, 'Buttons', '/ui/buttons', null, 'keyboard', null, false, 3),
    new Menu(5, 'Cards', '/ui/cards', null, 'card_membership', null, false, 3),
    new Menu(6, 'Lists', '/ui/lists', null, 'list', null, false, 3),
    new Menu(7, 'Grids', '/ui/grids', null, 'grid_on', null, false, 3),
    new Menu(8, 'Tabs', '/ui/tabs', null, 'tab', null, false, 3),
    new Menu(9, 'Expansion Panel', '/ui/expansion-panel', null, 'dns', null, false, 3),
    new Menu(10, 'Chips', '/ui/chips', null, 'label', null, false, 3),
    new Menu(11, 'Progress', '/ui/progress', null, 'data_usage', null, false, 3),
    new Menu(12, 'Dialog', '/ui/dialog', null, 'open_in_new', null, false, 3),
    new Menu(13, 'Tooltip', '/ui/tooltip', null, 'chat_bubble', null, false, 3),
    new Menu(14, 'Snackbar', '/ui/snack-bar', null, 'sms', null, false, 3),
    new Menu(15, 'Dynamic Menu', '/dynamic-menu', null, 'format_list_bulleted', null, false, 0),
    new Menu(17, 'Chat', '/chat', null, 'chat', null, false, 0),
    new Menu(20, 'Form Controls', null, null, 'dvr', null, true, 0),
    new Menu(21, 'Autocomplete', '/form-controls/autocomplete', null, 'short_text', null, false, 20),
    new Menu(22, 'Checkbox', '/form-controls/checkbox', null, 'check_box', null, false, 20),
    new Menu(23, 'Datepicker', '/form-controls/datepicker', null, 'today', null, false, 20),
    new Menu(24, 'Form field', '/form-controls/form-field', null, 'view_stream', null, false, 20),
    new Menu(25, 'Input', '/form-controls/input', null, 'input', null, false, 20),
    new Menu(26, 'Radio button', '/form-controls/radio-button', null, 'radio_button_checked', null, false, 20),
    new Menu(27, 'Select', '/form-controls/select', null, 'playlist_add_check', null, false, 20),
    new Menu(28, 'Slider', '/form-controls/slider', null, 'tune', null, false, 20),
    new Menu(29, 'Slide toggle', '/form-controls/slide-toggle', null, 'star_half', null, false, 20),
    new Menu(30, 'Tables', null, null, 'view_module', null, true, 0),
    new Menu(31, 'Basic', '/tables/basic', null, 'view_column', null, false, 30),
    new Menu(32, 'Paging', '/tables/paging', null, 'last_page', null, false, 30),
    new Menu(33, 'Sorting', '/tables/sorting', null, 'sort', null, false, 30),
    new Menu(34, 'Filtering', '/tables/filtering', null, 'format_line_spacing', null, false, 30),
    new Menu(35, 'NGX DataTable', '/tables/ngx-table', null, 'view_array', null, false, 30),
    new Menu(40, 'Pages', null, null, 'library_books', null, true, 0),
    new Menu(43, 'Login', '/login', null, 'exit_to_app', null, false, 40),
    new Menu(44, 'Register', '/register', null, 'person_add', null, false, 40),
    new Menu(45, 'Blank', '/blank', null, 'check_box_outline_blank', null, false, 40),
    new Menu(46, 'Page Not Found', '/pagenotfound', null, 'error_outline', null, false, 40),
    new Menu(47, 'Error', '/error', null, 'warning', null, false, 40),
    new Menu(48, 'Landing', '/landing', null, 'filter', null, false, 40),
    new Menu(50, 'Schedule', '/schedule', null, 'event', null, false, 0),
    new Menu(66, 'Maps', null, null, 'map', null, true, 0),
    new Menu(67, 'Google Maps', '/maps/googlemaps', null, 'location_on', null, false, 66),
    new Menu(68, 'Leaflet Maps', '/maps/leafletmaps', null, 'my_location', null, false, 66),
    new Menu(70, 'Charts', null, null, 'multiline_chart', null, true, 0),
    new Menu(71, 'Bar Charts', '/charts/bar', null, 'insert_chart', null, false, 70),
    new Menu(72, 'Pie Charts', '/charts/pie', null, 'pie_chart', null, false, 70),
    new Menu(73, 'Line Charts', '/charts/line', null, 'show_chart', null, false, 70),
    new Menu(74, 'Bubble Charts', '/charts/bubble', null, 'bubble_chart', null, false, 70),
    new Menu(85, 'Material Icons', '/icons', null, 'insert_emoticon', null, false, 0),
    new Menu(140, 'Level 1', null, null, 'more_horiz', null, true, 0),
    new Menu(141, 'Level 2', null, null, 'folder_open', null, true, 140),
    new Menu(142, 'Level 3', null, null, 'folder_open', null, true, 141),
    new Menu(143, 'Level 4', null, null, 'folder_open', null, true, 142),
    new Menu(144, 'Level 5', null, 'http://themeseason.com', 'link', null, false, 143),
];

export const horizontalMenuItems = [
    new Menu(1, 'الرئيسية', '/', null, 'dashboard', null, false, 0),
    new Menu(2, 'المستخدمين', '/users', null, 'supervisor_account', null, false, 0),
    new Menu(3, 'المهام', '/tasks', null, 'access_alarm', null, false, 0),
    new Menu(16, 'البريد', '/mailbox', null, 'email', null, false, 40),
    new Menu(81, 'UI Features', null, null, 'computer', null, true, 0),
    new Menu(4, 'Buttons', '/ui/buttons', null, 'keyboard', null, false, 3),
    new Menu(5, 'Cards', '/ui/cards', null, 'card_membership', null, false, 3),
    new Menu(6, 'Lists', '/ui/lists', null, 'list', null, false, 3),
    new Menu(7, 'Grids', '/ui/grids', null, 'grid_on', null, false, 3),
    new Menu(8, 'Tabs', '/ui/tabs', null, 'tab', null, false, 3),
    new Menu(9, 'Expansion Panel', '/ui/expansion-panel', null, 'dns', null, false, 3),
    new Menu(10, 'Chips', '/ui/chips', null, 'label', null, false, 3),
    new Menu(11, 'Progress', '/ui/progress', null, 'data_usage', null, false, 3),
    new Menu(12, 'Dialog', '/ui/dialog', null, 'open_in_new', null, false, 3),
    new Menu(13, 'Tooltip', '/ui/tooltip', null, 'chat_bubble', null, false, 3),
    new Menu(14, 'Snackbar', '/ui/snack-bar', null, 'sms', null, false, 3),
    new Menu(17, 'Chat', '/chat', null, 'chat', null, false, 40),
    new Menu(20, 'Form Controls', null, null, 'dvr', null, true, 0),
    new Menu(21, 'Autocomplete', '/form-controls/autocomplete', null, 'short_text', null, false, 20),
    new Menu(22, 'Checkbox', '/form-controls/checkbox', null, 'check_box', null, false, 20),
    new Menu(23, 'Datepicker', '/form-controls/datepicker', null, 'today', null, false, 20),
    new Menu(24, 'Form field', '/form-controls/form-field', null, 'view_stream', null, false, 20),
    new Menu(25, 'Input', '/form-controls/input', null, 'input', null, false, 20),
    new Menu(26, 'Radio button', '/form-controls/radio-button', null, 'radio_button_checked', null, false, 20),
    new Menu(27, 'Select', '/form-controls/select', null, 'playlist_add_check', null, false, 20),
    new Menu(28, 'Slider', '/form-controls/slider', null, 'tune', null, false, 20),
    new Menu(29, 'Slide toggle', '/form-controls/slide-toggle', null, 'star_half', null, false, 20),
    new Menu(30, 'Tables', null, null, 'view_module', null, true, 0),
    new Menu(31, 'Basic', '/tables/basic', null, 'view_column', null, false, 30),
    new Menu(32, 'Paging', '/tables/paging', null, 'last_page', null, false, 30),
    new Menu(33, 'Sorting', '/tables/sorting', null, 'sort', null, false, 30),
    new Menu(34, 'Filtering', '/tables/filtering', null, 'format_line_spacing', null, false, 30),
    new Menu(35, 'NGX DataTable', '/tables/ngx-table', null, 'view_array', null, false, 30),
    new Menu(70, 'Charts', null, null, 'multiline_chart', null, true, 0),
    new Menu(71, 'Bar Charts', '/charts/bar', null, 'insert_chart', null, false, 70),
    new Menu(72, 'Pie Charts', '/charts/pie', null, 'pie_chart', null, false, 70),
    new Menu(73, 'Line Charts', '/charts/line', null, 'show_chart', null, false, 70),
    new Menu(74, 'Bubble Charts', '/charts/bubble', null, 'bubble_chart', null, false, 70),
    new Menu(66, 'Maps', null, null, 'map', null, true, 70),
    new Menu(67, 'Google Maps', '/maps/googlemaps', null, 'location_on', null, false, 66),
    new Menu(68, 'Leaflet Maps', '/maps/leafletmaps', null, 'my_location', null, false, 66),
    new Menu(85, 'Material Icons', '/icons', null, 'insert_emoticon', null, false, 3),
    new Menu(40, 'Pages', null, null, 'library_books', null, true, 0),
    new Menu(43, 'Login', '/login', null, 'exit_to_app', null, false, 40),
    new Menu(44, 'Register', '/register', null, 'person_add', null, false, 40),
    new Menu(45, 'Blank', '/blank', null, 'check_box_outline_blank', null, false, 40),
    new Menu(46, 'Page Not Found', '/pagenotfound', null, 'error_outline', null, false, 40),
    new Menu(47, 'Error', '/error', null, 'warning', null, false, 40),
    new Menu(48, 'Landing', '/landing', null, 'filter', null, false, 40),
    new Menu(50, 'Schedule', '/schedule', null, 'event', null, false, 40)
];
