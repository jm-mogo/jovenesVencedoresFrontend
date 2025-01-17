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
  id: number;
  name: string;
  teams: Team[];
  meetings: [];
  members: [];
};

export type Team = {
  id: number;
  name: string;
  seasonId: number;
  teamMemberships: [];
  points: [];
};

export type Meeting = {
  id: number;
  date: string;
  points: PointRecord[];
  attendances: Attendance[];
};

export type PointRecord = {
  id: number;
  points: number;
  meetingId: number;
  teamId: number;
};

export type Attendance = {
  id: number;
  meetingId: number;
  present: boolean;
};
