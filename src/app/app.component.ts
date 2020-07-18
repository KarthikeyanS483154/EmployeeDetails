/**
 * This is the main component ts file which used to fetch the employee data from requested server url
 * 
 * @author Karthikeyan 16/07/2020
 * @version 1.0
 */
import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppConstants } from './util/app-constants.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//App Compnent class
export class AppComponent {
  title = AppConstants.APP_NAME;
  pageTitle = AppConstants.LIST_PAGE_NAME;

  showViewBtn: Boolean = true;
  showAddBtn: Boolean = true;

  constructor(private router: Router, private activateRoute: ActivatedRoute) { }

  /**
   * Invoke when page getting loaded
   */
  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd),)
      .subscribe(() => {
        var rt = this.getChild(this.activateRoute);
        rt.data.subscribe(data => {
          this.pageTitle = data.header;
          var page = data.page;
          if (page == "list") {
            this.showViewBtn = false;
            this.showAddBtn = true;
          } else if (page == "add") {
            this.showViewBtn = true;
            this.showAddBtn = false;
          } else if (page == "update") {
            this.showViewBtn = true;
            this.showAddBtn = false;
          }
        });
      })
  }

  /**
   * To get router object when switch the component
   * @param activatedRoute - Activiated router
   */
  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
