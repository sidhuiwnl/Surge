
import HomeSection from "./components/HomeSection.tsx";
import BuiltWith from "@/components/BuiltWith.tsx";
import {NonVideoCard} from "@/components/MarqueeComp.tsx";

export default function App() {
    return (
       <div className="flex flex-col space-y-5">
           <HomeSection/>
           <BuiltWith/>
           <NonVideoCard/>
       </div>
    );
}