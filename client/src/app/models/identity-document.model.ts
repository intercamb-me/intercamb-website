/* tslint:disable:variable-name */

export class IdentityDocument {

  public number: string;
  public issuing_authority: string;
  public state: string;

  constructor(data?: any) {
    if (data) {
      this.number = data.number;
      this.issuing_authority = data.issuing_authority;
      this.state = data.state;
    }
  }
}
