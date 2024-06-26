import { UserIcon } from "@heroicons/react/24/outline";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
function CustomPhoto(props) {
  return (
    <>
      {props.isAuth ? (
        <div className="avatar placeholder online dropdown dropdown-end">
          <div tabIndex={0} role="button" className="bg-neutral text-neutral-content rounded-full w-10 h-10 m-1 ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={props.authData.picture} className="w-6 h-6" referrerPolicy="no-referrer" />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><LogoutButton setIsAuth={props.setIsAuth} /></li>
          </ul>
        </div>
      ) : (
        <div className="avatar placeholder dropdown dropdown-end">
          <div tabIndex={0} role="button" className="bg-neutral text-neutral-content rounded-full w-10 h-10 m-1 ring ring-secondary ring-offset-base-100 ring-offset-2">
            <UserIcon className="w-6 h-6" />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><LoginButton/></li>
          </ul>
        </div>
      )}
    </>
  );
}

export default CustomPhoto;
