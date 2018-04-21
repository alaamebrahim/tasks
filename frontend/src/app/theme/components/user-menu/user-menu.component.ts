import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserInStorage, UserInfoService } from '../../../shared/services/user-info.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
  public userImage: string;
  public userInfo: UserInStorage;
  public userPicPath = environment.userPicPath;

  constructor(private userInfoService: UserInfoService) { }

  ngOnInit() {
    this.userInfo = this.userInfoService.getUserInfo();
    if (this.userInfo !== null) {
      this.userImage = this.userInfo.image;
    }
  }

}
