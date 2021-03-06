import Head from "next/head";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/posts-util";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Grigoar`s Blog</title>
        <meta
          name='description'
          content='I post about programming and web development'
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    // revalidate: 1800,
  };
}

export default HomePage;

// 1) Hero section > Present ourselves
// 2) Featured Posts
