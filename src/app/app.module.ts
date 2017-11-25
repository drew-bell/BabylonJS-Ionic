import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DeviceProvider } from '../providers/device/device';
import { LocationsProvider } from '../providers/locations/locations';
import { PoiPage } from '../pages/poi/poi';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { GameProvider } from '../providers/game/game';
import { Geolocation } from '@ionic-native/geolocation';
import { MainPage } from '../pages/main/main';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PoiPage,
    MainPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PoiPage,
    MainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DeviceProvider,
    LocationsProvider,
    ScreenOrientation,
    GameProvider,
    Geolocation
  ]
})
export class AppModule { }
