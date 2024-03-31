export interface Role {
    name: string;
    permissions: string[];
    assignedClasses?: { className: string; assignedSubjects: string[] }[];
}

interface Gender {
    value: string;
    label: string;
}

export interface RegisterFormProps {
    roles: Role[];
    genders: Gender[];
}