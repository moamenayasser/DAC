import { forwardRef, useState } from "react";
import Image from "next/image";
import PlaceholderImg from "/public/images/placeholderDAC.webp";

const NextImage = forwardRef((props, ref) => {
  const { src, alt, width, height, placeholder, ...other } = props;

  const [imgSrc, setImgSrc] = useState(src);

  if (src) {
      return (
        <Image
          ref={ref}
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          onError={() => setImgSrc(PlaceholderImg.src)}
          {...(placeholder
            ? {
                placeholder,
                blurDataURL: PlaceholderImg.src,
              }
            : {})}
          {...other}
        />
      );
  } else {
      return (
        <Image
          ref={ref}
          src={PlaceholderImg.src}
          alt={alt}
          width={width}
          height={height}
          {...(placeholder
            ? {
                placeholder,
                blurDataURL: PlaceholderImg.src,
              }
            : {})}
          {...other}
        />
      );
  }
});

export default NextImage;
