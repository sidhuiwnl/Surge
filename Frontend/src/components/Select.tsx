import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";

export default function SelectDemo() {
    return (
        <div className="w-[100px] space-y-1">
            <Label htmlFor="select-07">Select with gray background (native)</Label>
            <SelectNative id="select-07" className="border-transparent bg-muted shadow-none">
                <option value="s1" className="roboto-mono-new">Google Meet</option>
                <option value="s2" className="roboto-mono-new">Zoom</option>
                <option value="s3" className="roboto-mono-new">Teams</option>
                {/*<option value="s4">Gatsby</option>*/}
            </SelectNative>
        </div>
    );
}
