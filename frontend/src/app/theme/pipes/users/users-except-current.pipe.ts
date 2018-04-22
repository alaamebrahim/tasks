import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UsersExceptCurrentPipe', pure: false })
export class UsersExceptCurrentPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    if (value) {
      const user_id = args;

      // console.log(value);
      return (value || []).filter(user => {
        if (user_id === null) {
          return false;
        }
        // console.log(user);
        // console.log(user_role);
        if (user_id === user.id) {
          return false;
        }
        return true;
      });
    }
  }
}
