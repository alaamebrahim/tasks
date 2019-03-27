import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'TasksFilterPipe', pure: false })
export class TasksFilterPipe implements PipeTransform {
  /*transform(value, args?): Array<any> {
    const searchText = args;
    if (value) {
      // console.log(value);
      return (value || []).filter(task => {
        if (task.user_id) {
          console.log(task.user_id === searchText);
          console.log(task.user_id);
          console.log(searchText);
          return (task.user_id === searchText);
        }
      });
    }
  }*/
  transform(opt: any, sel?: any): any {
    // console.log('sel', sel);
    if (sel) {
      if (opt || opt === '0') {
       return opt.filter(task => {
          const permissions = JSON.parse(task.permissions);
          let hasTask = false;
          permissions.forEach(permission => {
            if (permission.user_id === sel && permission.enabled === true) {
              // console.log(task);
              hasTask = true;
            }
          });
          return hasTask;
        });
      }
    }
    return opt;
  }
}
