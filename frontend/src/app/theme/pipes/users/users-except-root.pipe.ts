import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UsersExceptRootPipe', pure: false })
export class UsersExceptRootPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    if (value) {
      const user_role = args;
      // console.log(value);
      return (value || []).filter(user => {
        if (user_role !== 'root' && user_role !== 'admin') {
          if (user.role_name === 'root') {
            return false;
          } else {
            return true;
          }
        }
        return true;
      });
    }
  }
}
