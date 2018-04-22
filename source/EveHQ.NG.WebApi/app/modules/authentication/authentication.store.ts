import { ApplicationState } from 'modules/application/stores/application-reducers.store';
import { LoginUseCaseState, loginUseCaseReducer } from 'modules/application/use-cases/login.use-case';

export interface AuthenticationModuleState {
	loginUseCaseState: LoginUseCaseState;
}

export interface State extends ApplicationState {
	authenticationModule: AuthenticationModuleState;
}

export const authenticationModuleReducers =
{
	loginUseCase: loginUseCaseReducer
};
