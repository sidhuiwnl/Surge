
import {EllipsisVertical} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"





export function DropdownMenuCheckboxes({
    deleteVideo,
                                       } : {
    deleteVideo : () => Promise<void>,
}) {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <EllipsisVertical className="text-white hover:cursor-pointer"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem

                >
                    Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    onClick={deleteVideo}
                    >
                    Delete
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem

                >
                    Panel
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
