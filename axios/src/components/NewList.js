import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";
import React, { useState, useEffect } from "react";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  // 요청 대기 : true, 요청 끝 :  false

  useEffect(() => {
    // async 사용을 위해 따로 함수 선언
    const fetchData = async () => {
      setLoading(true); // 요청 대기
      try {
        const query = category === "all" ? "" : `&category=${category}`;
        const response = await axios.get(
          `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=5f8c94d0655e480d89817a32c3135fa9`
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false); // 요청 끝
    };
    fetchData();
  }, [category]);

  // 대기 중인 상태라면
  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }

  // article 값이 없을 때
  if (!articles) {
    return null;
  }

  // article 값이 있을 때
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewList;
