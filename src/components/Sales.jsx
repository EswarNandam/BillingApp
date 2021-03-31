import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useStore } from '../reducers/reducer';


function Sales(props) {
    const [totalAmount, setTotalAmount] = useState(0);
    const { state } = useStore();

    const { bills } = state;
    

    useEffect(() => {
        let amount = 0;
        for (let i = 0; i < bills.length; i++) {
            amount += bills[i].amount;
        }
        setTotalAmount(amount);
    }, [bills]);


    return (
        <Card style={{ height: '365px' }}>
            <Card.Header><span style={{ float: 'left' }}>Sales</span></Card.Header>
            <Card.Body style={{ height: '200px' }}>
                <div className="row">
                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="col-md-4" style={{ border: '1px solid black', height: '100px', width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', flexDirection: 'column' }}>
                            <div>
                                Rs. {totalAmount}
                            </div>
                            <div>
                                Today
                                </div>
                        </div>
                        <div className="col-md-4" style={{ border: '1px solid black', height: '100px', width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginRight: '10px' }}>
                            <div>
                                Rs. {2052 + totalAmount}
                            </div>
                            <div>
                                This Month
                                </div>
                        </div>
                        <div className="col-md-4" style={{ border: '1px solid black', height: '100px', width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <div>
                                Rs. {2502 + totalAmount}
                            </div>
                            <div>
                                This Year
                                </div>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Sales;

