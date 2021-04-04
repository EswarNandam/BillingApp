import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import SelectItemsModal from './SelectItemsModal';
import { useStore } from '../reducers/reducer';


function NewBills(props) {
    const { DB } = props;
    const [showSelectItemsModal, setShowSelectItemsModal] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const { state, dispatch } = useStore();



    const { items, cartItems } = state;


    useEffect(() => {
        let amount = 0;
        for (let i = 0; i < cartItems.length; i++) {
            amount += cartItems[i].price * cartItems[i].quantity;
        }
        setTotalAmount(amount);
    }, [cartItems]);


    const handleOpenSelectItemsModal = () => {
        if (items.length > 0) {
            setShowSelectItemsModal(true);
        } else {
            alert('Please Add the Item to Proceed');
        }
    }

    const closeSelectItemsModal = () => {
        setShowSelectItemsModal(false);
    }

    const checkOut = (amount) => {
        let newPromise = new Promise((resolve, reject) => {
            resolve(DB.transaction(function (tx) {
                tx.executeSql("DROP TABLE cartItems");
            }));
        })
        newPromise.then(() => {
            dispatch({ type: 'ADD_ITEM_TO_CART', payload: [] });
        })
        if (amount !== 0) {
            dispatch({
                type: 'CHECKOUT_CLICK', payload: {
                    billId: `BILL0000${Math.floor(Math.random() * (999 - 100 + 1) + 100)}`,
                    amount, date: new Date().toLocaleDateString()
                }
            })
        }
    }

    return (
        <>
            <Card style={{ height: '365px' }}>
                <Card.Body style={{ height: '200px', overflowY: cartItems.length === 0 ? 'none' : 'scroll' }}>
                    <div className="row" style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <div style={{ float: 'right' }}>
                            <span style={{ marginRight: '15px' }} className="p1 fa-stack has-badge" data-count={cartItems.length}>
                                Cart
                            </span>
                            <Button variant="danger rounded-0" onClick={handleOpenSelectItemsModal}>
                                +
                            </Button>
                        </div>
                    </div>
                    {
                        cartItems.map((item, index) => {
                            return (
                                <div style={{ border: '1px solid black', padding: '5px', margin: '10px' }} key={index + 1}>
                                    <div className="row" style={{ fontWeight: '700' }}>
                                        <div className="col-md-12">
                                            <span style={{ float: 'left' }}>
                                                {item.name}
                                            </span>
                                            <span style={{ float: 'right' }}>
                                                Rs. {item.price * item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span style={{ float: 'left' }}>
                                                Quantity: {item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Card.Body>
                <Card.Footer>
                    <span style={{ float: 'left' }}>Amount Rs: {totalAmount}</span>
                    <span style={{ float: 'right' }}>Total Items: {cartItems.length}</span>
                    <span><Button onClick={() => checkOut(totalAmount)} variant="primary rounded-0">CHECKOUT</Button></span>
                </Card.Footer>
            </Card>
            {
                showSelectItemsModal
                    ?
                    <>
                        <SelectItemsModal
                            onCancel={closeSelectItemsModal}
                            DB={DB}
                        />
                    </>
                    : null
            }
        </>
    );
}


export default NewBills;


