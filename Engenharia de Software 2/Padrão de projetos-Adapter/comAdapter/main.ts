import { EmailValidador } from "./validations/emailValidador";
import { EmailValidadorAdapter } from "./validations/emailValidadorAdapter";

function validaEmail(emailValidador: EmailValidador, email: string): void {
  if (emailValidador.isEmail(email)) {
    console.log("Email é válido");
  } else {
    console.log("Email é inválido");
  }
}

const email = "pedro099045@gmail.com";
validaEmail(new EmailValidadorAdapter(), email);

