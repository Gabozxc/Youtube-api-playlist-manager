import Image from "next/image";
import Link from "next/link";

const PreviewPlaylist = ({ title, url, id }) => {
  return (
    <Link href={`/playlist/${id}`}>
      <a className="w-[250px] m-5 hover:bg-gray-200 p-2 flex flex-col rounded-lg">
        <h2 className="mb-4 mt-4 font-bold">{title}</h2>
        <Image
          alt={title}
          src={url}
          width={480}
          height={360}
          className="object-cover w-100 h-100 rounded-lg"
        />
      </a>
    </Link>
  );
};

export default PreviewPlaylist;
