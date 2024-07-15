import {Component, OnInit} from '@angular/core';

/* tslint:disable:no-redundant-jsdoc callable-types */
/* tslint:disable:variable-name */
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {MatDialog, MatDialogRef} from "@angular/material/dialog";

import {MatSnackBar} from "@angular/material/snack-bar";
import {ResponseControllerService} from "./api/services/response-controller.service";
import {LoginDto} from "./api/models/login-dto";
import {LoaderDialogComponent} from "./core/loader-dialog/loader-dialog.component";
import {LoaderService} from "./core/loader/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login-front';
  formGroup!: FormGroup;
  hide = true;
  private dialogRef!: MatDialogRef<any>;
  constructor(
    private service: ResponseControllerService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private dialog: MatDialog) {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(11)]],
      senha: [null, Validators.required],
    });
  }

  /**
   * Inicializa as dependências do componente.
   */
  ngOnInit(): void {
    this.loaderService.onStart.subscribe(() => {
      this.dialogRef = this.dialog.open(LoaderDialogComponent, {
        minWidth: '50px',
        minHeight: '50px',
        hasBackdrop: true,
        disableClose: true
      });
    });

    this.loaderService.onStop.subscribe(() => {
      if (this.dialogRef !== undefined) {
        this.dialogRef.close();
      }
    });
  }

  /**
   * Autentica o Usuário na aplicação conforme os parâmetros informados.
   *
   * @param usuarioDTO
   * @param form
   */
  public onSubmit(): void {
    const login: LoginDto = this.formGroup.value;
    this.service.responseControllerLogin({phoneNumber: 5562982623311, body:login}).subscribe()
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  openDialog(): void {

  }
}
