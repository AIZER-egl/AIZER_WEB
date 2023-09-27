import type { Campus } from '../user/campus';
import type { Items } from './items';
import { Log } from './log';

interface Group {
    name: string;
    uuid: string;
    members: string[];
    membersRequests: string[];
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

export type { Group, GroupReduced };