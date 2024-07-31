import axiosInstance from "../utilities/axiosInstance";

const saveRecipe = async (title, ingredients, description) => {
    return await axiosInstance.post("recipe", {
        title,
        ingredients,
        description
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data;
    })
}

const getRecipes = async() => {
    return await axiosInstance.get("recipes").then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data;
    })
}

const deleteRecipe = async(recipe) => {
    return await axiosInstance.delete("recipe", {
        data: { recipe },
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data;
    })
}
export { saveRecipe, getRecipes, deleteRecipe }