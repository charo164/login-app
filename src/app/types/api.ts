export interface User {
  _id: number;
  name: string;
  email: string;
  password?: string;
  bio: string;
  picture: string;
  phone?: string;
}

export interface API_RESPONSE<T> {
  data: T;
  message: string;
}
