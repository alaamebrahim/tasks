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
      return (opt || opt === '0') ? opt.filter(task => task.user_id === sel ) : opt;
    } else {
      return opt;
    }
}
}
