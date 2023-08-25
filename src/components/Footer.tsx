import Link from "next/link";

const Footer = () => {
  const className = "text-[#999999] md:text-lg";

  return (
    <footer className="w-full flex items-center justify-center gap-2 text-[#999999]">
      <Link
        href="https://victoribironke.netlify.app"
        className={className}
        target="_blank"
      >
        Creator
      </Link>
      •
      <Link
        href="https://twitter.com/tededsummarized"
        className={className}
        target="_blank"
      >
        Twitter
      </Link>
      •
      <Link href="https://ed.ted.com" className={className} target="_blank">
        Ted-Ed
      </Link>
    </footer>
  );
};

export default Footer;
