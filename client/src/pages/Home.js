import React from "react";
// import css
import "./home.css";
import TipCalculator from "../components/calculator/TipCalculator";

const Home = () => {
  return (
    <>
      {/* google search meta data  */}
      <meta
        itemscope
        itemtype="https://schema.org"
        itemProp="description"
        content="You ever need to figure out the tip on a night out? Well now you can with this cool tip calculator!"
      />
      <meta
        itemscope
        itemtype="https://schema.org"
        itemProp="image"
        content="http://keepdachange.app/favicon/android-chrome-512x512.png"
      />
      <meta
        name="description"
        content="You ever need to figure out the tip on a night out? Well now you can with this cool tip calculator!"
      />
      <TipCalculator />
    </>
  );
};

export default Home;
