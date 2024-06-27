import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";


function CustomCard({ title, description, channel, airing_in, color = "bg-warning", image_path, xmark, xmarkHandler, url }) {
  return (
    <div onClick={() => { window.open(url, '_blank').focus(); }} className="hover:opacity-85">
      <div className={`card aspect-square min-h-72 ${image_path ? "image-full p-0" : ""} text-primary-content ${color}`}>
        {image_path ? <figure><img src={image_path} className="w-[54rem] h-[32rem] object-cover" /></figure> : <></>}
        <div className="card-body">
          {xmark ?
          <div className="card-actions justify-end group">
            <button className="border-red-600 border p-1 group-hover:border-red-500 rounded-full absolute top-3 right-3">
              <XMarkIcon width="1rem" height="1rem" className="stroke-red-600 group-hover:stroke-red-500" onClick={(e) => { e.preventDefault(); e.stopPropagation(); xmarkHandler(); }} />
            </button>
          </div>
          : <></>}
          <h2 className="card-title">{title}</h2>
          <div className="divider divider-neutral my-0"></div>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <p className="text-sm text-left">{channel}</p>
            <p className="text-sm text-right">{airing_in}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomCard;
