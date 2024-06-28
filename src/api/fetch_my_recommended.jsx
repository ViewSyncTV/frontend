import { useState, useEffect } from "react";
import { getFavorites } from "./fetch_my_favorites";
import { VITE_DEVELOPMENT_MODE, VITE_PRODUCTION_URL, VITE_DEVELOPMENT_URL } from "../constants";

export async function getRecommendedIds(favorites) {
  let recommendations = [];
  for (let i = 0; i < favorites.length; i++) {
    let id = favorites[i].data.id;
    let type = favorites[i].type;
    let backendUrl = VITE_DEVELOPMENT_MODE ? VITE_DEVELOPMENT_URL : VITE_PRODUCTION_URL;
    let recommendation = await fetch(`${backendUrl}/api/program-metadata/${favorites[i].type}/recommendations/${id}`, {
        method: "GET",
        credentials: "include"
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data.length === 0) {
            return null;
          }
          return {
            data: data.data[0],
            type: type,
            title: data.data[0].title,
          };
        });
    if (recommendation) { recommendations.push(recommendation); }
  }
  return recommendations;
}
