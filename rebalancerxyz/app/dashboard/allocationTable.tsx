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
  const [selectedTargetAllocations, setSelectedTargetAllocations] = useState<Record<string, number>>({})

  const handleTargetAllocationChange = (asset: string, value: number | string) => {
    setSelectedTargetAllocations((prevAllocations) => ({
      ...prevAllocations,
      [asset]: typeof value === 'string' ? parseFloat(value) : value,
    }))
  }

  return (
    <Table bordered hover className="Table rounded">
      <thead>
        <tr>
          <th>Asset</th>
          <th>Amount</th>
          <th>Current Allocation</th>
          <th>Target Allocation</th>
          <th>Delta</th>
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
                value={selectedTargetAllocations[item.asset] || 0}
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
