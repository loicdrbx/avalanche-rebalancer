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
    const updatedData = [...data]; ///pulling in current shit on ui
    updatedData[index].targetAllocation = value;

    var [avax, alot, usdc, weth] = [updatedData[0], updatedData[1], updatedData[2], updatedData[3]];

    //const nav = avax.amount + alot.amount + usdc.amount + weth.amount; 
    //old nav calculation above caused re-calculate issue: we were using token value, not USD value

    const avaxBalanceUsd = avax.amount * 10.19; 
    const alotBalanceUsd = alot.amount * 0.39; 
    const wethBalanceUsd = weth.amount * 1653.77; 
   //don't need to convert usdc
    const nav = avaxBalanceUsd + wethBalanceUsd + alotBalanceUsd + usdc.amount;

    avax.delta = avax.targetAllocation - avax.currentAllocation;
    alot.delta = alot.targetAllocation - alot.currentAllocation;
    usdc.delta = usdc.targetAllocation - usdc.currentAllocation;
    weth.delta = weth.targetAllocation - weth.currentAllocation;
  
    avax.buySellAmount = +((nav * (avax.targetAllocation * 0.01)) / 10.19).toFixed(2) - avax.amount;
    alot.buySellAmount = +((nav * (alot.targetAllocation * 0.01)) / 0.39).toFixed(2) - alot.amount;
    usdc.buySellAmount = +((nav * (usdc.targetAllocation * 0.01)) / 1).toFixed(2) - usdc.amount;
    weth.buySellAmount = +((nav * (weth.targetAllocation * 0.01)) / 1653.77).toFixed(4) - weth.amount;

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
          <th>Delta</th>
          <th>Buy(+) or Sell(-)</th>
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
            <td>{item.delta}%</td>
            <td>{item.buySellAmount} {item.asset}</td>
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
