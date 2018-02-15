export class User {
  constructor(public username: string,
              public password: string,
              public remamberMe?: boolean,
              public role?: string) {}
}
