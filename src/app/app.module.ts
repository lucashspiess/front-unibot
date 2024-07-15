import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { LoginComponent } from './pages/login/login.component';
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {LoginModule} from "./pages/login/login.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ConfirmationDialog} from "./core/confirmation-dialog/confirmation-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {LoaderModule} from "./core/loader/loader.module";
import {LoaderDialogComponent} from "./core/loader-dialog/loader-dialog.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialog,
    LoaderDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    LoaderModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    RouterOutlet,
    RouterLink,
    MatSelectModule,
    LoginModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
