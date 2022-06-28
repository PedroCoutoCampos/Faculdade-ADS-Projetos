import isEmail from 'validator/lib/isEmail';
import { EmailValidador } from './emailValidador';

export class EmailValidadorAdapter implements EmailValidador {
  isEmail(value: string): boolean {
    return isEmail(value);
  }
}


