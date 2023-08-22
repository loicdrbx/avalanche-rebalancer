import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [balance, setBalance] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(
          "https://avalanche-fuji.infura.io/v3/39e0a61714e0484db229e80b2c686f27/" //Avalanche testnet endpoint from Infura
        );
        const heads = await provider.send("qn_getWalletTokenBalance", {
          wallet: "0xABd59256fdB8d744D1A8daaE4F6c39C208C98336",
          contracts: ["0xd00ae08403B9bbb9124bB305C09058E32C39A48c"] //this is wAVAX token address on testnet              
        });
        const fetchedBalance = heads.assets.map((bal: any) => bal.amount);
        setBalance(fetchedBalance);
      } catch (err: any) {
        setError(`Error fetching balance: ${err.message}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        balance.map((bal, index) => (
          <p key={index}>Balance: {bal}</p>
        ))
      )}
    </div>
  );
}

export default App;