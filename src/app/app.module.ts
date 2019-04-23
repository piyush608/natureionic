import { HomePageModule } from './../pages/home/home.module';
import { GoogleMaps } from '@ionic-native/google-maps';
import { CollectionsPageModule } from './../pages/collections/collections.module';
import { ProfilePageModule } from './../pages/profile/profile.module';
import { FireProvider } from './../providers/fire/fire';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// import { TextInput } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { AuthProvider } from '../providers/auth/auth';
import { HttpModule } from '@angular/http';
import { UploadImageProvider } from '../providers/upload-image/upload-image';
import  { NetworkProvider } from '../providers/network/network';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationProvider } from '../providers/location/location';
import { SearchProvider } from '../providers/search/search';
import { CacheProvider } from '../providers/cache/cache';
import { InspirationPageModule } from '../pages/inspiration/inspiration.module';
import { LikeProvider } from '../providers/like/like';
import { BookmarkProvider } from '../providers/bookmark/bookmark';
import { QueryProvider } from '../providers/query/query';
import { CollectionProvider } from '../providers/collection/collection';
import { Camera } from '@ionic-native/camera';
import { HomeProvider } from '../providers/home/home';
import { BusinessProvider } from '../providers/business/business';
import { RecipeProvider } from '../providers/recipe/recipe';
import { Network } from '@ionic-native/network';
import { KeywordProvider } from '../providers/keyword/keyword';
import { CategoryProvider } from '../providers/category/category';
import { UserProvider } from '../providers/user/user';
import { NativeStorage } from '@ionic-native/native-storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ValuesProvider } from '../providers/values/values';
import { ArticlesProvider } from '../providers/articles/articles';
import { HuntedProductProvider } from '../providers/hunted-product/hunted-product';
import { BusinessCardComponentModule } from '../components/business-card/business-card.module';
import { LevelsProvider } from '../providers/levels/levels';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Deeplinks } from '@ionic-native/deeplinks';
import { ForumProvider } from '../providers/forum/forum';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { NotificationProvider } from '../providers/notifications/notification';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonInputScrollIntoViewModule } from 'ion-input-scroll-into-view';

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPage: true
    }),
    BusinessCardComponentModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    HomePageModule,
    ProfilePageModule,
    InspirationPageModule,
    CollectionsPageModule,
    BusinessCardComponentModule,
    IonInputScrollIntoViewModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    Deeplinks,
    StatusBar,
    SplashScreen,
    CallNumber,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FireProvider,
    AuthProvider,
    UploadImageProvider,
    Geolocation,
    LocationProvider,
    LaunchNavigator,
    SearchProvider,
    CacheProvider,
    LikeProvider,
    BookmarkProvider,
    QueryProvider,
    CollectionProvider,
    HomeProvider,
    BusinessProvider,
    RecipeProvider,
    Network,
    GoogleMaps,
    // TextInput,
    KeywordProvider,
    CategoryProvider,
    UserProvider,
    NativeStorage,
    InAppBrowser,
    ValuesProvider,
    ArticlesProvider,
    HuntedProductProvider,
    LevelsProvider,
    ScreenOrientation,
    ForumProvider,
    NetworkProvider,
    Diagnostic,
    LocationAccuracy,
    NotificationProvider,
    SocialSharing
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule {}
