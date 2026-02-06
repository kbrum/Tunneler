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
  export class CreateSessionRequestDTO {
    name: string;
    ip: string;
    port: number;
    user: string;
    password: string;
    folder_id: string;
    key_id: string;
    auth_type: string;

    static createFrom(source: any = {}) {
      return new CreateSessionRequestDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.name = source['name'];
      this.ip = source['ip'];
      this.port = source['port'];
      this.user = source['user'];
      this.password = source['password'];
      this.folder_id = source['folder_id'];
      this.key_id = source['key_id'];
      this.auth_type = source['auth_type'];
    }
  }
  export class CreateSessionResponseDTO {
    id: string;
    name: string;
    ip: string;
    port: number;
    user: string;
    status: string;
    auth_type: string;
    last_login: string;

    static createFrom(source: any = {}) {
      return new CreateSessionResponseDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.id = source['id'];
      this.name = source['name'];
      this.ip = source['ip'];
      this.port = source['port'];
      this.user = source['user'];
      this.status = source['status'];
      this.auth_type = source['auth_type'];
      this.last_login = source['last_login'];
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
  export class GetSessionRequestDTO {
    id: string;

    static createFrom(source: any = {}) {
      return new GetSessionRequestDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.id = source['id'];
    }
  }
  export class GetSessionResponseDTO {
    id: string;
    name: string;
    ip: string;
    port: number;
    user: string;
    status: string;
    auth_type: string;
    last_login: string;

    static createFrom(source: any = {}) {
      return new GetSessionResponseDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.id = source['id'];
      this.name = source['name'];
      this.ip = source['ip'];
      this.port = source['port'];
      this.user = source['user'];
      this.status = source['status'];
      this.auth_type = source['auth_type'];
      this.last_login = source['last_login'];
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
  export class UpdateSessionRequestDTO {
    id: string;
    name: string;
    password: string;
    ip: string;
    port: number;
    user: string;
    status: string;
    auth_type: string;

    static createFrom(source: any = {}) {
      return new UpdateSessionRequestDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.id = source['id'];
      this.name = source['name'];
      this.password = source['password'];
      this.ip = source['ip'];
      this.port = source['port'];
      this.user = source['user'];
      this.status = source['status'];
      this.auth_type = source['auth_type'];
    }
  }
  export class UpdateSessionResponseDTO {
    id: string;
    name: string;
    ip: string;
    port: number;
    user: string;
    status: string;
    auth_type: string;

    static createFrom(source: any = {}) {
      return new UpdateSessionResponseDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.id = source['id'];
      this.name = source['name'];
      this.ip = source['ip'];
      this.port = source['port'];
      this.user = source['user'];
      this.status = source['status'];
      this.auth_type = source['auth_type'];
    }
  }
}
