"use client"

import { Trombigroup } from "@/datas/trombis";
import CardMemberComponent from "../atoms/CardMember";
import EmptyMemberComponent from "../atoms/EmptyMember";
import UploadModal from "../organisms/UploadForm";

interface GroupContainerProps {
    trombiGroup: Trombigroup
}

export default function GroupContainerComponent({trombiGroup}: GroupContainerProps) {
    return (
        <div className="w-full p-4 border-2 border-blue-700">
            <h2 className="mb-2" contentEditable>{trombiGroup.name}</h2>
            <div className="flex flex-wrap gap-2">
                {trombiGroup.members.map((member, index) => (
                    <CardMemberComponent key={index} trombiMember={member} />
                ))}
                <UploadModal />
            </div>
        </div>
    );
}