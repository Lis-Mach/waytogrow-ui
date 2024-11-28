export interface IUser {
    login: string;
    password: string;
    name: string;
    surname: string;
    email: string;
  }
  
 export interface IUserWithID extends IUser {
      id: number;
}

export interface ILogin {
    login: string;
    password: string;
}