import { ReactNode } from "react";

function Favourite(props: { children: ReactNode; className?: string }) {
  const { children, className } = props;

  return <button className={className}>{children}</button>;
}

export default Favourite;
