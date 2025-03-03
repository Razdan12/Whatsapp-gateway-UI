export interface Register {
   
    username: string;
    password: string;
   
  }
  export interface Login {
    email: string;
    password: string;
  }

  export interface loginResponse {
    token: string
  }