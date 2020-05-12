import React, {useReducer, useState} from "react";
import 'babel-polyfill';

const initialState = {
    name: '',
    width: '',
    height: '',
    colour: ''
};

const CHANGE_PICTURE_NAME = 'main/CHANGE_PICTURE_NAME';
const CHANGE_PICTURE_WIDTH = 'main/CHANGE_PICTURE_WIDTH';
const CHANGE_PICTURE_HEIGHT = 'main/CHANGE_PICTURE_HEIGHT';
const CHANGE_PICTURE_COLOUR = 'main/CHANGE_PICTURE_COLOUR';

const reducer = (state, action) => {
    console.log({state, action});
    switch(action.type) {
        case CHANGE_PICTURE_NAME:
            return { ...state, name: action.payload };
        case CHANGE_PICTURE_WIDTH:
            return { ...state, width: action.payload };
        case CHANGE_PICTURE_HEIGHT:
            return { ...state, height: action.payload };
        case CHANGE_PICTURE_COLOUR:
            return { ...state, colour: action.payload };
        default:
           return state;
    }
};

const request = async (state) => {
    let response = await fetch('http://localhost:8888/upload', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${state.name}&width=${state.width}&height=${state.height}&colour=${state.colour}`
    });

    return await response.blob();
};

const component = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [image, setImage] = useState(null);

    const getImage = async (event) => {
        event.preventDefault() && event.stopPropagation();
        const picture = await request(state);
        console.log(picture);
        setImage(picture);
    };

    return(
        <div>
            <div>
                <img src={image} alt="picture" />
            </div>
            <form>
                Введите название картинки с номером
                <input onChange={ event => dispatch({type: CHANGE_PICTURE_NAME, payload: event.target.value})} name="name" type="text" required pattern="(shark|antelope|macaw)( [1-9])?$"
                       title="Можно ввести только shark, antelope, macaw с цифрой от 1 до 9"/>
                <br/>
                Введите ширину
                <input  onChange={ event => dispatch({type: CHANGE_PICTURE_WIDTH, payload: event.target.value})} name="width" type="text"  min = "100" max = "1500"
                       title="Диапазон от 100 до 1500 пикселей"/>
                Введите высоту
                <input onChange={ event => dispatch({type: CHANGE_PICTURE_HEIGHT, payload: event.target.value})} name="height" type="text" min = "100" max = "1500"
                       title="Диапазон от 100 до 1500 пикселей"/>
                <br/>
                Значения цвета
                <input onChange={ event => dispatch({type: CHANGE_PICTURE_COLOUR, payload: event.target.value})} name="colour" type="text"  pattern="(blue|red|green)?$"
                       title="Можно ввести только blue, red, green"/>
                <br/>
                <input onClick={(event) => getImage(event)} type="submit" value="Submit"  />
            </form>
        </div>
    )
};

export default component;