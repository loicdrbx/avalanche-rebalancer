import { useState, useEffect } from 'react';
import { ethers } from 'ethers';


declare global {
    interface Window {
      ethereum: any;
    }
  }
  
type Balances = {
  alotBalance: number;
  usdcBalance: number;
  wethBalance: number;
  alotBalanceUsd: number;
  wethBalanceUsd: number;
};

const useEthers = (address: string): Balances => {
  const [balances, setBalances] = useState<Balances>({ alotBalance: 0, usdcBalance: 0, wethBalance: 0, alotBalanceUsd: 0, wethBalanceUsd: 0 });

  useEffect(() => {
    let signer = null;
    let provider;
    let abi;
    let usdcContract;
    let alotContract;
    let wethContract;
    

    const fetchBalances = async () => {
      if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider('homestead');
      } else {
        provider = new ethers.JsonRpcProvider("https://avalanche-fuji.infura.io/v3/b5eb8c9c2143460ca474f9d37b5cdfde");
        //signer = await provider.getSigner();  - Signer needed when needing to write transactions to blockchain

        abi = [
          "function decimals() view returns (string)",
          "function symbol() view returns (string)",
          "function balanceOf(address addr) view returns (uint)"
        ]

        //Avalanche balances
        //USDC
        usdcContract = new ethers.Contract("0x5425890298aed601595a70AB815c96711a31Bc65", abi, provider);
        const usdcBalance = await usdcContract.balanceOf(address) / 1000000n;

        //ALOT
        alotContract = new ethers.Contract("0x9983F755Bbd60d1886CbfE103c98C272AA0F03d6", abi, provider);
        const alotBalance = await alotContract.balanceOf(address) / 1000000000000000000n;
        const alotBalanceUsd = Number(alotBalance) * 0.39;
        
        //WETH.e
        wethContract = new ethers.Contract("0xc42E4b495020b87a2f2F7b4fb817F79fcF7043E2", abi, provider);
        const wethBalance = await wethContract.balanceOf(address) / 1000000000000000000n;
        const wethBalanceUsd = Number(wethBalance) * 1653.77;

        // Convert to strings right away
        setBalances({ 
          alotBalance: Number(alotBalance), 
          usdcBalance: Number(usdcBalance),
          wethBalance: Number(wethBalance),
          wethBalanceUsd: wethBalanceUsd,
          alotBalanceUsd: alotBalanceUsd
        });
      }
    };

    fetchBalances();
  }, [address]);

  return balances;
};

export default useEthers;
