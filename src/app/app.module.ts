import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleComponent } from './title/title.component';
import { TankComponent } from './tank/tank.component';
import { Tank3dComponent } from './tank3d/tank3d.component';
import { LevelComponent } from './level/level.component';
import { AssetComponent } from './asset/asset.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    TankComponent,
    Tank3dComponent,
    LevelComponent,
    AssetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
