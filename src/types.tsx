export type Teen = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
};

export type Parent = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type Season = {
  name: string;
  Teens: [];
  Meating: [];
  Members: [];
};
