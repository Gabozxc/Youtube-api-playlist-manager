import Image from "next/image";

const PreviewVideo = ({ data, title, url }) => {
  return (
    <div className="w-[250px] m-5 hover:bg-gray-200 p-2 flex flex-col rounded-lg">
      <h2 className="mb-4 mt-4 font-bold">{title}</h2>
      {console.log(url)}
      {url ? (
        <Image
          alt={title}
          src={url}
          width={480}
          height={360}
          className="object-cover w-100 h-100 rounded-lg"
        />
      ) : ''}
    </div>
  );
};

export default PreviewVideo;
