import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import {environment} from '../../../../environments/environment';
import { User } from '../../../pages/users/user.model';
import { UserInfoService, UserInStorage } from '../../../shared/services/user-info.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class SidenavComponent implements OnInit {
  public userImage: string;
  public userInfo: UserInStorage;
  public menuItems: Array<any>;
  public settings: Settings;
  public userPicPath = environment.userPicPath;
  constructor(
    public appSettings: AppSettings,
    public menuService: MenuService,
    private userInfoService: UserInfoService
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.menuItems = this.menuService.getVerticalMenuItems();
    this.userInfo = this.userInfoService.getUserInfo();
    this.userImage = this.userInfo.image;
  }

  public closeSubMenus() {
    const menu = document.querySelector('.sidenav-menu-outer');
    if (menu) {
      for (let i = 0; i < menu.children[0].children.length; i++) {
        const child = menu.children[0].children[i];
        if (child) {
          if (child.children[0].classList.contains('expanded')) {
            child.children[0].classList.remove('expanded');
            child.children[1].classList.remove('show');
          }
        }
      }
    }
  }

}
