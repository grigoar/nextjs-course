import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();
  //   console.log(data);
  const product = data.products.find((product) => product.id === productId);

  //if we didn't found the product we should not return all the page with the props, we need to respond with not Found
  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const paramsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: paramsWithParams,
    // paths: [{ params: { pid: "p1" } }],
    //if we want only some pages to be pre-generated
    // the paths will be resolved just in time when the request hit the server
    // fallback: true,
    // with blocking we don't need to check in the component if the props are loaded
    // fallback: "blocking",
    fallback: true,
  };
}

export default ProductDetailPage;
