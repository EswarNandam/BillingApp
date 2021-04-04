import { Card } from 'react-bootstrap';
import { useStore } from '../reducers/reducer';


function NewBills(props) {
    const { state } = useStore();

    const { bills } = state;
    return (
        <>
            <Card style={{ height: '365px' }}>
                {bills.length === 0 ? <div>Please add items and click on checkout to generate the bill</div>
                    :
                    <Card.Body style={{ height: '200px', overflowY: bills.length === 0 ? 'none' : 'scroll' }}>
                        {
                            bills.map((itemBill, index) => {
                                return (
                                    <div style={{ border: '1px solid black', padding: '5px', margin: '10px' }} key={index + 1}>
                                        <div className="row" style={{ fontWeight: '700' }}>
                                            <div className="col-md-12">
                                                <span style={{ float: 'left' }}>
                                                    {itemBill.billId}
                                                </span>
                                                <span style={{ float: 'right' }}>
                                                    Rs. {itemBill.amount}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <span style={{ float: 'left' }}>
                                                    {itemBill.date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Card.Body>
                }
            </Card>
        </>
    );
}

export default NewBills;


