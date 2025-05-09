export interface TeacherInputDTO {
  teacherName: string;
  teacherEmail: string;
  teacherPassword: string;
  subject: string[];
  classList: string[];
  phoneNumber: string;
  address: string;
  profileUrl: any;
}

export class TeacherDTO {
  public readonly teacherName: string;
  public readonly teacherEmail: string;
  public readonly teacherPassword: string;
  public readonly subject: string[];
  public readonly classList: string[];
  public readonly phoneNumber: string;
  public readonly address: string;
  public readonly profileUrl: any;

  constructor(
    teacherName: string,
    teacherEmail: string,
    teacherPassword: string,
    subject: string[],
    classList: string[],
    phoneNumber: string,
    address: string,
    profileUrl: any
  ) {
    this.teacherName = teacherName;
    this.teacherEmail = teacherEmail;
    this.teacherPassword = teacherPassword;
    this.subject = subject;
    this.classList = classList;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.profileUrl = profileUrl;
  }
  static fromInputDTO(input: any): TeacherDTO {
    return new TeacherDTO(
      input.teacherName,
      input.teacherEmail,
      input.teacherPassword,
      input.subject,
      input.classList,
      input.phoneNumber,
      input.address,
      input.profileUrl
    );
  }
}
