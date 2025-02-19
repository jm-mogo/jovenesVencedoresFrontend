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
  seasonId: number;
  points: PointRecord[];
  attendances: Attendance[];
};

export type Attendance = {
  id: number;
  meetingId: number;
  present: boolean;
};

export type Membership = {
  id: number;
  teamId: number;
  teenId: number;
  teen: {
    firstName: string;
    lastName: string;
  };
};

export type PointRecord = {
  id: number;
  points: number;
  meetingId: number;
  teamId: number;
  team: Team;
};

export type Group = {
  id: number;
  name: string;
  churchName: string;
  users: User[];
};

export type User = {
  id: number;
  username: string;
  password: string;
  groupId: number;
  role: Role;
};

type Role = "primaryOwner" | "owner" | "admin" | "viewer";
