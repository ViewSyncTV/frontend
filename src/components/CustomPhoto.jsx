import { UserIcon } from "@heroicons/react/24/outline";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
function CustomPhoto(props) {
  return (
    <>
      {props?.idToken !== "" ? (
        <div className="avatar placeholder online">
          <div className="bg-neutral text-neutral-content rounded-full w-10 h-10 m-1 ring ring-primary ring-offset-base-100 ring-offset-2">
            <UserIcon className="w-6 h-6" />
          </div>
        </div>
      ) : (
        <div className="avatar placeholder dropdown dropdown-end">
          <div tabIndex={0} role="button" className="bg-neutral text-neutral-content rounded-full w-10 h-10 m-1 ring ring-primary ring-offset-base-100 ring-offset-2">
            <UserIcon className="w-6 h-6" />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><LoginButton/></li>
          <li><LogoutButton/></li>
          </ul>
        </div>
      )}
    </>
  );
}

function login() {
  console.log("Login");
}

export default CustomPhoto;
