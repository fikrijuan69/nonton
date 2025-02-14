import React, { useEffect, useState } from "react";

import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import CastCard from "../../components/castcard/CastCard";
const CastList = (props) => {
  const { category } = useParams();

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const response = await tmdbApi.credits(category, props.id);
      setCasts(response.cast.slice(0, 10));
      //   console.log(response.cast);
    };
    getCredits();
  }, [category, props.id]);

  return (
    <div className="casts">
      {casts.map((cast, index) => (
        <div key={index} className="casts__item">
          <CastCard cast={cast} category={category} />
        </div>
      ))}
    </div>
  );
};

export default CastList;
