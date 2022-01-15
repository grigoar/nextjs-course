import { getSession, useSession } from "next-auth/client";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useState, useEffect } from "react";

function UserProfile() {
  // Redirect away if NOT auth
  // const [isLoading, setIsLoading] = useState(true);
  // const [loadedSession, setLoadedSession] = useState();
  // //bug when loading a page
  // // const [session, loading] = useSession();

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = "/auth";
  //     } else {
  //       setIsLoading(false);
  //     }
  //     // setLoadedSession(session);
  //   });
  // }, []);

  // // if (loading) {
  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
