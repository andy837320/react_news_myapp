import React from "react";
import Search from "./Search";
import Pagination from "./Pagination";
import Stories from "./Stories";
import Footer from "./Footer";
import "./App.css";

const App = () => {
  return (
    <>
      <Search />
      <Pagination />
      <Stories />
      <Footer />
    </>
  );
};

export default App;
