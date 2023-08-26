'use client'

import { motion } from 'framer-motion'

import { WalletAddress } from '@/components/blockchain/wallet-address'
import { WalletBalance } from '@/components/blockchain/wallet-balance'
import { WalletEnsName } from '@/components/blockchain/wallet-ens-name'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import useEthers from './useEthers';

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
              <WalletAddress className="mt-5 block text-xl font-light" />
              <div className="mt-4">
                <span className="font-primary text-3xl font-light">
                  AVAX Balance: <WalletBalance className="" decimals={7} />
                  {alotBalance && <p>ALOT Balance: {(alotBalance)}</p>}
                  {usdcBalance && <p>USDC Balance: {(usdcBalance)}</p>}
                  {wethBalance && <p>WETH.e Balance: {(wethBalance)}</p>}
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
