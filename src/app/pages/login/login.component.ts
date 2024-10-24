import {AfterViewInit, Component, HostListener, Inject, OnInit} from '@angular/core';


import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {MatDialog} from "@angular/material/dialog";

import {MatSnackBar} from "@angular/material/snack-bar";
import {ResponseControllerService} from "../../api/services/response-controller.service";
import {LoginDto} from "../../api/models/login-dto";
import {Institution} from "../../api/models/institution";
import {InstitutionControllerService} from "../../api/services/institution-controller.service";
import {ActivatedRoute} from "@angular/router";
import {MatOptionSelectionChange} from "@angular/material/core";
import { DOCUMENT } from '@angular/common';
import {ConfirmationDialog} from "../../core/confirmation-dialog/confirmation-dialog.component";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {TermoDialog} from "../termo-dialog/termo-dialog.component";
import {ResumoDialog} from "../resumo-dialog/resumo-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formGroup!: FormGroup;
  hide = true;
  institutions!: Institution[];
  saudation!: string | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private service: ResponseControllerService,
    private institutionService: InstitutionControllerService,
    private formBuilder: FormBuilder) {
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      institutionName: [null, Validators.required]
    });
  }

  setSaudation(event: MatOptionSelectionChange<string | undefined>){
    const institution = event.source.value;
    this.institutions.forEach(value => {
      if (value.name == institution){
        this.saudation = value.saudationPhrase;
      }
    })
  }

  /**
   * Inicializa as dependências do componente.
   */
  ngOnInit(): void {
    this.institutionService.institutionControllerListAll().subscribe(value =>{
      this.institutions = value;
      console.log(this.institutions)
    })
    this.createForm()
  }

  /**
   * Autentica o Usuário na aplicação conforme os parâmetros informados.
   *
   * @param usuarioDTO
   * @param form
   */
  public onSubmit(): void {
    const login: LoginDto = this.formGroup.value;
    const phoneNumber = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    if(this.formGroup.valid){
      this.service.responseControllerLogin({phoneNumber: phoneNumber, body:login}).subscribe(data =>{
          this.confirmarAcao("Sucesso", "Autenticação realizada, você será redirecionado para o WhatsApp.")
        }, error => {
          this.confirmarErro(error.error.message);
        }
      )
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  confirmarAcao(titulo: string, mensagem: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: titulo,
        mensagem: mensagem,
        textoBotoes: {
          ok: 'Ok',
        },
      },
    }).afterClosed().subscribe(()=>{
      this.document.location.href = 'https://wa.me/556295424184?text=autenticado';
    });
  }

  openDialog(titulo: string, mensagem: string){
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: titulo,
        mensagem: mensagem,
        textoBotoes: {
          ok: 'Ok',
        },
      },
    })
  }

  confirmarErro(erro: string){
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: "Erro",
        mensagem: erro,
        textoBotoes: {
          ok: 'Ok',
        },
      },
    })
  }

  openTermo() {
    const dialogRef = this.dialog.open(TermoDialog)
  }

  openResumo(){
    const dialogRef = this.dialog.open(ResumoDialog)
  }

}
