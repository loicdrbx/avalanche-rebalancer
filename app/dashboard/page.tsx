"use client"

import React, { ChangeEvent, useState } from "react"

import { motion } from "framer-motion"
import { useAccount, useBalance } from "wagmi"
import { WalletAddress } from "@/components/blockchain/wallet-address"
import { WalletEnsName } from "@/components/blockchain/wallet-ens-name"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { trimFormattedBalance } from "@/lib/utils"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Table from "react-bootstrap/Table"

export default function PageDashboard() {
  // Get wallet address
  const { address } = useAccount()

  // Get token amounts
  const { data: avaxBalance } = useBalance({
    address: address,
  })
  const avaxAmount = Number(trimFormattedBalance(avaxBalance?.formatted, 4))

  const { data: alotBalance } = useBalance({
    address: address,
    token: "0x9983F755Bbd60d1886CbfE103c98C272AA0F03d6",
  })
  const alotAmount = Number(trimFormattedBalance(alotBalance?.formatted, 4))

  const { data: usdcBalance } = useBalance({
    address: address,
    token: "0x5425890298aed601595a70AB815c96711a31Bc65",
  })
  const usdcAmount = Number(trimFormattedBalance(usdcBalance?.formatted, 4))

  const { data: wethBalance } = useBalance({
    address: address,
    token: "0xc42E4b495020b87a2f2F7b4fb817F79fcF7043E2",
  })
  const wethAmount = Number(trimFormattedBalance(wethBalance?.formatted, 4))

  // Get token values in USD
  const avaxValue = avaxAmount * 9.905
  const alotValue = alotAmount * 0.3225
  const usdcValue = usdcAmount * 1
  const wethValue = wethAmount * 1628.2

  // Compute net asset value
  const nav = avaxValue + alotValue + usdcAmount + wethAmount

  // Compute current asset allocation
  const avaxCurrentAlloc = Math.round((avaxValue / nav) * 100)
  const alotCurrentAlloc = Math.round((alotValue / nav) * 100)
  const usdcCurrentAlloc = Math.round((usdcValue / nav) * 100)
  const wethCurrentAlloc = Math.round((wethValue / nav) * 100)

  // Hardcode target asset allocation for first render
  const avaxTargetAlloc = 20
  const alotTargetAlloc = 10
  const usdcTargetAlloc = 40
  const wethTargetAlloc = 30

  // Compute delta between current and target allocation
  const avaxDelta = avaxTargetAlloc - avaxCurrentAlloc
  const alotDelta = alotTargetAlloc - alotCurrentAlloc
  const usdcDelta = usdcTargetAlloc - usdcCurrentAlloc
  const wethDelta = wethTargetAlloc - wethCurrentAlloc

  // Compute buy/sell amount
  const avaxReaAlloc = +(((avaxDelta * nav) / 10.19) * 0.01).toFixed(2)
  const alotReaAlloc = +(((alotDelta * nav) / 0.39) * 0.01).toFixed(2)
  const usdcReaAlloc = +(((usdcDelta * nav) / 1) * 0.01).toFixed(2)
  const wethReaAlloc = +(((wethDelta * nav) / 1653.77) * 0.01).toFixed(4)

  //imports for table view

  let data = [
    {
      asset: "AVAX",
      amount: avaxAmount,
      value: Number(avaxValue.toFixed(2)),
      currentAllocation: avaxCurrentAlloc,
      targetAllocation: avaxTargetAlloc,
      delta: avaxDelta,
      buySellAmount: avaxReaAlloc,
      link: `https://app.dexalot-test.com/trade/AVAX-USDC`,
    },
    {
      asset: "ALOT",
      amount: alotAmount,
      value: Number(alotValue.toFixed(2)),
      currentAllocation: alotCurrentAlloc,
      targetAllocation: alotTargetAlloc,
      delta: alotDelta,
      buySellAmount: alotReaAlloc,
      link: `https://app.dexalot-test.com/trade/ALOT-USDC`,
    },
    {
      asset: "USDC",
      amount: usdcAmount,
      value: usdcValue.toFixed(2),
      currentAllocation: usdcCurrentAlloc,
      targetAllocation: usdcTargetAlloc,
      delta: usdcDelta,
      buySellAmount: usdcReaAlloc,
      link: `https://app.dexalot-test.com/trade/AVAX-USDC`,
    },
    {
      asset: "WETH.e",
      amount: wethAmount,
      value: Number(wethValue.toFixed(2)),
      currentAllocation: wethCurrentAlloc,
      targetAllocation: wethTargetAlloc,
      delta: wethDelta,
      buySellAmount: wethReaAlloc,
      link: `https://app.dexalot-test.com/trade/WETH.e-USDC`,
    },
  ]

  const [selectedTargetAllocations, setSelectedTargetAllocations] =
    useState(data)

  const handleTargetAllocationChange = (index: number, value: number) => {
    const updatedData = [...data]
    updatedData[index].targetAllocation = value

    var [avax, alot, usdc, weth] = [
      updatedData[0],
      updatedData[1],
      updatedData[2],
      updatedData[3],
    ]

    avax.delta = avax.targetAllocation - avax.currentAllocation
    alot.delta = alot.targetAllocation - alot.currentAllocation
    alot.delta = usdc.targetAllocation - usdc.currentAllocation
    weth.delta = weth.targetAllocation - weth.currentAllocation

    avax.buySellAmount = +(((avax.delta * nav) / 9.905) * 0.01).toFixed(2)
    alot.buySellAmount = +(((alot.delta * nav) / 0.3225) * 0.01).toFixed(2)
    usdc.buySellAmount = +(((usdc.delta * nav) / 1) * 0.01).toFixed(2)
    weth.buySellAmount = +(((weth.delta * nav) / 1628.2) * 0.01).toFixed(4)

    setSelectedTargetAllocations(updatedData)
  }

  return (
    <motion.div
      animate="show"
      className="flex-center flex h-full w-full"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      viewport={{ once: true }}
      whileInView="show"
    >
      <IsWalletConnected>
        <div className="flex-center col-span-12 flex flex-col lg:col-span-9">
          <div className="text-center">
            <h3 className="font-primary text-2xl font-bold lg:text-6xl">
              <span className="text-gradient-secondary">
                Your Portfolio <WalletEnsName />
              </span>
            </h3>
            <span className="font-light">
              <div className="mt-4">
                <span className="font-primary text-3xl font-light">
                  <Table bordered hover className="Table rounded">
                    <thead>
                      <tr>
                        <th>Asset</th>
                        <th>Amount (Asset)</th>
                        {/* <th>Value (USD)</th> */}
                        <th>Current Allocation (%)</th>
                        <th>Target Allocation (%)</th>
                        <th>Delta (%)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.asset}</td>
                          <td>{item.amount}</td>
                          {/* <td>{item.value}</td> */}
                          <td>{item.currentAllocation}%</td>
                          <td>
                            <Form.Control
                              type="number"
                              min={0}
                              max={100}
                              value={item.targetAllocation}
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
                          <td>{`${
                            Math.sign(item.buySellAmount) >= 0 ? "Buy" : "Sell"
                          } ${Math.abs(item.buySellAmount)}`}</td>
                          <td>
                            <a
                              href={item.link}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Button variant="primary">Rebalance</Button>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </span>
                <p>Net Asset Value (USD): {nav.toFixed(2)} </p>
              </div>
            </span>
          </div>
        </div>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <h3 className="text-lg font-normal">
          Connect Wallet to view your personalized dashboard.
        </h3>
      </IsWalletDisconnected>
    </motion.div>
  )
}
