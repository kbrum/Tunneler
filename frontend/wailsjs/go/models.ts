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
  export class CreateSSHSessionRequestDTO {
    ssh_session_name: string;
    ssh_session_ip: string;
    ssh_session_port: number;
    ssh_session_user: string;
    folder_id: string;
    key_id: string;
    ssh_session_auth_type: string;

    static createFrom(source: any = {}) {
      return new CreateSSHSessionRequestDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.ssh_session_name = source['ssh_session_name'];
      this.ssh_session_ip = source['ssh_session_ip'];
      this.ssh_session_port = source['ssh_session_port'];
      this.ssh_session_user = source['ssh_session_user'];
      this.folder_id = source['folder_id'];
      this.key_id = source['key_id'];
      this.ssh_session_auth_type = source['ssh_session_auth_type'];
    }
  }
  export class CreateSSHSessionResponseDTO {
    id: string;
    ssh_session_name: string;
    ssh_session_ip: string;
    ssh_session_port: number;
    ssh_session_user: string;
    ssh_session_status: string;
    ssh_session_auth_type: string;
    last_login: string;

    static createFrom(source: any = {}) {
      return new CreateSSHSessionResponseDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.id = source['id'];
      this.ssh_session_name = source['ssh_session_name'];
      this.ssh_session_ip = source['ssh_session_ip'];
      this.ssh_session_port = source['ssh_session_port'];
      this.ssh_session_user = source['ssh_session_user'];
      this.ssh_session_status = source['ssh_session_status'];
      this.ssh_session_auth_type = source['ssh_session_auth_type'];
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
    session_id: string;

    static createFrom(source: any = {}) {
      return new GetSessionRequestDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.session_id = source['session_id'];
    }
  }
  export class GetSessionResponseDTO {
    id: string;
    ssh_session_name: string;
    ssh_session_ip: string;
    ssh_session_port: number;
    ssh_session_user: string;
    ssh_session_status: string;
    ssh_session_auth_type: string;
    last_login: string;

    static createFrom(source: any = {}) {
      return new GetSessionResponseDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.id = source['id'];
      this.ssh_session_name = source['ssh_session_name'];
      this.ssh_session_ip = source['ssh_session_ip'];
      this.ssh_session_port = source['ssh_session_port'];
      this.ssh_session_user = source['ssh_session_user'];
      this.ssh_session_status = source['ssh_session_status'];
      this.ssh_session_auth_type = source['ssh_session_auth_type'];
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
    ssh_session_name: string;
    ssh_session_ip: string;
    ssh_session_port: number;
    ssh_session_user: string;
    ssh_session_status: string;
    ssh_session_auth_type: string;

    static createFrom(source: any = {}) {
      return new UpdateSessionRequestDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.id = source['id'];
      this.ssh_session_name = source['ssh_session_name'];
      this.ssh_session_ip = source['ssh_session_ip'];
      this.ssh_session_port = source['ssh_session_port'];
      this.ssh_session_user = source['ssh_session_user'];
      this.ssh_session_status = source['ssh_session_status'];
      this.ssh_session_auth_type = source['ssh_session_auth_type'];
    }
  }
  export class UpdateSessionResponseDTO {
    id: string;
    ssh_session_name: string;
    ssh_session_ip: string;
    ssh_session_port: number;
    ssh_session_user: string;
    ssh_session_status: string;
    ssh_session_auth_type: string;

    static createFrom(source: any = {}) {
      return new UpdateSessionResponseDTO(source);
    }

    constructor(source: any = {}) {
      if ('string' === typeof source) source = JSON.parse(source);
      this.id = source['id'];
      this.ssh_session_name = source['ssh_session_name'];
      this.ssh_session_ip = source['ssh_session_ip'];
      this.ssh_session_port = source['ssh_session_port'];
      this.ssh_session_user = source['ssh_session_user'];
      this.ssh_session_status = source['ssh_session_status'];
      this.ssh_session_auth_type = source['ssh_session_auth_type'];
    }
  }
}
