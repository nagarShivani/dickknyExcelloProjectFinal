import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { ToastComponent } from "./services/toast/components/toast/toast.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientInterceptor } from "./interceptors/http-client.interceptor";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { environment } from "./environment";

// import { DashboardComponent } from './main/components/dashboard/components/dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

    AngularFireStorageModule,
  ],

  providers: [
    ToastComponent,
    MatSnackBar,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
