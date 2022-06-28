import isEmail from 'validator/lib/isEmail';


interface EmailValidador {
  isEmail(value: string): boolean;
}

class EmailValidadorAdapter implements EmailValidador {
  isEmail(value: string): boolean {
    return isEmail(value);
  }
}

function validaEmail(emailValidador: EmailValidador, email: string): void {
  if (emailValidador.isEmail(email)) {
    console.log("Email é válido");
  } else {
    console.log("Email é inválido");
  }
}

const email = "pedro099045@gmail.com";
validaEmail(new EmailValidadorAdapter(), email);
