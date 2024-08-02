import * as tf from "@tensorflow/tfjs";
import { getRecipes } from "./receipe.service";
import allRecipes from "../data/recipes.json";
import { useState, useEffect } from "react";

const tokenize = (text) => text.split(" ").map((word) => word.toLowerCase());
const vectorize = (tokens) => tokens.map((token) => token.charCodeAt(0));

const computeVectors = (texts) => {
  return texts.map((text) => {
    const tokens = tokenize(text);
    return vectorize(tokens);
  });
};

const normalize = (vectors) => {
  return vectors.map((vector) => {
    const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    return vector.map((val) => (norm ? val / norm : 0));
  });
};

const useRecommendations = () => {
  const [likedRecipes, setLikedRecipes] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const likedRecipes = await getRecipes();
        setLikedRecipes(likedRecipes);

        if (!likedRecipes || likedRecipes.length === 0) {
          console.log("No liked recipes");
          setLoading(false);
          return;
        }
        const likedRecipeTitles = likedRecipes.recipes.map((r) => r.title);
        const allRecipeTitles = allRecipes.map((r) => r.Name);

        const likedVectors = normalize(computeVectors(likedRecipeTitles));
        const allVectors = normalize(computeVectors(allRecipeTitles));

        const vectorLength = Math.max(
          ...likedVectors.map((v) => v.length),
          ...allVectors.map((v) => v.length)
        );

        const padVectors = (vectors, length) =>
          vectors.map((vector) =>
            vector.length < length
              ? [...vector, ...new Array(length - vector.length).fill(0)]
              : vector.slice(0, length)
          );

        const paddedLikedVectors = padVectors(likedVectors, vectorLength);
        const paddedAllVectors = padVectors(allVectors, vectorLength);

        const likedTensor = tf.tensor2d(paddedLikedVectors);
        const allTensor = tf.tensor2d(paddedAllVectors);

        const similarityMatrix = tf.matMul(allTensor, likedTensor, false, true);
        const similarityArray = await similarityMatrix.array();

        const newRecommendations = [];
        for (let i = 0; i < similarityArray.length; i++) {
          const simArray = similarityArray[i];
          const maxScore = Math.max(...simArray);
          newRecommendations.push({
            recipe: allRecipes[i],
            score: maxScore,
          });
        }
        newRecommendations.sort((a, b) => b.score - a.score);
        setRecommendations(newRecommendations.slice(0, 5));
        console.log("Top 5 recommendations:", newRecommendations.slice(0, 5));
      } catch (error) {
        console.error("Error getting recommendations:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return { recommendations };
};

export { useRecommendations };
