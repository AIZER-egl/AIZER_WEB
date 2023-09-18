interface User {
    email: string,
    passwordHash: string,
    username: string,
    uuid: string,
    role: 'admin' | 'member' | 'guest',
    lastLogin: Date,
    createdAt: Date,
}

export default User;