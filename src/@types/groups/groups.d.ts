import type { Campus } from '../user/campus';
import { User } from '../user/users';
import type { Items } from './items';
import { Log } from './log';
import { Member, FullMember } from './member';

interface Group {
    [key: string]: any;
    name: string;
    uuid: string;
    members: Member[];
    membersRequests: string[];
    items: Items[];
    campus: Campus;
    logHistory: Log[];
    lastModified: Date;
    createdAt: Date;
}

interface FullGroup {
    [key: string]: any;
    name: string;
    uuid: string;
    members: FullMember[];
    membersRequests: User[];
    items: Items[];
    campus: Campus;
    logHistory: Log[];
    lastModified: Date;
    createdAt: Date;
}

interface GroupReduced {
    name: string;
    uuid: string;
    members: string[];
}

export type { Group, GroupReduced, FullGroup };