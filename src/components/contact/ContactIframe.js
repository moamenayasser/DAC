const ContactIframe = ({ item }) => {
  return (
    <iframe
      src={item.IframeSrc}
      width={1000}
      height={450}
      style={{ border: 0, width: "100%", height: "100%" }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      loading="lazy"
      title={item.Branch}
    ></iframe>
  );
};

export default ContactIframe;
