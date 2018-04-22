import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'TaskSearchPipe', pure: false })
export class TaskSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    const searchText = new RegExp(args);
    if (value) {
      // console.log(value);
      return (value || []).filter(task => {
        // console.log(task);
        if (task.title) {
          return (task.title.search(searchText) !== -1);
        } else {
          return false;
        }
      });
    }
  }
}
