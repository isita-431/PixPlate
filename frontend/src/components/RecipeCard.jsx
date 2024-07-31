import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

const RecipeCard = ({title, ingredients, description, recipies}) => {

    return (
        <Card style={{position: 'relative'}}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>Ingredients: </Card.Subtitle>
                <Card.Text>
                    {ingredients}
                </Card.Text>
                <Card.Subtitle>Description: </Card.Subtitle>
                <Card.Text>
                    {description}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard