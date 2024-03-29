import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { MenuService } from '../menu.service';
import { UserInfoService } from '../../../../shared/services/user-info.service';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class VerticalMenuComponent implements OnInit {
  @Input('menuItems') menuItems;
  @Input('menuParentId') menuParentId;
  parentMenu: Array<any>;
  public settings: Settings;
  public userRole: string;
  public hasARole = false;
  constructor(
    public appSettings: AppSettings,
    public menuService: MenuService,
    public router: Router,
    private userInfoService: UserInfoService
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    const me = this;
    // console.log(this.menuItems);
    /*me.menuItems.forEach(element => {
      //
      if (element.canView.indexOf(me.userInfoService.getUserInfo().role) === -1) {
        me.parentMenu.push(element);
      }
    });*/
    // console.log(this.parentMenu);
    this.parentMenu = this.menuItems.filter(item => {
      // return true;
      return (item.parentId === this.menuParentId) && item.canView.indexOf(this.userInfoService.getUserInfo().role) !== -1;
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.settings.fixedHeader) {
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.scrollTop = 0;
          }
        } else {
          document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
        }
      }
    });
  }

  onClick(menuId) {
    this.menuService.toggleMenuItem(menuId);
    this.menuService.closeOtherSubMenus(this.menuItems, menuId);
  }

}
