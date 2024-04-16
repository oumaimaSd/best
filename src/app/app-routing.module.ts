import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SailsComponent } from './sails/sails.component';
import { Test3Component } from './test3/test3.component';
import { LoginComponent } from './login/login.component';
import { CoverComponent } from './cover/cover.component';
import { SpinnkerComponent } from './spinnker/spinnker.component';
import { CutComponent } from './cut/cut.component';
import { AdminComponent } from './admin/admin.component';
import { AddsailsComponent } from './addsails/addsails.component';
import { AuthGuard } from './auth-guard.service'; // Importez le garde de route depuis le bon chemin
import { AdminGuard } from './admin.guard';
import { AddcoverComponent } from './addcover/addcover.component';
import { AddspiComponent } from './addspi/addspi.component';
import { AddwarehouseComponent } from './addwarehouse/addwarehouse.component';
import { AddfirstComponent } from './addfirst/addfirst.component';
import { AddpatchComponent } from './addpatch/addpatch.component';
import { AddsecondComponent } from './addsecond/addsecond.component';
import { AddhandComponent } from './addhand/addhand.component';
import { AdcoverComponent } from './adcover/adcover.component';
import { AdspiComponent } from './adspi/adspi.component';
import { AddcutComponent } from './addcut/addcut.component';
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
import { HomecutComponent } from './homecut/homecut.component';
import { HomepatchComponent } from './homepatch/homepatch.component';
import { PackbComponent } from './packb/packb.component';
import { PackComponent } from './pack/pack.component';
import { NylonComponent } from './nylon/nylon.component';
import { FinitionComponent } from './finition/finition.component';

import { AddfComponent } from './addf/addf.component';
import { AddnylonComponent } from './addnylon/addnylon.component';
import { AddpackComponent } from './addpack/addpack.component';
import { AddpackbComponent } from './addpackb/addpackb.component';

const routes: Routes = [
{path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection vers la page d'accueil
{path:"addf",component:AddfComponent},
{path:"addnylon",component:AddnylonComponent},
{path:"addpack",component:AddpackComponent},
{path:"addpackb",component:AddpackbComponent},

{path:"packb",component:PackbComponent},
{path:"pack",component:PackComponent},
{path:"nylon",component:NylonComponent},
{path:"finition",component:FinitionComponent},


{path:'homecut',component:HomecutComponent},
{path:'homepatch',component:HomepatchComponent},

{path:"test",component:TestComponent},
{path:"test2",component:Test2Component},
{path:"test3",component:Test3Component},
{path:"testing",component:TestingComponent},
{path:"addtesting",component:AddtestingComponent},
{path:"ttest",component:TtestComponent},
{path:"footer",component:FooterComponent},
{path:"header",component:HeaderComponent},

{path:"about",component:AboutComponent},
{path:"home",component:HomeComponent},

{path:"login",component:LoginComponent},

{path:"cover",component:CoverComponent},
{path:"spinnker",component:SpinnkerComponent},
{path:"sails",component:SailsComponent},

{ path: 'cut', component: CutComponent },
{path:"warehouse",component:WarehouseComponent},
{path:"firstsew",component:FirstsewComponent},
{path:"patch",component:PatchComponent},
{path:"second",component:SecondComponent},
{path:"hand",component:HandComponent},
{path:"covert",component:CovertComponent},
{path:"spinnkert",component:SpinnkertComponent},


{path:"admin",component:AdminComponent},
{path:"addsails",component:AddsailsComponent},
{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
{ path: 'admin', component: AdminComponent ,canActivate: [AuthGuard]},
{ path: '', redirectTo: 'admin', pathMatch: 'full' }, // Redirection par défaut vers /admin

{path:"addcover",component:AddcoverComponent},
{path:"addspi",component:AddspiComponent},
{path:"addwarehouse",component:AddwarehouseComponent},
{path:"addcut",component:AddcutComponent},
{path:"addfirst",component:AddfirstComponent},
{path:"addpatch",component:AddpatchComponent},
{path:"addsecond",component:AddsecondComponent},
{path:"addhand",component:AddhandComponent},
{path:"adcover",component:AdcoverComponent},
{path:"adspi",component:AdspiComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
