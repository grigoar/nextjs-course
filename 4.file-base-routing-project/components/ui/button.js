import Link from "next/link";
import classes from "./button.module.css";

function Button(props) {
  //need to add your anchor link to add your style, but it intercepts it and the function is the same as normal Link
  return (
    <Link href={props.link}>
      <a className={classes.btn}>{props.children}</a>
    </Link>
  );
}

export default Button;
