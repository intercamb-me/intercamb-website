/* tslint:disable:variable-name */

export class FamilyMemberData {

  public name: string;
  public email: string;
  public phone: string;

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone;
    }
  }
}
