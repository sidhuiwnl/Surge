import { Navigate } from "react-router";

import { useSession } from "@clerk/clerk-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { session,isLoaded } = useSession();

    if (isLoaded && !session?.user) {
        // Redirect to the home page if the user is not authenticated
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}
