import Joi from "joi";

export class UserResendValidation {

  private payload: Joi.ObjectSchema;

  constructor() { 
    this.setPayload();
  }

  private setPayload(): void {
    this.payload = Joi.object({
      email: Joi.string().email().required().label("Email"),
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
