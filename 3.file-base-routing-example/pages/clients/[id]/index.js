import { useRouter } from "next/router";

function ClientProjectsPage() {
  const router = useRouter();

  console.log(router.query);
  console.log(router.getInitialProps);
  return (
    <div>
      <h1>The Client Projects Page</h1>
    </div>
  );
}

export default ClientProjectsPage;
