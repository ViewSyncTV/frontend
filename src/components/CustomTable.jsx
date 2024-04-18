import React from "react";

function CustomTable({ children }) {
  // Parse the subcomponents CustomTable.Head, CustomTable.Body
  const [head, body] = React.Children.toArray(children);
  return (
    <div className="overflow-x-auto h-[73vh] shadow-xl z-10">
      <table className="table table-zebra table-pin-rows table-pin-cols">
        {/* head */}
        {head}
        {/* body */}
        {body}
      </table>
    </div>
  );
}

CustomTable.Head = function CustomTableHead({
  children,
}) {
  return <thead className="sticky top-0 z-20">{children}</thead>;
};

CustomTable.Body = function CustomTableBody({
  children,
}) {
  return <tbody>{children}</tbody>;
};

export default CustomTable;
