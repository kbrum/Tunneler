export namespace dto {
  export class CreateUserRequest {
    name: string;
    email: string;
    password: string;

    static createFrom(source: any = {}) {
      return new CreateUserRequest(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.name = source['name'];
      this.email = source['email'];
      this.password = source['password'];
    }
  }
  export class CreateUserResponse {
    id: string;
    name: string;
    email: string;

    static createFrom(source: any = {}) {
      return new CreateUserResponse(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.id = source['id'];
      this.name = source['name'];
      this.email = source['email'];
    }
  }
  export class LoginRequest {
    email: string;
    password: string;

    static createFrom(source: any = {}) {
      return new LoginRequest(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.email = source['email'];
      this.password = source['password'];
    }
  }
  export class LoginResponse {
    id: string;
    name: string;
    email: string;

    static createFrom(source: any = {}) {
      return new LoginResponse(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.id = source['id'];
      this.name = source['name'];
      this.email = source['email'];
    }
  }
}
