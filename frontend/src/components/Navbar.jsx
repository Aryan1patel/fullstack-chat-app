import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">ZeroWords</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-soft btn-circle gap-2 transition-colors
              
              `}
            >
              <Settings className="size-8 hover:rotate-45 transform transition-all duration-300 " />
             
            </Link>

            {authUser && ( // if user is authenticated then show profile and logout button
              <>
                {/* <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">
                    Profile {authUser.fullName}
                  </span>
                </Link> */}


                <Link to={"/profile"} >

                <div className="flex flex-col items-center gap-4">
                  <div className="relative hover:scale-105 transform transition-all duration-200">
                    <img
                      src={authUser.profilePic || "/avatar.jpg"}
                      alt="Profile"
                      className="size-12 rounded-full object-cover border-2 "
                    />
                  </div>
                </div>

                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
