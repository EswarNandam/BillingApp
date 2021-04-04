import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import AddItemsModal from './AddItemsModal';
import { useStore } from '../reducers/reducer';




function Items(props) {
    const { DB } = props;

    const [showModal, setShowModal] = useState(false);
    const { state } = useStore();
    const { items } = state;

    const openAddItemModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }
    return (
        <>
            <Card>
                <Card.Body style={{ height: '300px', overflowY: items.length === 0 ? 'none' : 'scroll' }}>
                    {
                        items.map((item, index) => {
                            return (
                                <div style={{ border: '1px solid black', padding: '5px', margin: '10px' }} key={index + 1}>
                                    <div className="row" style={{ fontWeight: '700' }}>
                                        <div className="col-md-12">
                                            <span style={{ float: 'left' }}>
                                                {item.name}
                                            </span>
                                            <span style={{ float: 'right' }}>
                                                Rs. {item.price}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span style={{ float: 'left' }}>
                                                Quantity: 12
                                                </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </Card.Body>
                <Card.Footer>
                    <span style={{ float: 'right' }}>
                        <Button variant="primary" style={{ borderRadius: '50%' }} onClick={openAddItemModal}>+</Button>
                    </span>
                </Card.Footer>
            </Card>
            {
                showModal
                    ? <>
                        <AddItemsModal
                            onCancel={handleCloseModal}
                            DB={DB}
                        />
                    </>
                    : null
            }
        </>
    );
}


export default Items;


