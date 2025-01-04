class TeachersDTO {
  public readonly teacherName: string;
  public readonly teacherId: string;
  public readonly subject: string[];
  public readonly classList: string[];
  public readonly phone: string;
  public readonly address: string;
  public readonly profilePhoto: string | undefined | any;

  constructor(
    teacherName: string,
    teacherId: string,
    subject: string[],
    classList: string[],
    phone: string,
    address: string,
    profilePhoto: string | undefined | any
  ) {
    if (!teacherName || typeof teacherName !== "string") {
      throw new Error("Invalid teacher name");
    }
    if (!teacherId || typeof teacherId !== "string") {
      throw new Error("Invalid teacher ID");
    }
    if (!Array.isArray(subject)) {
      throw new Error("Invalid subject. Expected an array of strings.");
    }
    if (!Array.isArray(classList)) {
      throw new Error("Invalid classList. Expected an array of strings.");
    }
    if (!phone || typeof phone !== "string") {
      throw new Error("Invalid phone. Expected a string.");
    }
    if (!address || typeof address !== "string") {
      throw new Error("Invalid address. Expected a string.");
    }

    this.teacherName = teacherName;
    this.teacherId = teacherId;
    this.subject = subject;
    this.classList = classList;
    this.phone = phone;
    this.address = address;
    this.profilePhoto = profilePhoto;
  }
  static fromJSON(json: {
    teacherName: string;
    teacherId: string;
    subject: string[];
    classList: string[];
    phone: string;
    address: string;
    profilePhoto: string | undefined;
  }): TeachersDTO {
    return new TeachersDTO(
      json.teacherName,
      json.teacherId,
      json.subject,
      json.classList,
      json.phone,
      json.address,
      json.profilePhoto
    );
  }
}

export default TeachersDTO;
