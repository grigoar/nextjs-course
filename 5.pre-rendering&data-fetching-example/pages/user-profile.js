function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export async function getServerSideProps(context) {
  //   console.log(context);
  const { params, req, res } = context;
  //   console.log("server-side does loads");
  //   console.log(req);
  //   console.log(res);
  return {
    props: {
      username: "grigoar",
    },
  };
}

export default UserProfilePage;
