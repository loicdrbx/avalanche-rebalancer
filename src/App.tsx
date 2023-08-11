import "./App.css";
import { LatestTransactions, SQLQuery } from "@sort/react-components";
function App() {
  return (
    <>
      <h1>Hello World, we still don't know our group name!</h1>
      <LatestTransactions
        contract_address="0x887f3909c14dabd9e9510128ca6cbb448e932d7f"
        api_key="ec2fa3f2-7fdc-4342-9ebc-95f8b2bd7d21"
        theme="dark"
        blockchain="ethereum"
      />
      <SQLQuery
        query="select * from ethereum.transaction where to_address='0xdac17f958d2ee523a2206206994597c13d831ec7' order by block_id desc"
        api_key=""
      />
    </>
  );
}

export default App;