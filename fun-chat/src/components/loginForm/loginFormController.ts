import { LoginModel } from '../../models/LoginModel';
import { LoginView } from './loginFormView';

export class LoginController {
  constructor(
    private model: LoginModel,
    private view: LoginView
  ) {}
}
