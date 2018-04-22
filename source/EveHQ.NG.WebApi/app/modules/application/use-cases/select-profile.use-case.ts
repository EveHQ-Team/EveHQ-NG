import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import {
	Action,
	} from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { v4 as uuid } from 'node-uuid';
import { ApplicationUser } from 'modules/application/models/application-user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';
import { CreateUserModel } from 'modules/application/models/create-user-model';

export enum SelectProfileUseCaseActionTypes {
	SelectProfileRedirect = '[SELECT PROFILE USE CASE] Select Profile Redirect'
}

export class SelectProfileRedirect implements Action {
	public readonly type: string = SelectProfileUseCaseActionTypes.SelectProfileRedirect;
	public payload?: any;
}

