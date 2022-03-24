import { useEffect } from "react";
import { useRouter } from "next/router";

import useCheckSession from "../hooks/useCheckSession";
import { Layout, PlayListTable } from "../components/root";

export default function MyPlaylist() {
  const session = useCheckSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [router, session]);

  return (
    <Layout>
      <PlayListTable />
    </Layout>
  );
}
