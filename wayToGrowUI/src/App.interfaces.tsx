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

export interface IPlan{
    title: string;
    description: string;
    image: string;
}

export interface IPlanWithID extends IPlan{
    id: number;
}

export interface IStep{
    order: number;
    title: string;
    subtitle: string;
    description: string;
}

export interface IStepWithID extends IStep{
    id: number;
}