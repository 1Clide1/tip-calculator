import React from "react";
// import css
import "./home.css";
import TipCalculator from "../components/calculator/TipCalculator";

const Home = () => {
  return (
    <>
      {/* google search meta data better to have in the body of the page I am trying to target */}
      <meta itemProp="name" content="Tip Calculator Web App" />
      <meta
        itemProp="description"
        content="You ever need to figure out the tip on a night out? Well now you can with this cool tip calculator!"
      />
      <meta
        itemProp="image"
        content="http://keepdachange.app/favicon/android-chrome-512x512.png"
      />
      <TipCalculator />
    </>
  );
};

export default Home;
