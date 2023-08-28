'use client'

import { motion } from 'framer-motion'

import { WalletAddress } from '@/components/blockchain/wallet-address'
import { WalletBalance } from '@/components/blockchain/wallet-balance'
import { WalletEnsName } from '@/components/blockchain/wallet-ens-name'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { useAccount, useBalance } from 'wagmi'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { trimFormattedBalance } from '@/lib/utils'
import useEthers from './useEthers';

//imports for table view
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import AllocationTable from './allocationTable'


const sampleData = [
  {
    asset: 'AVAX',
    amount: 10,
    currentAllocation: 40,
    targetAllocation: 50,
    delta: -10,
    buySellAmount: 1000,
  },
  {
    asset: 'ALOT',
    amount: 10,
    currentAllocation: 30,
    targetAllocation: 25,
    delta: 5,
    buySellAmount: -500,
  },
  {
    asset: 'USDC',
    amount: 10,
    currentAllocation: 30,
    targetAllocation: 25,
    delta: 5,
    buySellAmount: -500,
  },
  {
    asset: 'WETH.e',
    amount: 10,
    currentAllocation: 30,
    targetAllocation: 25,
    delta: 5,
    buySellAmount: -500,
  }
];

export default function PageDashboard() {

  const { address } = useAccount();
  const { data: balance } = useBalance({ address })
  const avaxBalance = trimFormattedBalance(balance?.formatted, 4);
  const avaxBalanceUsd = Number(avaxBalance) * 10.19;
  let { alotBalance, usdcBalance, wethBalance, alotBalanceUsd, wethBalanceUsd } = useEthers(`${address}`);

  const nav = avaxBalanceUsd + wethBalanceUsd + alotBalanceUsd + usdcBalance;
  
  const avaxCurrent = Math.round(avaxBalanceUsd / nav * 100); // 30%
  const alotCurrent = Math.round(alotBalanceUsd / nav * 100);        // 10%
  const usdcCurrent = Math.round(usdcBalance / nav * 100);          // 40%
  const wethCurrent = Math.round(wethBalanceUsd / nav * 100);       // 20%

  //User inputs target %. Ensure user inputs percentages rounded to full number
  const avaxTarget = 20;
  const alotTarget = 10;
  const usdcTarget = 40;
  const wethTarget = 30;

  const avaxDiff = (avaxTarget - avaxCurrent); 
  const alotDiff = (alotTarget - alotCurrent);
  const usdcDiff = (usdcTarget - usdcCurrent);
  const wethDiff = (wethTarget - wethCurrent);

  const avaxAmount = avaxDiff * nav; 
  const alotAmount = alotDiff * nav;
  const usdcAmount = usdcDiff * nav;
  const wethAmount = wethDiff * nav;

  
  return (
    <motion.div
      animate="show"
      className="flex-center flex h-full w-full"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      viewport={{ once: true }}
      whileInView="show">
      <IsWalletConnected>
        <div className="flex-center col-span-12 flex flex-col lg:col-span-9">
          <div className="text-center">
            <h3 className="font-primary text-2xl font-bold lg:text-6xl">
              <span className="text-gradient-secondary">
                hi 👋 <WalletEnsName />
              </span>
            </h3>
            <span className="font-light">  
              <div className="mt-4">
                <span className="font-primary text-3xl font-light">

                <h1>Allocation Table</h1>
                <AllocationTable data={sampleData} />

                <Container fluid>
                    <Row className="justify-content-center mt-5">
                      <Col md={8}>
                        <Table bordered hover className="rounded">
                          <thead>
                            <tr>
                              <th>Token</th>
                              <th>Balance</th>
                              <th>DEX Link</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>AVAX</td>
                              <td>
                                <WalletBalance className="" decimals={7} />
                              </td>
                              <td><a href="https://app.dexalot-test.com/trade/AVAX-USDC" target="_blank" rel="noopener noreferrer" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-small py-0.5 px-2 rounded">AVAX Link</a></td>
                            </tr>
                            {alotBalance && (
                              <tr>
                                <td>ALOT</td>
                                <td>{alotBalance}</td>
                                <td><a href="https://app.dexalot-test.com/trade/ALOT-USDC" target="_blank" rel="noopener noreferrer" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-small py-0.5 px-2 rounded">ALOT Link</a></td>
                              </tr>
                            )}
                            {usdcBalance && (
                              <tr>
                                <td>USDC</td>
                                <td>{usdcBalance}</td>
                                <td><a href="https://app.dexalot-test.com/trade/AVAX-USDC" target="_blank" rel="noopener noreferrer" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-small py-0.5 px-2 rounded">USDC Link</a></td>
                              </tr>
                                        // There is no USDC-USDC pair, that would be silly. So I chose next best pair of AVAX-USDC.
                            )}
                            {wethBalance && (
                              <tr>
                                <td>WETH.e</td>
                                <td>{wethBalance}</td>
                                <td><a href="https://app.dexalot-test.com/trade/WETH.e-USDC" target="_blank" rel="noopener noreferrer" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-small py-0.5 px-2 rounded">WETH.e Link</a></td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </Container>
                </span>
              </div>
            </span>
          </div>
        </div>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <h3 className="text-lg font-normal">Connect Wallet to view your personalized dashboard.</h3>
      </IsWalletDisconnected>
    </motion.div>
  )
}
