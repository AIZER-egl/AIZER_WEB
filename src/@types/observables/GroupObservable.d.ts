import { FullGroup, Group } from "../groups/groups";

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

interface FullGroupObservable {
    group: FullGroup;
}

export { GroupObservable, GroupsObservable, AllGroupObservable, FullGroupObservable };