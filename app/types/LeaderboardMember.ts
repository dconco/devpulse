export interface Member {
  user_id: string;
  role: string;
  name: string | null;
  email: string;
  total_seconds: number;
  languages: { name: string }[] | null;
  operating_systems: { name: string }[] | null;
  editors: { name: string }[] | null;
};
