class SignInDTO {
  public readonly email: string;
  public readonly password: string;

  constructor(email: string, password: string) {
    if (!email || typeof email !== "string") {
      throw new Error("Invalid email");
    }
    if (!password || typeof password !== "string") {
      throw new Error("Invalid password");
    }

    this.email = email;
    this.password = password;
  }

  static fromJSON(json: { email: string; password: string }): SignInDTO {
    return new SignInDTO(json.email, json.password);
  }
}

export default SignInDTO;
