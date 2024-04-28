import { ReactNode } from "react";

import EquipmentSkeleton from "./EquipmentSkeleton";
import ProfileSkeleton from "./ProfileSkeleton";

function AsyncSuspense(props: { error: boolean; pending: boolean; children: ReactNode; items: Number }) {
  const { children, error, pending, items } = props;

  if (pending) {
    return (
      <>
        <ProfileSkeleton />
        <EquipmentSkeleton />
      </>
    );
  }

  if (error) {
    return (
      <h1 style={{ color: "whitesmoke" }}>
        Something went wrong. You either enter wrong url or have not fully public profile. Please check your
        url or steam privacy settings
      </h1>
    );
  }

  return items ? children : null;
}

export default AsyncSuspense;
