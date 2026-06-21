const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="w-full background-color-secondary">
      <footer className="content-container flex justify-center">
        <p className="font-poppins text-xs text-slate-400 py-4">
          © UA {year} Shon | This is a demo project.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
