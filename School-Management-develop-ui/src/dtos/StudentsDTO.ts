export interface StudentInputDTO {
  studentName: string;
  studentEmail: string;
  studentPassword: string;
  subject: string[];
  classList: string[];
  phoneNumber: string;
  address: string;
  profileUrl: any;
}

export class StudentDTO {
  public readonly studentName: string;
  public readonly studentEmail: string;
  public readonly studentPassword: string;
  public readonly subject: string[];
  public readonly classList: string[];
  public readonly phoneNumber: string;
  public readonly address: string;
  public readonly profileUrl: any;

  constructor(
    studentName: string,
    studentEmail: string,
    studentPassword: string,
    subject: string[],
    classList: string[],
    phoneNumber: string,
    address: string,
    profileUrl: any
  ) {
    this.studentName = studentName;
    this.studentEmail = studentEmail;
    this.studentPassword = studentPassword;
    this.subject = subject;
    this.classList = classList;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.profileUrl = profileUrl;
  }
  static fromInputDTO(input: any): StudentDTO {
    return new StudentDTO(
      input.studentName,
      input.studentEmail,
      input.studentPassword,
      input.subject,
      input.classList,
      input.phoneNumber,
      input.address,
      input.profileUrl
    );
  }
}
