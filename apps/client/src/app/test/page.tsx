import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();
  //   console.log(token, "token from client");

  //   Product Service
  const resProduct = await fetch("http://localhost:8000/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataProduct = await resProduct.json();
  console.log(dataProduct, "data from product service");

  //   Order Service
  const resOrder = await fetch("http://localhost:8001/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataOrder = await resOrder.json();
  console.log(dataOrder, "data from order service");

  //   Payment Service
  const resPayment = await fetch("http://localhost:8002/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataPayment = await resPayment.json();
  console.log(dataPayment, "data from payment service");
  return <div>TestPage</div>;
};

export default TestPage;
