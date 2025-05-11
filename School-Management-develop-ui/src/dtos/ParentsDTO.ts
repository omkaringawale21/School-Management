export interface ParentsInterface {
  id?: string | null;
  parentname: string;
  email: string;
  phoneNumber: number;
  address: string;
  businessId: string;
  studentId: string;
  userId: string;
}

export class ParentsDTO {
  public readonly parentname: string;
  public readonly email: string;
  public readonly phoneNumber: number;
  public readonly studentId: string;
  public readonly parentPassword: string;
  public readonly address: string;

  constructor(
    parentname: string,
    email: string,
    phoneNumber: number,
    studentId: string,
    parentPassword: string,
    address: string
  ) {
    this.parentname = parentname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.studentId = studentId;
    this.parentPassword = parentPassword;
    this.address = address;
  }

  static fromInputDTO(input: any): ParentsDTO {
    return new ParentsDTO(
      input.parentname,
      input.email,
      input.phoneNumber || null,
      input.studentId,
      input.parentPassword,
      input.address
    );
  }
}
