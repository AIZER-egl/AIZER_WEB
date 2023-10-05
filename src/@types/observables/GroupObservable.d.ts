import { FullGroup, Group } from "../groups/groups";
import { FullMember, Member } from "../groups/member";

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

interface FullMemberObservable {
    member: FullMember;
}

interface MemberObservable {
    member: Member,
}

export { GroupObservable, GroupsObservable, AllGroupObservable, FullGroupObservable, FullMemberObservable, MemberObservable };
