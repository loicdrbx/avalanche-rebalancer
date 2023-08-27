'use client'

import { motion } from 'framer-motion'

import { WalletAddress } from '@/components/blockchain/wallet-address'
import { WalletBalance } from '@/components/blockchain/wallet-balance'
import { WalletEnsName } from '@/components/blockchain/wallet-ens-name'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import useEthers from './useEthers';

//imports for table view
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';


export default function PageDashboard() {
  const { alotBalance, usdcBalance, wethBalance } = useEthers("0x57631Cf3266B84fa91e54e41516961d9DfE63100"); //TODO: Add your wallet address

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
