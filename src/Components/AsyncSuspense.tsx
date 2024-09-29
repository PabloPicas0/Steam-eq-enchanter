import { ReactNode } from "react";
import "../styles/Profile.css";

import EquipmentSkeleton from "./EquipmentSkeleton";
import ProfileSkeleton from "./ProfileSkeleton";

import { useAppSelector } from "../hooks/useAppSelector ";

function AsyncSuspense(props: { children: ReactNode }) {
  const { children } = props;

  const items = useAppSelector((state) => state.profile.items);
  const error = useAppSelector((state) => state.profile.error);
  const pending = useAppSelector((state) => state.profile.pending);

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

  return items.length ? children : null;
}

export default AsyncSuspense;
