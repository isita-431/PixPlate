import styled from "styled-components";

export const PixHeading = styled.h1`
  font-size: 2.5em;
  text-align: center;
  padding: 1rem;
  font-family: "League Spartan";
`;

export const PixSpan = styled.p`
  font-size: 1.5em;
  text-align: center;
  align-items: center;
  font-family: "League Spartan";
`;
export const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height */
  background-color: #f0f0f0; /* Optional: Add a background color for contrast */
`;

export const PixContainer = styled.div`
  border: 0.2px solid grey;
  border-width: thin;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10%;
  margin-right: 10%;
`;

export const PixGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  padding: 20px;
`;

export const PixItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PixImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 2px solid
    ${(props) => (props["data-isselected"] === "true" ? "blue" : "transparent")};
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const PixImageName = styled.p`
  font-size: 1em;
  text-align: center;
  margin-top: 5px;
  font-family: "League Spartan";
`;

export const PixButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  color: white;
`;

export const PixSubHeading = styled.h2`
  font-size: 2em;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
  font-family: "League Spartan";
`;

export const PixPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 5px;
`;

export const PixLoading = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const PixCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  text-align: center;
`;

export const PixArrow = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-top: 10px;
`;

export const HeartIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s ease;

  &:hover {
    color: red;
  }
`;
