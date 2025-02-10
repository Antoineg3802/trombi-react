"use client"

import { Trombigroup } from "@/datas/trombis";
import CardMemberComponent from "../atoms/CardMember";

interface GroupContainerProps {
    trombiGroup: Trombigroup
}

export default function GroupContainerComponent({trombiGroup}: GroupContainerProps) {
    return (
        <div className="w-1/2 p-4 border-2 border-blue-700">
            <h2 className="mb-2">{trombiGroup.name}</h2>
            <div className="flex gap-2">
                {trombiGroup.members.map((member, index) => (
                    <CardMemberComponent key={index} trombiMember={member} />
                ))}
            </div>
        </div>
    );
}