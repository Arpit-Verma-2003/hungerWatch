import React, { useState } from "react";
import Web3 from "web3";
import { ethers } from "ethers";
import { ABI } from "./abi.js";
import { address } from "./contractaddress.js";
const Donation = () => {
  const {ethereum} = window;
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [para, setPara] = useState("");
  const [para1, setPara1] = useState("");
  const connectMetamaskFunc = async () =>{
    if(window.ethereum!=="undefined"){
      const accounts = await ethereum.request({method : "eth_requestAccounts"});
      console.log(accounts[0]);
      setPara(accounts[0]);
    }
  }
  const getDonationTotal = async () => {
    try {
      // const provider = await getProviderOrSigner();
      const result = await contract.methods.getDataFun().call();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  let contractApple;
  const connectContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    contractApple = new ethers.Contract(address, ABI, signer);
    const myData = await contractApple.getDataFun();
    console.log(myData);
    setPara1(myData.toString());
    setPara1(myData);
    console.log(myData)
    console.log(contractApple.target);
  };
  return (
    <>
      <h1>Donation</h1>
      <button onClick={connectMetamaskFunc}>Connect To Metamask</button>
      <button onClick={getDonationTotal}>Get Total Donation</button>
      <button onClick={connectContract}>Connect Contract</button>
      <p>this is life <br />{para}</p>
      <p>{para1}</p>
    </>
  );
};

export default Donation;
