const tokens = {
    access: "access_token",
    refresh: "refresh_token",
  };
  
  export type Token = keyof typeof tokens;
  
  export const token = {
    set: (tokenName: Token, token: string) =>
      localStorage.setItem(tokens[tokenName], token),
    delete: (tokenName: Token) => localStorage.removeItem(tokens[tokenName]),
    get: (tokenName: Token) => localStorage.getItem(tokens[tokenName]),
  };
  