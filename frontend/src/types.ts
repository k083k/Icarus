export interface Title {
    value: string;
    label: string;
}

export interface Suffix {
    value: string;
    label: string;
}

export interface Gender {
    value: string;
    label: string;
}

export interface Grade {
    value: string;
    label: string;
}

export interface Role {
    name: string;
    permissions: string[];
    assignedClasses?: { className: string; assignedSubjects: string[] }[];
}

export interface Gender {
    value: string;
    label: string;
}

export interface Teacher {
    _id: string;
    first_name: string;
    last_name: string;
    address: string;
    email: string;
    password: string;
    role: {
        _id: string;
        name: string;
    };
    gender: string;
    __v: number;
}

export interface Admin {
    _id: string;
    first_name: string;
    last_name: string;
    address: string;
    email: string;
    password: string;
    role: {
        _id: string;
        name: string;
    };
    gender: string;
    __v: number;
}

export interface Student {
    _id: string;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    address: string;
    parentName: string;
    gender: string;
    grade_class: string;
    __v: number;
}



export interface RegisterFormProps {
    roles: Role[];
    genders: Gender[];
}

export interface AvatarProps {
    auth: boolean;
}