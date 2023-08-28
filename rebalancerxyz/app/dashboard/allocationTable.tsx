import { ucs2 } from 'punycode'
import React, { ChangeEvent, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

interface AssetData {
  asset: string
  amount: number
  currentAllocation: number
  targetAllocation: number
  delta: number
  buySellAmount: number
  link: string
}

interface AllocationTableProps {
  data: AssetData[]
}

const AllocationTable: React.FC<AllocationTableProps> = ({ data }) => {

  const [selectedTargetAllocations, setSelectedTargetAllocations] = useState<AssetData[]>(data)

  const handleTargetAllocationChange = (index: number, value: number) => {
    const updatedData = [...data];
    updatedData[index].targetAllocation = value;

    var [avax, alot, usdc, weth] = [updatedData[0], updatedData[1], updatedData[2], updatedData[3]];

    const nav = avax.amount + alot.amount + usdc.amount + weth.amount;

    avax.delta = avax.targetAllocation - avax.currentAllocation;
    alot.delta = alot.targetAllocation - alot.currentAllocation;
    alot.delta = usdc.targetAllocation - usdc.currentAllocation;
    weth.delta = weth.targetAllocation - weth.currentAllocation;
  
    avax.buySellAmount = +((avax.delta  * nav) / 10.19 * 0.01).toFixed(2); 
    alot.buySellAmount = +((alot.delta * nav) / 0.39 * 0.01).toFixed(2);
    usdc.buySellAmount = +((alot.delta * nav) / 1 * 0.01).toFixed(2);
    weth.buySellAmount = +((weth.delta * nav) /  1653.77 * 0.01).toFixed(4);


    setSelectedTargetAllocations(updatedData);
  }

  return (
    <Table bordered hover className="Table rounded">
      <thead>
        <tr>
          <th>Asset</th>
          <th>Amount</th>
          <th>Current Allocation</th>
          <th>Target Allocation</th>
          <th>Delta (%)</th>
          <th>Buy/Sell Amount</th>
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
                value={item.targetAllocation || 0}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleTargetAllocationChange(
                    index,
                    Number(e.target.value)
                  )
                }
              />
              %
            </td>
            <td>{item.delta}</td>
            <td>{item.buySellAmount}</td>
            <td>
              <a href={item.link} rel="noopener noreferrer" target="_blank">
                <Button variant="primary">Rebalance</Button>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default AllocationTable
