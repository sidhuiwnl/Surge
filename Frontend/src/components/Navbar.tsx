
import {NavLink} from "react-router";
import {SignedIn, SignedOut, SignUpButton, UserButton} from "@clerk/clerk-react";
import {useUser} from "@clerk/clerk-react";
import { useEffect} from "react";
import axios from "axios";


export default function Navbar() {

    const { isLoaded, user } = useUser();
    const userDetails = {
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.emailAddresses[0]?.emailAddress,
        image: user?.imageUrl,
    };

    async function addUser() {
        try {
            if (user) {
                const response = await axios.post(`${import.meta.env.VITE_WEBSOCKET_BASE_URL}/api/user/addUser`, userDetails);
                if(response.status === 400) {
                    return
                }
            }
        }catch (error) {
            console.error("Error adding user:", error );
        }
    }

    async function checkUser(){
        if(user && user.id){
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/getuser?id=${user.id}`);

                if(response.status === 200 && !response.data.exists){
                    await addUser();
                }
            }catch (error) {
              console.error("Error adding user:", error);
            }

        }
    }
    useEffect(() => {
        checkUser();
    }, [user]);

    return (
        <div className="flex flex-row items-center justify-around  mx:auto py-5 border-b border-b-neutral-600">
            <NavLink to={"/"} className="text-sm underline">
                Surge
            </NavLink>
            <div className="flex gap-6">
                <NavLink to={"/about"} className="text-sm">
                    About
                </NavLink>
                <NavLink to={"/add"} className="text-sm">
                    Meet
                </NavLink>
                <NavLink to={"/recordings"} className="text-sm">
                    Recordings
                </NavLink>
            </div>
            <div className="w-10 h-10">
                <SignedIn>
                    {!isLoaded ? (
                        <div className="w-10 h-10 rounded-full bg-neutral-200"></div> // Custom fallback UI
                    ) : (
                        <UserButton />
                    )}
                </SignedIn>
                <SignedOut>
                    <SignUpButton>
                        <button className="border-2 border-blue-500 rounded-xl px-4 py-2 text-sm text-white">
                            Register
                        </button>
                    </SignUpButton>
                </SignedOut>
            </div>
        </div>
    );
}
