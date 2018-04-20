import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'RolesExceptRootPipe', pure: false })
export class RolesExceptRootPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    if (value) {
      // console.log(value);
      return (value || []).filter(role => {
        if (role.name === 'root') {
          return false;
        } else {
          return true;
        }
      });
    }
  }
}
