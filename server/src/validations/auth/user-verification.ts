import Joi from "joi";

export class UserVerificationValidation {

  private payload: Joi.ObjectSchema;

  constructor() { 
    this.setPayload();
  }

  private setPayload(): void {
    this.payload = Joi.object({
      email: Joi.string().email().required().label("Email"),
      otp: Joi.number().required().label("Otp"),
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
