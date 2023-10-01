import type { SchoolInformation } from './schoolInformation';

interface User {
    email: string,
    passwordHash?: string,
    username: string,
    uuid: string,
    groups: string[],
    schoolInformation: SchoolInformation,
    lastLogin: Date,
    createdAt: Date,
    role: 'admin' | 'member', // WARNING: This is not the same as the roles in the groups, ADMIN is a HIGH sensitive role, and should be used with caution
}

interface UserReduced {
    email: string,
    username: string,
    uuid: string,
    groups: string[],
    schoolInformation: SchoolInformation,
    lastOnline: Date,
}

export { User };