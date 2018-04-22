import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UserFilterPipe', pure: false })
export class UserFilterPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    if (value) {
      const user_role = args;
      // console.log(value);
      return (value.users || []).filter(user => {
        // console.log(user);
        // console.log(user_role);
        if (user_role !== 'root') {
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
