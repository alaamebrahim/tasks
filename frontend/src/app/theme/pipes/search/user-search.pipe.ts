import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UserSearchPipe', pure: false })
export class UserSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    const searchText = new RegExp(args, 'ig');
    // console.log(searchText);
    // console.log(value);
    if (value) {
      return (value || []).filter(user => {
        if (user.first_name || user.last_name || user.email) {
          return (user.first_name.search(searchText) !== -1 ||
                  user.last_name.search(searchText) !== -1 ||
                  user.email.search(searchText) !== -1
                );
        } else {
          return user.username.search(searchText) !== -1;
        }
      });
    }
  }
}
