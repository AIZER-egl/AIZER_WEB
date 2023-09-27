import type { User } from '../user/users';
import type { Access } from './access';
import type { Roles } from './roles';

interface Member {
    user: User,
    access: Access[],
    role: Roles,
}

export { Member };