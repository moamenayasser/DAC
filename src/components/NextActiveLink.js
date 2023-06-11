// Internal imports
import { forwardRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const NextActiveLink = forwardRef((props, ref) => {
  const {
    href,
    activeClassName = "active",
    className: classNameProps,
    children,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === "string" ? href : href.pathname;
  const className = `${classNameProps} ${
    router.asPath === pathname && activeClassName
  }`;

  return (
    <Link ref={ref} {...other} href={href} className={className}>
      {children}
    </Link>
  );
});

export default NextActiveLink;
