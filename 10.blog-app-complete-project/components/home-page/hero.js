import Image from "next/image";

import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/grig-profile.jpg'
          alt='An image showing grigoar'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Grigoar</h1>
      <p>
        I blog about web development - especially about JS and related
        frameworks like NodeJS, ReactJS ...
      </p>
    </section>
  );
}

export default Hero;
