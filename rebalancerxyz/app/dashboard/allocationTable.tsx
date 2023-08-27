import React, { useState, ChangeEvent } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface AssetData {
  asset: string;
  amount: number;
  currentAllocation: number;
  targetAllocation: number;
  delta: number;
  buySellAmount: number;
}

interface AllocationTableProps {
  data: AssetData[];
}

const AllocationTable: React.FC<AllocationTableProps> = ({ data }) => {
  const [selectedTargetAllocations, setSelectedTargetAllocations] = useState<
    Record<string, number>
  >({});

  const handleTargetAllocationChange = (
    asset: string,
    value: number | string
  ) => {
    setSelectedTargetAllocations((prevAllocations) => ({
      ...prevAllocations,
      [asset]: typeof value === 'string' ? parseFloat(value) : value,
    }));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Asset</th>
          <th>Amount</th>
          <th>Current Allocation</th>
          <th>Target Allocation</th>
          <th>Delta</th>
          <th>Buy/Sell Amount</th>
          <th>Rebalance</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.asset}</td>
            <td>{item.amount}</td>
            <td>{item.currentAllocation}%</td>
            <td>
              <Form.Control
                type="number"
                min={0}
                max={100}
                value={selectedTargetAllocations[item.asset] || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleTargetAllocationChange(
                    item.asset,
                    e.target.value
                  )
                }
              />
              %
            </td>
            <td>{item.delta}</td>
            <td>{item.buySellAmount}</td>
            <td>
              <Button variant="primary">Rebalance</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AllocationTable;
