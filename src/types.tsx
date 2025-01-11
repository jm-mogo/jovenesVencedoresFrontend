export type Teen = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "M" | "F";
  phoneNumber: string;
  address: string;
  parentId: number;
  parent: Parent;
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
