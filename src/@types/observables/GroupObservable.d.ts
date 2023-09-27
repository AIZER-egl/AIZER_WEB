import { Group } from "../groups/groups";

interface GroupObservable {
    group: Group;
}

interface GroupsObservable {
    groups: Group[];
}

interface AllGroupObservable {
    groups: Group[];
    externalGroups: Group[];
}

export { GroupObservable, GroupsObservable, AllGroupObservable };