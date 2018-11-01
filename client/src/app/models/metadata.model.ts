/* tslint:disable:variable-name */

export class Metadata {

  public messages_sent: Set<string>;

  constructor(data?: any) {
    if (data) {
      this.messages_sent = new Set();
      if (data.messages_sent) {
        (data.messages_sent as any[]).forEach((messageSent) => {
          this.messages_sent.add(messageSent);
        });
      }
    }
  }
}
