import React, { useState } from "react";
import { useContract, useContractRead, useContractWrite, ConnectWallet } from "@thirdweb-dev/react";

function App() {
  const { contract } = useContract("0x80986885fb6f3f2Be18f988750C1fA07bA54BFC3");
  const { data: favNumber, isLoading } = useContractRead(contract, "favNumber")

  const [number, setNumber] = useState(0);

  const { mutateAsync: updateFavNumber } = useContractWrite(contract, "updateFavNumber")

  const handleClick = async () => {
    try {
      const data = await updateFavNumber([number]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  return (
    <div>
      <ConnectWallet />
      <h2>My Favourite number is: {isLoading ? <span>Loading...</span> : favNumber.toString()}</h2>
      <input type="number" onChange={(e) => (
        setNumber(e.target.value)
      )
      } />
      <button onClick={handleClick}>Update</button>
    </div>
  );
}

export default App;
