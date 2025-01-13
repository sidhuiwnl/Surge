
import {useNavigate} from "react-router";
import { useSession } from "@clerk/clerk-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const { session,isLoaded } = useSession();

    if (isLoaded && !session?.user) {
        // Redirect to the home page if the user is not authenticated
        navigate("/login");
    }

    return <>{children}</>;
}
