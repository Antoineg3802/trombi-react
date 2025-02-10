export interface Trombi {
    name: string
    nameSimplified: string
    groups: Array<Trombigroup>
}

export interface Trombigroup {
    name: string,
    members: Array<TrombiMember>
}

export interface TrombiMember{
    name: string,
    group: string
}