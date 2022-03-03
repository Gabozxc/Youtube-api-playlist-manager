import { useDrag } from 'react-dnd';
import { itemTypes } from './itemTypes';
import Image from "next/image";

const PreviewVideo = ({ title, url,  video}) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: itemTypes.BOX,
        item: { idVideo: video.id.videoId, video:video },
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
    <div ref={drag} role="Box" data-testid={`box-${title}`} className={`${isDragging ? 'border-blue-500' : 'border-transparent'} border w-[250px] m-5 hover:bg-gray-200 flex flex-col rounded-lg`}>
      {url ? (
        <Image
          alt={title}
          src={url}
          width={480}
          height={360}
          className="object-cover w-100 h-100 rounded-lg"
        />
      ) : ''}
      <h2 className="mb-4 mt-4 font-bold">{title}</h2>
    </div>
  );
};

export default PreviewVideo;
