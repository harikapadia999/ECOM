import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();
  console.log(token, "token from client");
  const res = await fetch("http://localhost:8000/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log(data, "data from product service");
  return <div>TestPage</div>;
};

export default TestPage;
