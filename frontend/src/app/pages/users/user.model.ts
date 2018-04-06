export class User {
  id: number;
  username: string;
  password: string;
  // User profile
  first_name: string;
  last_name: string;
  birthday: Object;
  gender: string;
  picture: string;
  // User work
  company: string;
  position: string;
  // User Contacts
  email: string;
  phone_no: string;
  address: string;
  // user social
  facebook: string;
  twitter: string;
  google: string;
  // user settings
  is_active: boolean;
  is_blocked: boolean;
}
/*
export class UserProfile {
  first_name: string;
  last_name: string;
  birthday: Object;
  gender: string;
  picture: string;
}

export class UserWork {
  company: string;
  position: string;
}

export class UserContacts {
  email: string;
  phone: string;
  address: string;
}

export class UserSocial {
  facebook: string;
  twitter: string;
  google: string;
}

export class UserSettings {
  is_active: boolean;
  is_blocked: boolean;
}
*/
