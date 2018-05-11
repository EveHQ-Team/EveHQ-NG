import { ApplicationStore } from 'modules/application/stores/application.state';
import { LoginUseCaseState, loginUseCaseReducer } from 'modules/application/use-cases/login.use-case';

export interface AuthenticationModuleState {
	loginUseCaseState: LoginUseCaseState;
}

export interface State extends ApplicationStore {
	authenticationModule: AuthenticationModuleState;
}

export const authenticationModuleReducers =
{
	loginUseCase: loginUseCaseReducer
};
