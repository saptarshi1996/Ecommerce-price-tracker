import Joi from "joi";

export class UserDetailsValidation {

  private headers: Joi.ObjectSchema;

  constructor() { 
    this.setHeaders();
  }

  private setHeaders(): void {
    this.headers = Joi.object({
      authorization: Joi.string().required().label("Headers"),
    }).options({ allowUnknown: true });
  }

  private getHeaders(): Joi.ObjectSchema {
    return this.headers;
  }

  public getSchema(): Object {
    return {
      headers: this.getHeaders(),
    };
  }

}
