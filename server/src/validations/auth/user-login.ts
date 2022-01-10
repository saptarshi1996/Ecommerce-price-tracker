import Joi from "joi";

export class UserLoginValidation {

  private payload: Joi.ObjectSchema;

  constructor() { 
    this.setPayload();
  }

  private setPayload(): void {
    this.payload = Joi.object({
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().required().label("Password"),
    });
  }

  private getPayload(): Joi.ObjectSchema {
    return this.payload;
  }

  public getSchema(): Object {
    return {
      payload: this.getPayload(),
    };
  }

}
