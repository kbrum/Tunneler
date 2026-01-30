export namespace dto {
  export class AuthStatusResponseDTO {
    id: string;
    email: string;
    auth: boolean;

    static createFrom(source: any = {}) {
      return new AuthStatusResponseDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.id = source['id'];
      this.email = source['email'];
      this.auth = source['auth'];
    }
  }
  export class CreateUserRequestDTO {
    name: string;
    email: string;
    password: string;

    static createFrom(source: any = {}) {
      return new CreateUserRequestDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.name = source['name'];
      this.email = source['email'];
      this.password = source['password'];
    }
  }
  export class CreateUserResponseDTO {
    id: string;
    name: string;
    email: string;

    static createFrom(source: any = {}) {
      return new CreateUserResponseDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.id = source['id'];
      this.name = source['name'];
      this.email = source['email'];
    }
  }
  export class LoginRequestDTO {
    email: string;
    password: string;

    static createFrom(source: any = {}) {
      return new LoginRequestDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.email = source['email'];
      this.password = source['password'];
    }
  }
  export class LoginResponseDTO {
    id: string;
    name: string;
    email: string;

    static createFrom(source: any = {}) {
      return new LoginResponseDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.id = source['id'];
      this.name = source['name'];
      this.email = source['email'];
    }
  }
}
