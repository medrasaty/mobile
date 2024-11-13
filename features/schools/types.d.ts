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

export type SchoolType = "paid" | "free";
