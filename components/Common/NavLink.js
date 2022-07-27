import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";

export default NavLink;

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
  activeClass: "active",
};

function NavLink({
  href,
  exact,
  activeClass,
  children,
  passHref = true,
  ...props
}) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += " " + activeClass;
  }

  return (
    <Link href={href} passHref={passHref}>
      <a {...props}>{children}</a>
    </Link>
  );
}
