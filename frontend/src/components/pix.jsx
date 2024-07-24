import React, { useState } from "react";
import {
  PixHeading,
  PixSpan,
  PixContainer,
  PixGrid,
  PixImage,
  PixButton,
  PixSubHeading,
  PixItem,
  PixImageName,
  PixPopup,
  PixLoading,
  PixCard,
  PixArrow,
} from "./pix.styles";
import { OpenAI } from "openai";

// Import all images from a directory
const importAll = (r) =>
  r.keys().map((item, index) => ({
    id: index,
    path: r(item),
    name: item.split("/").pop().split(".")[0],
  }));

const vegetableImages = importAll(
  require.context("../../public/img/veggies", false, /\.(png|jpe?g|svg)$/)
);

const fruitImages = importAll(
  require.context("../../public/img/fruits", false, /\.(png|jpe?g|svg)$/)
);

const dairyImages = importAll(
  require.context("../../public/img/dairy", false, /\.(png|jpe?g|svg)$/)
);

const meatImages = importAll(
  require.context(
    "../../public/img/meat_and_poultry",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const seafoodImages = importAll(
  require.context("../../public/img/seafood", false, /\.(png|jpe?g|svg)$/)
);

const spicesImages = importAll(
  require.context(
    "../../public/img/spices_and_herbs",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const grainsImages = importAll(
  require.context(
    "../../public/img/grains_and_pasta",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const condimentsImages = importAll(
  require.context(
    "../../public/img/condiments_and_sauces",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const nutsImages = importAll(
  require.context(
    "../../public/img/nuts_and_seeds",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const PixPlate = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(0);
  const apikey = process.env.REACT_APP_API_KEY;

  const handleImageClick = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((name) => name !== item)
        : [...prevSelected, item]
    );
  };

  const getRecipeSuggestions = async (ingredients) => {
    const client = new OpenAI({
      apiKey: apikey,
      dangerouslyAllowBrowser: true,
    });

    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Suggest recipes based on these ingredients: ${ingredients.join(
              ", "
            )}. Return the name of the dish, the ingredients required, and a 3-line description on how to make it. Each recipe should be separated by two empty lines.

            Example response:
            recipe-name : Spaghetti Carbonara
            
            ingredients : 1 pound spaghetti, 2 large eggs, 1 cup grated Pecorino Romano cheese, 1 cup guanciale, 1/2 teaspoon freshly ground black pepper
            
            description : Spaghetti Carbonara is a classic Italian pasta dish that is made with simple ingredients. It is a creamy and delicious dish that is perfect for any occasion. The key to making a good carbonara is to use high-quality ingredients and to follow the recipe carefully.
            
            recipe-name : Chicken Alfredo
            
            ingredients : 1 pound fettuccine, 1/2 cup unsalted butter, 1 cup heavy cream, 1 cup grated Parmesan cheese, 1/2 teaspoon salt, 1/4 teaspoon black pepper, 1/4 teaspoon garlic powder, 1/4 teaspoon onion powder, 1/4 teaspoon dried parsley
            
            description : Chicken Alfredo is a classic Italian pasta dish that is made with simple ingredients. It is a creamy and delicious dish that is perfect for any occasion. The key to making a good Alfredo is to use high-quality ingredients and to follow the recipe carefully.`,
          },
        ],
        stream: true,
      });

      let recipeText = "";
      for await (const chunk of response) {
        if (chunk.choices[0].delta.content !== null) {
          recipeText += chunk.choices[0].delta.content;
        }
      }

      console.log("Raw recipe text:", recipeText);

      // Split recipes by two empty lines
      const recipeBlocks = recipeText.trim().split(/\n\s*\n\s*\n/);

      // Map recipe blocks to objects
      const recipesArray = recipeBlocks.map((block) => {
        const lines = block
          .trim()
          .split("\n")
          .map((line) => line.trim());
        let title = "",
          ingredients = "",
          description = "";

        lines.forEach((line) => {
          if (line.startsWith("recipe-name")) {
            title = line.replace("recipe-name :", "").trim();
          } else if (line.startsWith("ingredients")) {
            ingredients = line.replace("ingredients :", "").trim();
          } else if (line.startsWith("description")) {
            description = line.replace("description :", "").trim();
          }
        });

        return { title, ingredients, description };
      });

      console.log("Parsed recipes array:", recipesArray);
      setRecipes(recipesArray);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleGenerate = () => {
    if (selectedItems.length > 0) {
      setLoading(true);
      getRecipeSuggestions(selectedItems).finally(() => setLoading(false));
    } else {
      setPopup(true);
      setTimeout(() => setPopup(false), 3000);
    }
  };

  const handleNextRecipe = () => {
    setCurrentRecipe((prev) => (prev + 1) % recipes.length);
  };

  const renderImageGrid = (images, category) => (
    <>
      <PixSubHeading>{category}</PixSubHeading>
      <PixGrid>
        {images.map(({ id, path, name }) => {
          const isSelected = selectedItems.includes(name);

          return (
            <PixItem key={id}>
              <PixImage
                src={path}
                alt={name}
                data-isselected={isSelected.toString()}
                onClick={() => handleImageClick(name)}
              />
              <PixImageName>{name}</PixImageName>
            </PixItem>
          );
        })}
      </PixGrid>
    </>
  );

  return (
    <div>
      <PixHeading>Are you ready to foodle around?</PixHeading>
      <PixSpan>
        Let's get started! Select the ingredients below and click generate.
      </PixSpan>
      <PixContainer>
        {renderImageGrid(vegetableImages, "Vegetables")}
        {renderImageGrid(fruitImages, "Fruits")}
        {renderImageGrid(dairyImages, "Dairy")}
        {renderImageGrid(meatImages, "Meat and Poultry")}
        {renderImageGrid(seafoodImages, "Seafood")}
        {renderImageGrid(grainsImages, "Grains and Pasta")}
        {renderImageGrid(spicesImages, "Spices and Herbs")}
        {renderImageGrid(condimentsImages, "Condiments and Sauces")}
        {renderImageGrid(nutsImages, "Nuts and Seeds")}
        <PixButton onClick={handleGenerate}>Generate</PixButton>
      </PixContainer>
      {popup && <PixPopup>Please select items</PixPopup>}
      {loading && (
        <PixLoading>
          <div>Please wait for a moment...</div>
          <div className="loading-icon"></div>{" "}
          {/* Add your loading icon here */}
        </PixLoading>
      )}
      {recipes.length > 0 && !loading && (
        <div>
          <h2>Recipe Suggestions</h2>
          <PixCard>
            <h3>{recipes[currentRecipe].title}</h3>
            <p>
              <strong>Ingredients:</strong> {recipes[currentRecipe].ingredients}
            </p>
            <p>
              <strong>Description:</strong> {recipes[currentRecipe].description}
            </p>
          </PixCard>
          <PixArrow onClick={handleNextRecipe}>→</PixArrow>
        </div>
      )}
    </div>
  );
};

export default PixPlate;
