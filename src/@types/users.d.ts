type Access = 'finance' | 'proyects' | 'inventory';

interface User {
    email: string,
    passwordHash?: string,
    username: string,
    uuid: string,
    role: 'admin' | 'member' | 'guest',
    access: Access[];
    lastLogin: Date,
    createdAt: Date,
}

export default User;