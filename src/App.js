import React, { useEffect } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { getItems } from './utils/utils';
import StepperContainer from './containers/StepperContainer';
import { useStore  } from './reducers/reducer';

var db = openDatabase('myDb', '1.0', 'Testing', 2 * 1024 * 1024);

function App(props) {
    const { state, dispatch } = useStore();
    
    
    useEffect(() => {
        getItems(db, 'myItems').then((result) => dispatch({ type: 'ADD_ITEM', payload: result }));
        getItems(db, 'cartItems').then((result) => dispatch({ type: 'ADD_ITEM_TO_CART', payload: result }));
        console.log(state)
    }, []);


    return (
        <div className="App">
            <Container>
                <div><h1>BILLING APPLICATION</h1></div>
                <StepperContainer db={db} />
            </Container>
        </div>
    )
}
export default App;
