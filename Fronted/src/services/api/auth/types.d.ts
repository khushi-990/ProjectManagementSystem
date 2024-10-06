export interface ISignInReq {
  email: string;
  password: string;
}

export interface IRegisterReq {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

export interface ISignInRes extends IRegisterReq {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  userType: string;
  accessToken: string;
  createdAt: string;
  updatedAt: string;
}
