import { useState } from "react";
import { useDrag } from "react-dnd";
import Image from "next/image";

import { itemTypes } from "./types/itemTypes";

const PreviewVideo = ({ title, url, video, videoSelect, setVideoSelect }) => {
  
  const [active, setActive] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: itemTypes.BOX,
    item: { idVideo: video.id.videoId, video: video },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div
      ref={drag}
      role="Box"
      data-testid={`box-${title}`}
      onClick={() => {
        if (videoSelect) {
          if (!active) {
            setVideoSelect([...videoSelect, video]);
            setActive(true);
          } else {
            setVideoSelect(
              videoSelect.filter(
                (videos) => videos.id.videoId !== video.id.videoId
              )
            );
            setActive(false);
          }
        }
      }}
      className={`border w-[250px] m-0 p-1 sm:p-3 sm:m-5 hover:bg-gray-200 flex flex-col rounded-lg shadow-md ${
        isDragging
          ? "border-blue-500 cursor-grabbing"
          : "border-transparent cursor-grab"
      } ${active && "bg-gray-300"}`}
    >
      {url ? (
        <Image
          alt={title}
          src={url}
          width={480}
          height={360}
          className="object-cover w-100 h-100 rounded-lg"
        />
      ) : (
        ""
      )}
      <h2 className="mb-4 mt-4 font-bold">{title}</h2>
    </div>
  );
};

export default PreviewVideo;
