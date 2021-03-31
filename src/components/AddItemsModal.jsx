import React, { useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import {getItems} from '../utils/utils';
import { useStore } from '../reducers/reducer';



function AddItemsModal (props){
    const { onCancel, DB } = props;
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState(1);
    const { state, dispatch } = useStore();



    const handleNameChange = (e) => {
        setItemName(e.target.value);
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    }

    const handleSubmit = async () => {
                const { items } = state;
                const duplicateItem = items.filter(val => val.name === itemName);
                if (itemName === '' || price === '') {
                    alert('Please Fill All the Necessary Fields')
                } else {
                    if (duplicateItem.length > 0) {
                        alert('This Product Already Exists in the Inventory')
                    } else {
                    DB.transaction(function (tx) {
                        tx.executeSql('CREATE TABLE IF NOT EXISTS myItems (id unique, name, price)');
                        tx.executeSql(`INSERT INTO myItems (id, name, price) VALUES (${Math.floor(Math.random()*(999-100+1)+100)}, "${itemName}", "${price}")`);
                    });
                        const myItems = await getItems(DB, 'myItems');
                        dispatch({ type: 'ADD_ITEM', payload: myItems });
                        onCancel();
                    }
                }
            }


    return (
        <Modal show onHide={onCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row className="justify-content-center">
                            <Form.Group as={Col} xs={12}>
                                <Form.Label className="fs-14">Name</Form.Label>
                                <Form.Control
                                    required
                                    rows="1"
                                    name="name"
                                    value={itemName}
                                    onChange={handleNameChange}
                                    className="rounded-0"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="justify-content-center">
                            <Form.Group as={Col} xs={12}>
                                <Form.Label className="fs-14">Price</Form.Label>
                                <Form.Control
                                    required
                                    rows="1"
                                    min="1"
                                    type="number"
                                    name="price"
                                    value={price}
                                    onChange={handlePriceChange}
                                    className="rounded-0"
                                />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary rounded-0" onClick={handleSubmit}>
                        Add
            </Button>
                </Modal.Footer>
            </Modal>
    );
}

export default AddItemsModal;