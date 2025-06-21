export interface Register {
   
    email: string;
    password: string;
    confirm_password: string;
   
  }
  export interface Login {
    email: string;
    password: string;
  }

  export interface loginResponse {
    token: string
  }