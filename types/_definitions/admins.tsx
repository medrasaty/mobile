export interface Admin {
    id:                number;
    username:          string;
    name:              string;
    email:             string;
    father_name:       string;
    grand_father_name: string;
    family_name:       string;
    full_name:         string;
    type:              Type;
    school:            number;
    school_name:       string;
    gender:            Gender;
    is_superuser:      boolean;
    reputation_points: number;
}

export enum Gender {
    F = "F",
    M = "M",
}

export enum Type {
    Admin = "ADMIN",
}
