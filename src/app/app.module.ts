import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SailsComponent } from './sails/sails.component';
import { Test3Component } from './test3/test3.component';
import { LoginComponent } from './login/login.component'; // Importez ReactiveFormsModule
import { CoverComponent } from './cover/cover.component';
import { SpinnkerComponent } from './spinnker/spinnker.component';
import { CutComponent } from './cut/cut.component';
import { AdminComponent } from './admin/admin.component';
import { AddsailsComponent } from './addsails/addsails.component';
import { AddcoverComponent } from './addcover/addcover.component';
import { AddspiComponent } from './addspi/addspi.component';
import { AddwarehouseComponent } from './addwarehouse/addwarehouse.component';
import { AddcutComponent } from './addcut/addcut.component';
import { AddfirstComponent } from './addfirst/addfirst.component';
import { AddsecondComponent } from './addsecond/addsecond.component';
import { AddhandComponent } from './addhand/addhand.component';
import { AdcoverComponent } from './adcover/adcover.component';
import { AdspiComponent } from './adspi/adspi.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { FirstsewComponent } from './firstsew/firstsew.component';
import { PatchComponent } from './patch/patch.component';
import { SecondComponent } from './second/second.component';
import { HandComponent } from './hand/hand.component';
import { CovertComponent } from './covert/covert.component';
import { SpinnkertComponent } from './spinnkert/spinnkert.component';
import { TestingComponent } from './testing/testing.component';
import { AddtestingComponent } from './addtesting/addtesting.component';
import { TtestComponent } from './ttest/ttest.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { HomecutComponent } from './homecut/homecut.component';
import { HomepatchComponent } from './homepatch/homepatch.component';
import { PackbComponent } from './packb/packb.component';
import { PackComponent } from './pack/pack.component';
import { FinitionComponent } from './finition/finition.component';
import { NylonComponent } from './nylon/nylon.component';
import { AddpackComponent } from './addpack/addpack.component';
import { AddpackbComponent } from './addpackb/addpackb.component';
import { AddfComponent } from './addf/addf.component';
import { AddnylonComponent } from './addnylon/addnylon.component';
import { VideoControlDirective } from './video-control.directive'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    Test2Component,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    HomeComponent,
    SailsComponent,
    Test3Component,
    LoginComponent,
    CoverComponent,
    SpinnkerComponent,
    CutComponent,
    AdminComponent,
    AddsailsComponent,
    AddcoverComponent,
    AddspiComponent,
    AddwarehouseComponent,
    AdcoverComponent,
    AdspiComponent,
    AddcutComponent,
    AddfirstComponent,
    AddsecondComponent,
    AddhandComponent,
    WarehouseComponent,
    FirstsewComponent,
    PatchComponent,
    SecondComponent,
    HandComponent,
    CovertComponent,
    SpinnkertComponent,
    TestingComponent,
    AddtestingComponent,
    TtestComponent,
    HomecutComponent,
    HomepatchComponent,
    PackbComponent,
    PackComponent,
    FinitionComponent,
    NylonComponent,
    AddpackComponent,
    AddpackbComponent,
    AddfComponent,
    AddnylonComponent,
    VideoControlDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FullCalendarModule, 
    FullCalendarModule,
    NgxPaginationModule,
    HttpClientModule,
   
    ReactiveFormsModule
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
