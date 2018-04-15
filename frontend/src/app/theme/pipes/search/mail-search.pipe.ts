import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'MailSearch'
})

export class MailSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    const searchText = new RegExp(args, 'ig');
    if (value) {
      // console.log(value);
      return value.filter(mail => {
        // console.log(mail);
        if (mail.sender) {
          if (mail.sender.first_name || mail.sender.last_name || mail.subject) {
            if (
              mail.sender.first_name.search(searchText) !== -1 ||
              mail.sender.last_name.search(searchText) !== -1 ||
              mail.subject.search(searchText) !== -1
            ) {
              return true;
            }
          }
        } else if (mail.receiver) {
          if (mail.receiver[0].first_name || mail.receiver[0].last_name || mail.subject) {
            // console.log(mail.receiver[0]);
            if (
              mail.receiver[0].first_name.search(searchText) !== -1 ||
              mail.receiver[0].last_name.search(searchText) !== -1 ||
              mail.subject.search(searchText) !== -1
            ) {
              return true;
            }
          }
        }
      });
    }
  }
}
