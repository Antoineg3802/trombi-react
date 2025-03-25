export interface Trombi {
    name: string
    nameSimplified: string
    groups: Array<Trombigroup>
    description: string
}

export interface Trombigroup {
    name: string,
    members: Array<TrombiMember>
    description: string
}

export interface TrombiMember{
    name: string,
    group: string
}