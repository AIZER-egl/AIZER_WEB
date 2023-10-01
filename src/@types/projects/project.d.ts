import type { Items } from '../groups/items';
import type { projectCategory } from './projectCategory';

interface Project {
    name: string;
    uuid: string;
    members: string[];
    items: Items[];
    category: projectCategory;
}

interface ProjectReduced {
    name: string;
    uuid: string;
    members: string[];
}