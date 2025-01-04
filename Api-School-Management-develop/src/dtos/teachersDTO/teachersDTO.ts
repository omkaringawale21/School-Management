export interface TeachersI {
  id?: string;
  fullname?: string;
  profileUrl?: string;
  email?: string;
  phoneNumber?: number;
  businessId?: string;
  userId?: string;
  classList?: string[];
  subject?: string[];
}

export class TeachersDTO {
  private teacherEmail: string;
  private teacherName: string;
  private teacherPassword: string;
  private teacherId: string;
  private subject?: string[] | any = [];
  private classList?: string[] | any = [];
  private phone: string;
  private address: string;
  private profilePhoto: string;

  constructor(
    teacherEmail: string,
    teacherName: string,
    teacherPassword: string,
    teacherId: string,
    subject: string[] | any,
    classList: string[] | any,
    phone: string,
    address: string,
    profilePhoto: string
  ) {
    this.teacherEmail = teacherEmail;
    this.teacherName = teacherName;
    this.teacherPassword = teacherPassword;
    this.teacherId = teacherId;
    this.subject = subject;
    this.classList = classList;
    this.phone = phone;
    this.address = address;
    this.profilePhoto = profilePhoto;
  }
}
