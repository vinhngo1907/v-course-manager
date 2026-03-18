export interface AuthDTO {
  username: string;
  email: string;
  fullName: string;
  password?: string;
}

export interface LoginDataDto {
  userId: string;
  username: string;
  email: string;
  fullName: string;
}
