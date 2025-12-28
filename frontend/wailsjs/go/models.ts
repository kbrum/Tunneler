export namespace dto {
  export class LogoutRequest {
    access_token: string;

    static createFrom(source: any = {}) {
      return new LogoutRequest(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.access_token = source['access_token'];
    }
  }
  export class SessionResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user_email: string;

    static createFrom(source: any = {}) {
      return new SessionResponse(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.access_token = source['access_token'];
      this.refresh_token = source['refresh_token'];
      this.expires_in = source['expires_in'];
      this.user_email = source['user_email'];
    }
  }
}
