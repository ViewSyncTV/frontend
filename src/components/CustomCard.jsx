import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";


function CustomCard({ title, description, channel, airing_in, color = "bg-warning" }) {
  return (
    <div className={`card aspect-square min-h-72 text-primary-content ${color}`}>
      <div className="card-body">
        <div className="card-actions justify-end group">
          <button className="border-neutral border p-2 group-hover:border-red-500 rounded-full absolute top-4 right-4">
            <XMarkIcon width="1rem" height="1rem" className="stroke-black group-hover:stroke-red-500" />
          </button>
        </div>
        <h2 className="card-title">{title}</h2>
        <div className="divider divider-neutral my-0"></div>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <p className="text-sm text-left">{channel}</p>
          <p className="text-sm text-right">{airing_in}</p>
        </div>
      </div>
    </div>
  );
}

export default CustomCard;
