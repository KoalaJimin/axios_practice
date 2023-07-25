import React from "react";
import Categories from "../components/Categories";
import NewList from "../components/NewList";
import { useParams } from "react-router-dom";

const NewsPages = () => {
  const { category } = useParams();
  const selectedCategory = category || "all";

  console.log(category);

  return (
    <div>
      <Categories />
      <NewList category={selectedCategory} />
    </div>
  );
};

export default NewsPages;
