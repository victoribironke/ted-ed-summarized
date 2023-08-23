import Link from "next/link";

const Footer = () => {
  const className = "text-[#999999] md:text-lg";

  return (
    <footer className="w-full flex items-center justify-center gap-2 text-[#999999]">
      <Link
        href="https://victoribironke.com"
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
      <Link
        href="https://github.com/victoribironke/ted-ed-summarized"
        className={className}
        target="_blank"
      >
        Github
      </Link>
    </footer>
  );
};

export default Footer;
