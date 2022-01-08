import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

//this is executed first and then the component function
export async function getStaticProps(context) {
  console.log("Regenerating...");
  //process current working directory
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  // console.log(data.products);
  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      // products: [{ id: "p1", title: "Product 1" }],
      products: data.products,
    },
    revalidate: 100,
    //it render 404 for true
    // notFound: true,
    //in case we can't connect to database or something
    // redirect: "/no-data"
  };
}

export default HomePage;
