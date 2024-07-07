import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';


import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {MatDialog} from "@angular/material/dialog";

import {MatSnackBar} from "@angular/material/snack-bar";
import {ResponseControllerService} from "../../api/services/response-controller.service";
import {LoginDto} from "../../api/models/login-dto";
import {Institution} from "../../api/models/institution";
import {InstitutionControllerService} from "../../api/services/institution-controller.service";
import {ActivatedRoute} from "@angular/router";
import {MatOptionSelectionChange} from "@angular/material/core";

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
    private route: ActivatedRoute,
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
    this.service.responseControllerLogin({phoneNumber: phoneNumber, body:login}).subscribe(data =>
    console.log(data))
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

}
