export interface TeacherInterface {
  id?: string | null;
  teacherName: string;
  teacherEmail: string;
  subject?: string[] | null;
  classList?: string[] | null;
  phoneNumber: string;
  address: string;
  profileUrl?: any | null;
  userId?: string | null;
  businessId?: string | null;
}

export class TeacherDTO {
  public readonly teacherName: string;
  public readonly subject: string[];
  public readonly classList: string[];
  public readonly phoneNumber: string;
  public readonly address: string;
  public readonly profileUrl: any;

  constructor(
    teacherName: string,
    subject: string[],
    classList: string[],
    phoneNumber: string,
    address: string,
    profileUrl: any
  ) {
    this.teacherName = teacherName;
    this.subject = subject;
    this.classList = classList;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.profileUrl = profileUrl;
  }
  static fromInputDTO(input: any): TeacherDTO {
    return new TeacherDTO(
      input.teacherName,
      input.subject || [],
      input.classList || [],
      input.phoneNumber || null,
      input.address || null,
      input.profileUrl || null
    );
  }
}
