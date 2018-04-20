import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UsersExceptRootPipe', pure: false })
export class UsersExceptRootPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    if (value) {
      // console.log(value);
      return (value || []).filter(user => {
        if (user.role_name === 'root') {
          return false;
        } else {
          return true;
        }
      });
    }
  }
}
