import { getProfile } from "../services/auth.service";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PixSpan,
  PixContainer,
  PixHeading,
  PixSubHeading,
  PixCard,
  PixLoading,
  PixArrow,
  PixButton,
} from "./pix.styles";
import { useRecommendations } from "../services/recommendation.service";
import { logout } from "../services/auth.service";

export const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentLikedRecipeIndex, setCurrentLikedRecipeIndex] = useState(0);
  const [currentRecommendationIndex, setCurrentRecommendationIndex] =
    useState(0);
  const { likedRecipes, recommendations, loading, error } =
    useRecommendations();
  console.log(likedRecipes, recommendations, loading, error);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleNextLikedRecipe = () => {
    setCurrentLikedRecipeIndex(
      (prevIndex) => (prevIndex + 1) % user.user.recipes.length
    );
  };

  const handlePrevLikedRecipe = () => {
    setCurrentLikedRecipeIndex(
      (prevIndex) =>
        (prevIndex - 1 + user.user.recipes.length) % user.user.recipes.length
    );
  };

  const handleNextRecommendation = () => {
    setCurrentRecommendationIndex(
      (prevIndex) => (prevIndex + 1) % recommendations.length
    );
  };

  const handlePrevRecommendation = () => {
    setCurrentRecommendationIndex(
      (prevIndex) =>
        (prevIndex - 1 + recommendations.length) % recommendations.length
    );
  };

  return (
    <>
      <div style={{ marginTop: "9rem" }} />
      <PixContainer>
        <PixHeading>User Profile</PixHeading>
        {user ? (
          <div>
            <PixSpan>Hi!! {user.user.username}</PixSpan>
            <PixSpan>Email: {user.user.email}</PixSpan>
            <PixSubHeading>Liked Recipes:</PixSubHeading>
            {user.user.recipes.length > 0 && (
              <>
                <PixCard>
                  <PixSpan>
                    {user.user.recipes[currentLikedRecipeIndex].title}
                  </PixSpan>
                  <PixSpan>
                    Ingredients:{" "}
                    {user.user.recipes[currentLikedRecipeIndex].ingredients}
                  </PixSpan>
                  <PixSpan>
                    Description:{" "}
                    {user.user.recipes[currentLikedRecipeIndex].description}
                  </PixSpan>
                </PixCard>
                <div>
                  {currentLikedRecipeIndex > 0 && (
                    <PixArrow onClick={handlePrevLikedRecipe}>
                      ← Previous
                    </PixArrow>
                  )}
                  {currentLikedRecipeIndex < user.user.recipes.length - 1 && (
                    <PixArrow onClick={handleNextLikedRecipe}>Next →</PixArrow>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <PixLoading>Loading...</PixLoading>
        )}
        {recommendations.length > 0 && (
          <>
            <PixSubHeading>Recommended Recipes:</PixSubHeading>
            <PixCard>
              <PixSpan>
                {recommendations[currentRecommendationIndex].recipe.Name}
              </PixSpan>
              <PixSpan>
                Ingredients:{" "}
                {recommendations[
                  currentRecommendationIndex
                ].recipe.Ingredients.join(", ")}
              </PixSpan>
              <PixSpan>
                Description:{" "}
                {recommendations[currentRecommendationIndex].recipe.Description}
              </PixSpan>
            </PixCard>
            <div>
              {currentRecommendationIndex > 0 && (
                <PixArrow onClick={handlePrevRecommendation}>
                  ← Previous
                </PixArrow>
              )}
              {currentRecommendationIndex < recommendations.length - 1 && (
                <PixArrow onClick={handleNextRecommendation}>Next →</PixArrow>
              )}
            </div>
          </>
        )}
      </PixContainer>
      <PixButton
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </PixButton>
      <br></br>
    </>
  );
};
