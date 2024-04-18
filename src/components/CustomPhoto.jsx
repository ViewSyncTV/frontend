import { UserIcon } from "@heroicons/react/24/outline";

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
        <div className="avatar placeholder btn btn-circle" onClick={login}>
          <div className="bg-neutral text-neutral-content rounded-full w-10 h-10 m-1 ring ring-primary ring-offset-base-100 ring-offset-2">
            <UserIcon className="w-6 h-6" />
          </div>
        </div>
      )}
    </>
  );
}

function login() {
  console.log("Login");
}

export default CustomPhoto;
