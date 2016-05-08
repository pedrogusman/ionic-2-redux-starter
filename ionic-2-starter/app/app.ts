import {App, Platform} from 'ionic-angular';
import {ApplicationRef} from 'angular2/core';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {TodoStore} from "./store/store";


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [TodoStore],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, private store: TodoStore, applicationRef: ApplicationRef) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      let state = this.store.getState();
      console.log(state);
    });
  }
}
