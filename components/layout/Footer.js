import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-blue-500 p-5">
      <div className="flex justify-between items-center	">
        <Link href="/">
          <a className="text-white text-lg font-bold">Playlist Manager</a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
