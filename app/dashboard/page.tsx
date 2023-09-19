'use client'

import React from 'react'

import { motion } from 'framer-motion'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import { useAccount, useBalance } from 'wagmi'

import { WalletAddress } from '@/components/blockchain/wallet-address'
import { WalletBalance } from '@/components/blockchain/wallet-balance'
import { WalletEnsName } from '@/components/blockchain/wallet-ens-name'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { trimFormattedBalance } from '@/lib/utils'

import AllocationTable from './allocationTable'

export default function PageDashboard() {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })
  const { data: rawAlotBalance } = useBalance({ address: address, token: "0x9983F755Bbd60d1886CbfE103c98C272AA0F03d6" })
  const { data: rawUsdcBalance } = useBalance({ address: address, token: "0x5425890298aed601595a70AB815c96711a31Bc65" })
  const { data: rawWethBalance } = useBalance({ address: address, token: "0xc42E4b495020b87a2f2F7b4fb817F79fcF7043E2" })
  const avaxBalance = Number(trimFormattedBalance(balance?.formatted, 4));
  const alotBalance = Number(trimFormattedBalance(rawAlotBalance?.formatted, 4));
  const usdcBalance = Number(trimFormattedBalance(rawUsdcBalance?.formatted, 4));
  const wethBalance = Number(trimFormattedBalance(rawWethBalance?.formatted, 4));
  const avaxBalanceUsd = avaxBalance * 10.19; //40.49
  const alotBalanceUsd = alotBalance * 0.39; //1.56
  const wethBalanceUsd = wethBalance * 1653.77; //3.97
                                                //usd balance: 2
  const nav = avaxBalanceUsd + wethBalanceUsd + alotBalanceUsd + usdcBalance; //48.02
  
  const avaxCurrent = Math.round(avaxBalanceUsd / nav * 100); // 30%
  const alotCurrent = Math.round(alotBalanceUsd / nav * 100);        // 10%
  const usdcCurrent = Math.round(usdcBalance / nav * 100);          // 40%
  const wethCurrent = Math.round(wethBalanceUsd / nav * 100);       // 20%

  //User inputs target %. Ensure user inputs percentages rounded to full number
  const avaxTarget = 20;
  const alotTarget = 10;
  const usdcTarget = 40;
  const wethTarget = 30;

  const avaxDiff = avaxTarget - Math.round(avaxBalanceUsd / nav * 100);  //20 - (40.49 / 48.02*100)  = 19.99
  const alotDiff = alotTarget - Math.round(alotBalanceUsd / nav * 100);
  const usdcDiff = usdcTarget - Math.round(usdcBalance / nav * 100);
  const wethDiff = wethTarget - Math.round(wethBalanceUsd / nav * 100);


  const avaxAmount = +((nav * (avaxTarget * 0.01)) / 10.19).toFixed(2) - avaxBalance;
  const alotAmount = +((nav * (alotTarget * 0.01)) / 0.39).toFixed(2) - alotBalance;
  const usdcAmount = +((nav * (usdcTarget * 0.01)) / 1).toFixed(2) - usdcBalance;
  const wethAmount = +((nav * (wethTarget * 0.01)) / 1653.77).toFixed(4) - wethBalance;



  //imports for table view

  const sampleData = [
    {
      asset: 'AVAX',
      amount: avaxBalance,
      currentAllocation: avaxCurrent,
      targetAllocation: avaxTarget,
      delta: avaxDiff,
      buySellAmount: avaxAmount,
      link: `https://app.dexalot-test.com/trade/AVAX-USDC`,
    },
    {
      asset: 'ALOT',
      amount: alotBalance,
      currentAllocation: alotCurrent,
      targetAllocation: alotTarget,
      delta: alotDiff,
      buySellAmount: alotAmount,
      link: `https://app.dexalot-test.com/trade/ALOT-USDC`,
    },
    {
      asset: 'USDC',
      amount: usdcBalance,
      currentAllocation: usdcCurrent,
      targetAllocation: usdcTarget,
      delta: usdcDiff,
      buySellAmount: usdcAmount,
      link: `https://app.dexalot-test.com/trade/AVAX-USDC`,
    },
    {
      asset: 'WETH.e',
      amount: wethBalance,
      currentAllocation: wethCurrent,
      targetAllocation: wethTarget,
      delta: wethDiff,
      buySellAmount: wethAmount,
      link: `https://app.dexalot-test.com/trade/WETH.e-USDC`,
    },
  ]

  
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
              <span className="text-gradient-sand">
                Your Portfolio
              </span>
            </h3>
            <span className="font-light">
              <div className="mt-4">
                <span className="font-primary text-3xl font-light">
                  <AllocationTable data={sampleData} />
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