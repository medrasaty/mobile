export interface School {
  id: number;
  name: string;
  city: string;
  address: string;
  background: string | null;
  biography: string;
  location: string;
  logo: string;
  type: SchoolType;
}

export interface DetailSchool extends School {
  members_count: number;
  total_reputation: number;
}

export type SchoolType = "paid" | "free";
