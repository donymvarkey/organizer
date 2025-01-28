import {
  EditIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  LinkIcon,
  Trash2Icon,
  VideoIcon,
} from "lucide-react";
import React, { useState } from "react";
import { formatDate } from "../helpers";
import ContextMenu from "./ContextMenu";

const Items = ({
  _id,
  name,
  description,
  videoLinkCount,
  websiteLinkCount,
  createdAt,
}) => {
  //   const [contextMenuOpen, setContextMenuOpen] = useState(false);

  //   const toggleContextMenu = () => {
  //     setContextMenuOpen((prev) => !prev);
  //   };
  return (
    <>
      <div className="rounded-md shadow-md px-5 py-4 h-full">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-[20px]">{name}</h1>
          {/* <button
            onClick={toggleContextMenu}
            className="hover:bg-zinc-100 p-1 rounded-md"
          >
            <EllipsisVerticalIcon className="w-5 h-5 text-zinc-600" />
          </button> */}
        </div>
        <span className="my-3 text-gray-500 text-sm">{description}</span>
        <div className="flex items-center gap-x-4 mt-5">
          <div className="flex items-center justify-center gap-2">
            <LinkIcon className="w-5 h-5 text-zinc-600" />
            <span>{websiteLinkCount}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <VideoIcon className="w-5 h-5 text-zinc-600" />
            <span>{videoLinkCount}</span>
          </div>
        </div>
        <div className="text-xs text-gray-300 mt-8">
          Created At:{" "}
          <span className="text-gray-400 font-medium">
            {formatDate(createdAt)}
          </span>
        </div>
        {/* {contextMenuOpen && (
          <ContextMenu>
            <div className="flex flex-col items-start justify-start">
              <button className="flex items-center justify-start gap-x-3 hover:bg-gray-200 w-full p-1 rounded">
                <EditIcon className="text-zinc-500 w-5 h-5" />
                <span>Edit</span>
              </button>
              <button className="flex items-center justify-start gap-x-3 hover:bg-gray-200 w-full p-1 rounded">
                <EyeIcon className="text-zinc-500 w-5 h-5" />
                <span>View</span>
              </button>
              <button className="flex items-center justify-start gap-x-3 hover:bg-gray-200 w-full p-1 rounded">
                <Trash2Icon className="text-zinc-500 w-5 h-5" />
                <span>Delete</span>
              </button>
            </div>
          </ContextMenu>
        )} */}
      </div>
    </>
  );
};

export default Items;
