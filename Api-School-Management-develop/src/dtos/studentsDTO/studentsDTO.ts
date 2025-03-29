export interface StudentInterface {
  id?: string | null;
  studentName: string;
  studentEmail: string;
  subject?: string[] | null;
  classList?: string[] | null;
  phoneNumber: string;
  address: string;
  profileUrl?: any | null;
  userId?: string | null;
  businessId?: string | null;
}

export class StudentDTO {
  public readonly studentName: string;
  public readonly subject: string[];
  public readonly classList: string[];
  public readonly phoneNumber: string;
  public readonly address: string;
  public readonly profileUrl: any;

  constructor(
    studentName: string,
    subject: string[],
    classList: string[],
    phoneNumber: string,
    address: string,
    profileUrl: any
  ) {
    this.studentName = studentName;
    this.subject = subject;
    this.classList = classList;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.profileUrl = profileUrl;
  }
  static fromInputDTO(input: any): StudentDTO {
    return new StudentDTO(
      input.teacherName,
      input.subject || [],
      input.classList || [],
      input.phoneNumber || null,
      input.address || null,
      input.profileUrl || null
    );
  }
}
