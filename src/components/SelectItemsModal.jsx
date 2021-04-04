import { useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { getItems } from '../utils/utils';
import { useStore } from '../reducers/reducer';




function AddItemsModal(props) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { state, dispatch } = useStore();
    const { onCancel, DB } = props;
    const { items } = state;

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    }

    const handleItemChange = (e) => {
        setSelectedItem(Number(e.target.value));
    }

    const handleSubmit = async () => {
        const selectedItemObject = items.filter(val => val.id === selectedItem);
        if (selectedItem === null || quantity === '') {
            alert('Please Fill All the Necessary Fields')
        } else {
            DB.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS cartItems (id unique, name, price, quantity)');
                tx.executeSql(`INSERT INTO cartItems (id, name, price, quantity) VALUES (${selectedItemObject[0].id}, "${selectedItemObject[0].name}", "${selectedItemObject[0].price}", "${quantity}")`);
            });
            const items = await getItems(DB, 'cartItems');
            dispatch({ type: 'ADD_ITEM_TO_CART', payload: items })
            onCancel();
        }
    }

    return (
        <Modal show onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Select Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Row className="justify-content-center">
                        <Form.Group as={Col} xs={12}>
                            <Form.Label className="fs-14">Select</Form.Label>
                            <Form.Control
                                as="select"
                                name="select"
                                className="rounded-0"
                                value={selectedItem === null ? '' : selectedItem}
                                onChange={handleItemChange}
                            >
                                <option>Select Item</option>
                                {items.map(
                                    val => <option key={val.id} value={val.id}>{val.name}</option>,
                                )}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className="justify-content-center">
                        <Form.Group as={Col} xs={12}>
                            <Form.Label className="fs-14">Quantity</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                rows="1"
                                min='1'
                                name="price"
                                value={quantity}
                                onChange={handleQuantityChange}
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