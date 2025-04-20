import React from 'react'
import './styles.css';
import {Card, Row} from 'antd';
import Button from '../Button';

const Cards = () => {
  return (
    <div>
        <Row className="my-row">
            <Card className="my-card" title="Current Balance">
               <p>Rs-0</p>
               <Button text="Reset Balance" blue={true}/>
                </Card>
        </Row>
    </div>
  )
}

export default Cards