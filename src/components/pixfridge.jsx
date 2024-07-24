import React, { useState, useRef } from "react";
import { PixHeading, PixSpan } from "./pixfridge.styles";
import Form from "react-bootstrap/Form";
// import Image from "react-bootstrap/Image";
import { OpenAI } from "openai";
import {
  PixButton,
  PixCard,
  PixArrow,
  PixGrid,
  PixItem,
  PixImage,
  PixLoading,
} from "./pix.styles";

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      resolve({ base64: base64String, type: file.type });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const openai = new OpenAI({
  apiKey: "sk-proj-cgJlcHs99AOkLH45OEInT3BlbkFJCBwv47Nicwkwei2JqqJ2",
  dangerouslyAllowBrowser: true,
});

const PixFridge = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [removingImages, setRemovingImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delay, setDelay] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(0);
  const recipesRef = useRef(null);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(files.map(fileToBase64));
    setImages((prevImages) => [
      ...prevImages,
      ...base64Images.map(({ base64, type }) => ({ base64, type })),
    ]);

    setDelay(true);
    setTimeout(() => setDelay(false), 5000);
  };

  const handleCheckboxChange = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleRemoveImages = () => {
    setRemovingImages(true);
  };

  const handleDone = async () => {
    await handleRemoveSelected();
    setRemovingImages(false);
  };

  const handleRemoveSelected = async () => {
    const base64Images = selectedImages;

    setLoading(true);
    await getRecipeSuggestions(base64Images);
    setImages(images.filter((image) => !selectedImages.includes(image)));
    setSelectedImages([]);
    setLoading(false);

    if (recipesRef.current) {
      recipesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getRecipeSuggestions = async (base64Images) => {
    const imageObjects = base64Images.map(({ base64, type }) => ({
      type: "image_url",
      image_url: {
        url: `data:${type};base64,${base64}`,
        detail: "high",
      },
    }));

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `Detect ingredients from the fridge images and suggest recipes based on the ingredients and additional info: ${additionalInfo}.
            -- return only the recipe name, ingredients, and description, in the format asked nothing else.
            -- Each recipe should be separated by two empty lines.
            Example response template to follow:
        recipe-name : Spaghetti Carbonara
        
        ingredients : 1 pound spaghetti, 2 large eggs, 1 cup grated Pecorino Romano cheese, 1 cup guanciale, 1/2 teaspoon freshly ground black pepper
        
        description : Spaghetti Carbonara is a classic Italian pasta dish that is made with simple ingredients. It is a creamy and delicious dish that is perfect for any occasion. The key to making a good carbonara is to use high-quality ingredients and to follow the recipe carefully.
        
        
        recipe-name : Chicken Alfredo
        
        ingredients : 1 pound fettuccine, 1/2 cup unsalted butter, 1 cup heavy cream, 1 cup grated Parmesan cheese, 1/2 teaspoon salt, 1/4 teaspoon black pepper, 1/4 teaspoon garlic powder, 1/4 teaspoon onion powder, 1/4 teaspoon dried parsley
        
        description : Chicken Alfredo is a classic Italian pasta dish that is made with simple ingredients. It is a creamy and delicious dish that is perfect for any occasion. The key to making a good Alfredo is to use high-quality ingredients and to follow the recipe carefully.
            `,
          },
          ...imageObjects,
        ],
        stream: true,
      });

      let recipeText = "";
      for await (const chunk of response) {
        if (chunk.choices[0].delta.content !== null) {
          recipeText += chunk.choices[0].delta.content;
        }
      }

      const recipeBlocks = recipeText.trim().split(/\n\s*\n\s*\n/);

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

      setRecipes(recipesArray);
    } catch (error) {
      console.error("Error fetching recipe suggestions:", error);
      setRecipes([]);
    }
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const handleGenerateRecipes = () => {
    if (!delay) {
      handleRemoveSelected();
    }
  };

  const handleNextRecipe = () => {
    setCurrentRecipe((prev) => (prev + 1) % recipes.length);
  };

  const handlePrevRecipe = () => {
    setCurrentRecipe((prev) => (prev - 1 + recipes.length) % recipes.length);
  };

  return (
    <div>
      <PixHeading>What's in your Fridge!</PixHeading>
      <PixSpan>
        Upload photos of your fridge items and we will help you with recipes.
      </PixSpan>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Control
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </Form.Group>
      <Form.Group controlId="formAdditionalInfo" className="mb-3">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter additional information (e.g., number of calories, vegetarian, allergies)"
          value={additionalInfo}
          onChange={handleAdditionalInfoChange}
        />
      </Form.Group>
      <PixGrid>
        {images.map(({ base64, type }, index) => (
          <PixItem key={index} className="mb-3 position-relative">
            <PixImage
              src={`data:${type};base64,${base64}`}
              thumbnail
              alt={`Uploaded Image ${index}`}
            />
            {removingImages && (
              <Form.Check
                type="checkbox"
                checked={selectedImages.includes(base64)}
                onChange={() => handleCheckboxChange(base64)}
                className="position-absolute top-0 start-0 m-2"
              />
            )}
          </PixItem>
        ))}
      </PixGrid>
      {images.length > 0 && !removingImages && (
        <PixButton onClick={handleRemoveImages}>Remove Images</PixButton>
      )}
      {removingImages && <PixButton onClick={handleDone}>Done</PixButton>}
      <PixButton onClick={handleGenerateRecipes} disabled={delay}>
        {delay ? "Please wait..." : "Generate Recipes"}
      </PixButton>
      {loading && (
        <PixLoading>
          <div>Please wait for a moment...</div>
          <div className="loading-icon"></div>
        </PixLoading>
      )}
      <div ref={recipesRef}>
        {recipes.length > 0 && !loading && (
          <div>
            <h2>Recipe Suggestions</h2>
            <PixCard>
              <h3>{recipes[currentRecipe].title}</h3>
              <p>
                <strong>Ingredients:</strong>{" "}
                {recipes[currentRecipe].ingredients}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {recipes[currentRecipe].description}
              </p>
            </PixCard>
            <div>
              {currentRecipe > 0 && (
                <PixArrow onClick={handlePrevRecipe}>←</PixArrow>
              )}
              {currentRecipe < recipes.length - 1 && (
                <PixArrow onClick={handleNextRecipe}>→</PixArrow>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PixFridge;
