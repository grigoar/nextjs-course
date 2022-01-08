import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  //   const [sales, setSales] = useState();
  const [sales, setSales] = useState(props.sales);
  const [isLoading, setIsLoading] = useState(false);
  const error = null;

  //   const { data, error } = useSWR(
  //     "https://next-js-course-pre-rendering-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
  //   );

  //   useEffect(() => {
  //     if (data) {
  //       const transformedSales = [];
  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }
  //       console.log(transformedSales);
  //       setSales(transformedSales);
  //     }
  //   }, [data]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://next-js-course-pre-rendering-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const transformedSales = [];

        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <p>Failed to Load.</p>;
  }
  //   if (isLoading) {
  //   if (!data) {
  //     return <p>Loading...</p>;
  //   }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p> Loading...</p>;
  }
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

//combining client side with fetch to have some the data for the crawlers or for a better experience for user
export async function getStaticProps() {
  return fetch(
    "https://next-js-course-pre-rendering-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      return {
        props: {
          sales: transformedSales,
        },
      };
    });
}

export default LastSalesPage;
