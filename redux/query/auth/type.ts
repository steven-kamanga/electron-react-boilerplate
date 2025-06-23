export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  userInfo: {
    userId: string;
    username: string;
    email: string;
    role: string;
    businesses: Business[];
  };
};

export type UserRegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth: string;
  countryOfResidence: string;
  phoneNumber: string;
  nationalId: string;
};

export type Business = {
  id: number;
  businessName: string;
  businessResidence: string;
  annualIncome: number;
  businessEmail: string;
  businessPhoneNumber: string;
  businessWeb: string;
  businessVatNumber: string;
  numberOfEmployees: number;
  tin: string;
  businessRegistrationCertificate: string;
  userId: string;
};

export type ErrorResponse = {
  code: string;
  message: string;
  status: number;
  validationErrors?: {
    [key: string]: string;
  };
};
