function CustomPhoto(props) {
  // userName = "Giulian Biolo", we want to get "GB"
  const userInitialsName = "GB"//props.userName.split(" ").map((n) => n[0]).join("")

  return (
    <div className="avatar placeholder online">
      <div className="bg-neutral text-neutral-content rounded-full w-10 h-10 m-1 ring ring-primary ring-offset-base-100 ring-offset-2">
        <span className="text-lg">{userInitialsName}</span>
      </div>
    </div>
  );
}

export default CustomPhoto;
