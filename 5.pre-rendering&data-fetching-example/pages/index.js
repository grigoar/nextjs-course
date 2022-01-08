import fs from "fs/promises";
import path from "path";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

//this is executed first and then the component function
export async function getStaticProps() {
  console.log("Regenerating...");
  //process current working directory
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  // console.log(data.products);
  return {
    props: {
      // products: [{ id: "p1", title: "Product 1" }],
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
