import Document, { Html, Head, Main, NextScript } from "next/document";
//here we can manipulate or add elements to the structure of the app we created
// we can add general elements outside of the app
// we can use portals...
// Main is the main application
class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <div id='overlays' />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
