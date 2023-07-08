import React, { useState, useEffect, Component } from "react";
import Timer from "react-compound-timer";
import HeaderFooter from "../layout/HeaderFooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter, useRouter } from "next/router";
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import classNames from "classnames/bind";
import { utils } from "ethers";
import Image from "next/image";
import styles from "../styles/stake.module.scss";
import "animate.css";
import axios from "axios";
import {
  stake,
  earned,
  getStakeByAddress,
  getInscriptionsByAddress,
  inscription,
  getTotalStake,
  getBoxByAddress,
  openBox,
  getRefundByAddress,
  refundBiso,
  earnSpeed,
} from "../api/api";

const receiveAddress = [
  "bc1pxuzwjt7efr5hvrxr2eqm23vvw6cu35479u3smhsg44spydl4jfsq0yflrm",
];

const StakePool = (props) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { projectID, name, isOver } = props;

  const [transferableBalance, setTransferableBalance] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [overallBalance, setOverallBalance] = useState(0);
  const [transferableInscriptions, setTransferableInscriptions] = useState([]);
  const [buildInscriptions, setBuildInscriptions] = useState([]);
  const [mintNft, setMintNft] = useState(0);
  const [transferValue, setTransferValue] = useState(0);
  const [stakeBalance, setStakeBalance] = useState(0);
  const [totalStake, setTotalStake] = useState(0);
  const [isRefund, setIsReund] = useState(false);
  const [btnTimeout, setBtnTimeout] = useState(false);

  useEffect(() => {
    updateBalance();
    const getStake = () => {
      const timer = setInterval(async () => {
        const totalStake = await getTotalStake(projectID);
        setTotalStake(totalStake.data.totalStake);
        updateBalance();
      }, 5000);
      return () => {
        clearInterval(timer);
      };
    };
    getStake();
  }, []);

  const updateBalance = async () => {
    let accounts = await window.unisat.getAccounts();
    if (accounts[0]) {
      // accounts[0] = "bc1pquz9fjtherpg28gq7dns5llhha90x7rzckwkpae2squrrm82e53slpjl74"
      const balanceData = await axios.get(
        `https://unisat.io/brc20-api-v2/address/${accounts[0]}/brc20/summary?start=0&limit=100`
      );
      for (var i = 0; i < balanceData.data.data.detail.length; i++) {
        console.log(balanceData.data.data.detail[i]);
        if (balanceData.data.data.detail[i].ticker == "biso") {
          setTransferableBalance(
            balanceData.data.data.detail[i].transferableBalance
          );
          setAvailableBalance(balanceData.data.data.detail[i].availableBalance);
          setOverallBalance(balanceData.data.data.detail[i].overallBalance);
        }
      }
      const Inscriptions = await getInscriptionsByAddress(
        accounts[0],
        projectID
      );
      console.log("Inscriptions", Inscriptions.inscriptions);
      let inscription1 = Inscriptions.inscriptions;
      const transferableInscriptions = await axios.get(
        `https://unisat.io/brc20-api-v2/address/${accounts[0]}/brc20/biso/transferable-inscriptions?limit=512&start=0`
      );
      console.log(transferableInscriptions.data.data.detail);
      const transferableInscription1 =
        transferableInscriptions.data.data.detail;
      let tempTransferableInscriptionArr = [];
      for (var i = 0; i < transferableInscription1.length; i++) {
        tempTransferableInscriptionArr.push(
          transferableInscription1[0].inscriptionId
        );
      }
      console.log(
        "tempTransferableInscriptionArr",
        transferableInscriptions.data.data.detail,
        tempTransferableInscriptionArr
      );
      inscription1 = inscription1.filter((item) =>
        tempTransferableInscriptionArr.indexOf(item.inscriptionId)
      );
      console.log("inscription1", Inscriptions.inscriptions, inscription1);
      setBuildInscriptions(inscription1);

      setTransferableInscriptions(transferableInscriptions.data.data.detail);
      const earn = await earnSpeed(accounts[0], projectID);
      console.log("earn", earn.earn);
      setMintNft(earn.earn);
      const stakeBiso = await getStakeByAddress(accounts[0], projectID);
      console.log("stakeBiso", stakeBiso);
      setStakeBalance(stakeBiso.totalSupply);
      const isrefund = await getRefundByAddress(accounts[0]);
      console.log("isrefund", isrefund.isFund);
      setIsReund(isrefund.isFund);
    }
  };

  const inscribeTransfer = async () => {
    window.unisat.requestAccounts();
    let accounts = await window.unisat.getAccounts();
    const { data } = await axios.get(
      `https://mempool.space/api/v1/fees/recommended`
    );
    console.log(data);
    let { inscriptionId } = await window.unisat.inscribeTransfer(
      "biso",
      transferValue,
      {
        feeRate: data.halfHourFee,
      }
    );
    console.log(inscriptionId);
    // let inscriptionId = "574101b8506f048807253b34b4c5298d42d659324b37457c21f90bf0514e6088i0"
    await inscription(accounts[0], transferValue, inscriptionId, projectID);
    toast.success("Inscription success", toastConfig);
    setTransferValue(0);
  };

  const sendInscription = async (inscriptionId, amount) => {
    if (
      new Date().getTime() / 1000 < 1688295600 ||
      new Date().getTime() / 1000 > 1688468400
    ) {
      toast.warning("Stake not start or already end.", toastConfig);
      return;
    }
    window.unisat.requestAccounts();
    let accounts = await window.unisat.getAccounts();
    console.log(inscriptionId);
    const { data } = await axios.get(
      `https://mempool.space/api/v1/fees/recommended`
    );
    console.log(data);
    let txid = await window.unisat.sendInscription(
      receiveAddress[0],
      inscriptionId,
      {
        feeRate: data.halfHourFee,
      }
    );
    // let txid = "471ae5fbcd97a44c931ed7261c2dad6ea1354f7232ecceecbab8eebfc606aff4"
    await stake(accounts[0], txid, amount, inscriptionId, projectID);
    toast.success("Stake success", toastConfig);
    console.log("txid", txid);
  };

  const refund = async () => {
    if (btnTimeout) return;
    setBtnTimeout(true);
    setTimeout(() => {
      setBtnTimeout(false);
    }, 1000);
    if (isRefund) {
      toast.warning("Already refund!", toastConfig);
      return;
    }
    window.unisat.requestAccounts();
    let accounts = await window.unisat.getAccounts();
    const { data } = await axios.get(
      `https://mempool.space/api/v1/fees/recommended`
    );
    let txid = await window.unisat.sendBitcoin(
      "bc1pxuzwjt7efr5hvrxr2eqm23vvw6cu35479u3smhsg44spydl4jfsq0yflrm",
      utils.parseUnits(String(0.0008), 8) * 1,
      {
        feeRate: data.halfHourFee,
      }
    );
    console.log(txid);
    if (txid) {
      await refundBiso(accounts[0], txid);
      toast.success("Payment success", toastConfig);
    }
    // updateBalance();
  };

  const toastConfig = {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: null,
    pauseOnHover: false,
  };

  return (
    <>
      <div className={classNames(styles.card, styles.hasmoon)} style={{"opacity": !isOver? 1:0.4}}>
        <div className={styles.cardTitle}>
          <span>Stake $BISO</span> Earn ${name}.
        </div>
        <div className={styles.props}>
          <div className={styles.label}>Total Reward</div>
          <div className={classNames(styles.val, styles.ori)}>300000 ${name}</div>
        </div>
        <div className={styles.props}>
          <div className={styles.label}>Total Stake</div>
          <div className={classNames(styles.val, styles.ori)}>
            {totalStake} $BISO
          </div>
        </div>
        <div className={styles.props}>
          <div className={styles.label}>APR</div>
          <div className={classNames(styles.val, styles.ori)}>
            {(3000 / (totalStake * 0.003) / 7) * 365 * 100} %
          </div>
        </div>
        <div className={styles.props}>
          <div className={styles.label}>Total Balance</div>
          <div className={classNames(styles.val, styles.ori)}>
            {overallBalance} $BISO
          </div>
        </div>
        <div className={styles.props}>
          <div className={styles.label}>Available Balance</div>
          <div className={classNames(styles.val, styles.ori)}>
            {availableBalance} $BISO
          </div>
        </div>
        <div className={styles.inputWrap}>
          <input
            type="text"
            placeholder="Please Input Number"
            value={transferValue}
            onChange={(e) => setTransferValue(e.target.value)}
          />
          <button onClick={() => inscribeTransfer()}>Inscribe Transfer</button>
        </div>
        {/* <div className={styles.btn}>
          <button onClick={()=>inscribeTransfer()}>Inscribe Transfer</button>
        </div> */}
        <div className={styles.props}>
          <div className={styles.label}>Transferable Balance</div>
          <div className={classNames(styles.val, styles.ori)}>
            {transferableBalance} $BISO
          </div>
        </div>
        <ul className={styles.inscriptions}>
          {buildInscriptions.map((inscription, index) => (
            <li key={index}>
              <h1>Unconfirmed</h1>
              <h2>BISO</h2>
              <h3>{inscription.amount}</h3>
              <p>
                <button className={styles.grey}>Stake</button>
              </p>
            </li>
          ))}
          {transferableInscriptions.map((inscription, index) => (
            <li key={index}>
              <h1>#{inscription.inscriptionNumber}</h1>
              <h2>BISO</h2>
              <h3>{inscription.data.amt}</h3>
              <p>
                <button
                  onClick={() =>
                    sendInscription(
                      inscription.inscriptionId,
                      inscription.data.amt
                    )
                  }
                >
                  Stake
                </button>
              </p>
            </li>
          ))}
        </ul>
        <div className={styles.cardTitle}>
          <span>Mint</span> Info.
        </div>
        <div className={styles.props}>
          <div className={styles.label}>My Stake Amount</div>
          <div className={classNames(styles.val, styles.ori)}>
            {stakeBalance} $BISO
          </div>
        </div>
        <div className={styles.props}>
          <div className={styles.label}>Already Mint Amount</div>
          <div className={classNames(styles.val, styles.ori)}>
            {mintNft} {name}
          </div>
        </div>
        <div className={styles.props}>
          <div className={styles.label}>Stake Time</div>
          <div className={classNames(styles.val, styles.ori)}>
            2023.7.2 19:00 - 2023.7.4 19:00
          </div>
        </div>
        <div className={styles.props}>
          <div className={styles.label}>Mint Time</div>
          <div className={classNames(styles.val, styles.ori)}>
           2023.7.4 19:00 - 2023.7.11 19:00
          </div>
        </div>
        <p>
          It will be automatically refunded to your account within 12 hours of
          completion.
        </p>
        <p>
            <button onClick={() => refund()}>Withdraw</button>
          </p>
      </div>
    </>
  );
};

const Stake = () => {
  return (
    <HeaderFooter activeIndex={4}>
      <ToastContainer />
      <div className={styles.wrapper}>
        <div className={styles.container} id="mint">
          <div className={styles.mintWrap}>
            <div className={styles.mint}>
              <div className={styles.title}>
                <span>Stake $BISO</span>
                <br />
                Earn $$$
              </div>
              <div className={styles.projects}>    
                <StakePool projectID="3" name="TBWZ" isOver={false} />
                {/* <StakePool projectID="2" name="ARKS" isOver={true} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderFooter>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default withRouter(Stake);
