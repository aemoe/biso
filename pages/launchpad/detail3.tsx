// @ts-nocheck
import React, { useState, useEffect } from "react";
import Timer from "react-compound-timer";
import HeaderFooter from "../../layout/HeaderFooter";
import "react-toastify/dist/ReactToastify.css";
import { withRouter, useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/launchpad_detail.module.scss";
import "animate.css";
import axios from "axios";
import avatar from "../../public/launchpad/avatar3.png";
import address from "../../public/launchpad/address.png";
import github from "../../public/launchpad/github.png";
import twitter from "../../public/launchpad/twitter.png";
import telegram from "../../public/launchpad/telegram.png";
import discord from "../../public/launchpad/discord.png";
import meta from "../../public/launchpad/meta.png";
import yellowArrow from "../../public/home/yellow_arrow.svg";
import whiteArrow from "../../public/home/white_arrow.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Echart from "../../components/Echart";
import { utils, BigNumber } from "ethers";
import { ToastContainer, toast } from "react-toastify";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  mintSale,
  getAmountByAddress,
  getTotalSale,
  projectCheckWhitelist,
} from "../../api/api";

const toastConfig = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const LaunchpadDetails = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const options = {
    color: ["#64708B", "#F3BA2F", "#282D34", "#21BF73"],
    tooltip: {
      trigger: "item",
    },
    legend: {
      left: "center",
      top: "20px",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "55%"],
        center: ["50%", "70%"],
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 60000000, name: "Public Donation" },
          { value: 15000000, name: "Treasury" },
          { value: 20000000, name: "Play2Earn" },
          { value: 5000000, name: "Airdrop" },
        ],
      },
    ],
  };

  interface Member {
    id: number;
    name: string;
    position: string;
    avatar: StaticImageData;
    intro: string;
  }

  const myTeam: Member[] = [
    {
      id: 1,
      name: "Ordplay",
      position: "Founder",
      avatar,
      intro: `The OrdPlay team is composed of BTC enthusiasts and seasoned builders from the GameFi sector, offering a rich blend of blockchain and gaming expertise. Our team is committed to creating a platform that's fully owned and governed by its community, underscoring our dedication to decentralization. We aim to foster a vibrant and dynamic gaming environment, ensuring that OrdPlay remains a pioneer and leader in the BRC20 ecosystem's GameFi space.`,
    },
  ];

  const [tokenPrice, setTokenPrice] = useState(0.00000033);
  const [percentage, setPercentage] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [whitelistActualAmount, setWhitelistActualAmount] = useState(0);
  const [actualAmount, setActualAmount] = useState(0);
  const [whitelistFundraisers, setWhitelistFundraisers] = useState(0);
  const [fundraisers, setFundraisers] = useState(0);
  const [whitelistObtained, setWhitelistObtained] = useState(0);
  const [obtained, setObtained] = useState(0);
  const [balance, setBalance] = useState("0");
  const [team, setTeam] = useState<Member[]>(myTeam);
  const [status, setStatus] = useState("Listed");
  const [currentRate, setCurrentRate] = useState(65.3212345);
  const [myContribution, setMyContribution] = useState(0.0);
  const [totalContribution, setTotalContribution] = useState(65);
  const [audit, setAudit] = useState("No");
  const [KYC, setKYC] = useState("No");
  const [supply, setSupply] = useState(14);
  const [lockDuration, setLockDuration] = useState(32542);
  const [lockPercent, setLockPercent] = useState(25);
  const [btnEnable, setBtnEnable] = useState(false);
  const [whitelistInput, setWhitelistInput] = useState(0.01);
  const [publicInput, setPublicInput] = useState(0.01);
  const [myWhitelistBtc, setMyWhitelistBtc] = useState(0);
  const [myPublicBtc, setMyPublicBtc] = useState(0);
  const [isWhitelist, setIsWhitelist] = useState(false);

  const wallet = [
    "",
    "bc1pu06pldh0l3pky9vzucgc86yjarrkct0c7tnp6yyztqgts49xvyeqr9mfkv",
    "bc1plwvzy06s0axy50ahn5g8dtgntjmkua8qkfed2ysupcvr7fjhk9mqzcjmrl",
  ];

  useEffect(() => {
    // updateBalance();
    const setUpdate = () => {
      const timer = setInterval(async () => {
        update();
      }, 5000);
      return () => {
        clearInterval(timer);
      };
    };
    setUpdate();
  }, []);

  const whiteAmount = 6,
    publicAmount = 14;

  const update = async () => {
    const totalWhitelistSale = await getTotalSale(4, 1);
    console.log("totalSale", totalWhitelistSale.data);
    setWhitelistFundraisers(totalWhitelistSale.data.totalUsers);
    setWhitelistActualAmount(totalWhitelistSale.data.totalSale);
    const totalPublicSale = await getTotalSale(4, 2);
    console.log("totalPublicSale", totalPublicSale.data);
    setFundraisers(totalPublicSale.data.totalUsers);
    setActualAmount(totalPublicSale.data.totalSale);
    let accounts = await window.unisat.getAccounts();
    if (accounts[0]) {
      // accounts[0] =
      //   "bc1pmhsfvsy0s5antfw32hmav7vsa34rxvsxel3u5w42mh5ate9rdnhsqampvf";
      const balance = await window.unisat.getBalance();
      setBalance(utils.formatUnits(String(balance.total), 8).toString());
      const whitelistTotalSale = await getAmountByAddress(accounts[0], 1, 1);
      console.log("whitelistTotalSale", whitelistTotalSale);
      setMyWhitelistBtc(whitelistTotalSale.data.totalBuy);
      console.log("totalWhitelistSale", totalWhitelistSale.data.totalBuy);
      const WhitelistObtained =
        totalWhitelistSale.data.totalSale * 1 < whiteAmount
          ? (whitelistTotalSale.data.totalBuy * 1) / 0.0000000034
          : (whitelistTotalSale.data.totalBuy * 1) /
            ((totalWhitelistSale.data.totalSale * 1) / whiteAmount) /
            0.0000000034;
      setWhitelistObtained(WhitelistObtained);

      const publicTotalSale = await getAmountByAddress(accounts[0], 1, 2);
      setMyPublicBtc(publicTotalSale.data.totalBuy);
      console.log("publicTotalSale", publicTotalSale);
      const publicObtained =
        totalPublicSale.data.totalSale * 1 < publicAmount
          ? (publicTotalSale.data.totalBuy * 1) / 0.0000000034
          : (publicTotalSale.data.totalBuy * 1) /
            ((totalPublicSale.data.totalSale * 1) / publicAmount) /
            0.0000000034;
      console.log(
        "publicTotalSale",
        publicTotalSale.data.totalBuy,
        publicTotalSale.data.totalSale
      );

      setObtained(publicObtained);
      const isWhiteList = await projectCheckWhitelist(accounts[0]);
      setIsWhitelist(isWhiteList.data.isWhitelist);
    }
  };
  const setMax = async (value: number, type: number) => {
    let accounts = await window.unisat.getAccounts();
    const totalSale = await getAmountByAddress(accounts[0], 1, type);
    console.log("totalSale11", totalSale.data.totalBuy);
    if (type == 1) {
      setWhitelistInput(
        utils.formatUnits(
          utils
            .parseUnits(String("0.077"), 8)
            .sub(utils.parseUnits(String(totalSale.data.totalBuy), 8)),
          8
        )
      );
    } else if (type == 2) {
      console.log(0.577 - totalSale.data.totalBuy);
      setPublicInput(
        utils.formatUnits(
          utils
            .parseUnits(String("0.577"), 8)
            .sub(utils.parseUnits(String(totalSale.data.totalBuy), 8)),
          8
        )
      );
    }
  };

  const mint = async (type: number) => {
    console.log("btnEnable", btnEnable);
    if (btnEnable) return;
    setBtnEnable(true);
    setTimeout(() => {
      setBtnEnable(false);
    }, 1000);

    if (new Date().getTime() < 1685624400000 && type == 1) {
      toast.warning("The Whitelist sale round has yet to begin", toastConfig);
      return;
    }

    if (new Date().getTime() < 1685678400000 && type == 2) {
      toast.warning("The Public sale round has yet to begin", toastConfig);
      return;
    }

    if (
      new Date().getTime() > 1685624400000 + 12 * 60 * 60 * 1000 &&
      type == 1
    ) {
      toast.warning("The Whitelist sale round has end", toastConfig);
      return;
    }

    if (
      new Date().getTime() > 1685678400000 + 12 * 60 * 60 * 1000 &&
      type == 2
    ) {
      toast.warning("The Whitelist sale round has end", toastConfig);
      return;
    }

    if (
      (type == 1 && whitelistInput * 1 < 0.01) ||
      whitelistInput * 1 > 0.077
    ) {
      toast.warning(
        "Your contribution amount must be between 0.01 to 0.077!",
        toastConfig
      );
      return;
    }

    let accounts = await window.unisat.requestAccounts();

    const whitelistInputSale = await getAmountByAddress(accounts[0], 1, 1);
    if (
      type == 1 &&
      whitelistInputSale.data.totalBuy * 1 + whitelistInput * 1 > 0.077
    ) {
      toast.warning(
        "Your contribution amount cannot exceed 0.077",
        toastConfig
      );
      return;
    }

    const publicInputSale = await getAmountByAddress(accounts[0], 1, 2);
    console.log("publicInputSale", publicInputSale);
    if (
      type == 2 &&
      publicInputSale.data.totalBuy * 1 + publicInput * 1 > 0.577
    ) {
      toast.warning(
        "Your contribution amount cannot exceed 0.577",
        toastConfig
      );
      return;
    }

    if (type == 2 && (publicInput * 1 < 0.01 || publicInput * 1 > 0.577)) {
      toast.warning(
        "Your contribution amount must be between 0.01 to 0.577!",
        toastConfig
      );
      return;
    }

    // let accounts = await window.unisat.getAccounts();

    const isWhitelist = await projectCheckWhitelist(accounts[0]);
    console.log("isWhitelist", isWhitelist.data.isWhitelist);
    if (type == 1 && !isWhitelist.data.isWhitelist) {
      toast.warning("Your address are not in whitelist.", toastConfig);
      return;
    }
    // let txid =
    //     "a7a83f036208bebf6577a2c76d9b49ab6fe03e6944bcfe066e8c0d35c20aa414";
    if (type == 1) {
      let inputValue =
        utils.parseUnits(String(whitelistInput), 8).add("70000").toString() * 1;
      let txid = await window.unisat.sendBitcoin(wallet[type], inputValue);
      if (txid) {
        const res = await mintSale(accounts[0], txid, type, whitelistInput, 1);
        console.log("res", res);
        toast.success("Payment success", toastConfig);
      }
    } else if (type == 2) {
      let inputValue =
        utils.parseUnits(String(publicInput), 8).add("70000").toString() * 1;
      let txid = await window.unisat.sendBitcoin(wallet[type], inputValue);
      if (txid) {
        const res = await mintSale(accounts[0], txid, type, publicInput, 1);
        console.log("res", res);
        toast.success("Payment success", toastConfig);
      }
    }
  };

  const publicInputChange = (e: any) => {
    let obj: any = {};
    let value: any = e.target.value;
    value = value.match(/^\d*(\.?\d{0,8})/g)[0] || null;
    obj[e.target.id] = value;
    setPublicInput(value);
  };

  const whilistInputChange = (e: any) => {
    let obj: any = {};
    let value: any = e.target.value;
    value = value.match(/^\d*(\.?\d{0,8})/g)[0] || null;
    obj[e.target.id] = value;
    console.log(value);
    setWhitelistInput(value);
  };

  return (
    <HeaderFooter activeIndex={2}>
      <ToastContainer />
      <div className={styles.wrapper}>
        <div className={styles.topimg}></div>
        <div className={styles.container}>
          <div className={styles.card + " " + styles.project}>
            <div className={styles.banner3}></div>
            <div className={styles.info}>
              <div className={styles.title}>ODPG</div>
              {/* <div className={styles.avatar}>
                <Image src={avatar} alt="avatar" width={35} height={35} />
                <div className={styles.name}>Cloris Chen</div>
              </div> */}
              <p className={styles.intro}>
                OrdPlay is pioneering the future of the GameFi space by
                leveraging the power of BRC-20 tokens and the novelty of
                Ordinals. As the first Play2Earn platform within the Bitcoin
                ecosystem, we're bringing unprecedented innovation and financial
                opportunities to the gaming community.
              </p>
              <div className={styles.contact}>
                <Link href="https://ordplay.games/" passHref>
                  <a className={styles.item}>
                    <Image
                      src={address}
                      alt="address"
                      width={20}
                      height={20}
                    ></Image>
                  </a>
                </Link>
                <Link href="https://twitter.com/OrdPlayBTC" passHref>
                  <a className={styles.item}>
                    <Image
                      src={twitter}
                      alt="twitter"
                      width={20}
                      height={20}
                    ></Image>
                  </a>
                </Link>
                <Link href="https://discord.com/invite/tuxbNWqhmA" passHref>
                  <a className={styles.item}>
                    <Image
                      src={discord}
                      alt="discord"
                      width={24.24}
                      height={20}
                    ></Image>
                  </a>
                </Link>

                <Link href="https://medium.com/ordplay" passHref>
                  <a className={styles.item}>
                    <Image
                      src={meta}
                      alt="meta"
                      width={25.8}
                      height={20}
                    ></Image>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.swap}>
            <div className={styles.card + " " + styles.item}>
              <div className={styles.title}>
                <div>
                  <div className={styles.ori}>ODPG</div>
                  <div>Whitelist Public Sale</div>
                </div>
                <div className={styles.deadline}>
                  <Timer
                    formatValue={(value) =>
                      `${value < 10 ? `0${value}` : value} `
                    }
                    initialTime={
                      new Date(1685624400000 + 12 * 60 * 60 * 1000).getTime() -
                      new Date().getTime()
                    }
                    lastUnit="h"
                    direction="backward"
                  >
                    <ul>
                      <li>
                        <h1>
                          <Timer.Days />
                        </h1>
                        <p>DAY</p>
                      </li>
                      <li>
                        <h1>
                          <Timer.Hours />
                        </h1>
                        <p>HRS</p>
                      </li>
                      <li>
                        <h1>
                          <Timer.Minutes />
                        </h1>
                        <p>MIN</p>
                      </li>
                      <li>
                        <h1>
                          <Timer.Seconds />
                        </h1>
                        <p>SEC</p>
                      </li>
                    </ul>
                  </Timer>
                </div>
              </div>
              <div className={styles.list}>
                <div className={styles.label}>Token Price</div>
                <div className={styles.val + " " + styles.ori}>
                  {tokenPrice} BTC
                </div>
              </div>
              <div className={styles.list}>
                <div className={styles.label}>Fundraising percentage</div>
                <div className={styles.val + " " + styles.ori}>
                  {((whitelistActualAmount / whiteAmount) * 100).toFixed(2)} %
                </div>
              </div>
              <div className={styles.amount}>
                <div className={styles.list}>
                  <div className={styles.label}>Total fundraising amount</div>
                  <div className={styles.val + " " + styles.ori}>
                    {whiteAmount} BTC
                  </div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Actual fundraising amount</div>
                  <div className={styles.val + " " + styles.ori}>
                    {whitelistActualAmount} BTC
                  </div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Number of fundraisers</div>
                  <div className={styles.val + " " + styles.ori}>
                    {whitelistFundraisers}
                  </div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>
                    Number of my fundraising amount
                  </div>
                  <div className={styles.val + " " + styles.ori}>
                    {myWhitelistBtc} $BTC
                  </div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Number of tokens obtained</div>
                  <div className={styles.val + " " + styles.ori}>
                    {whitelistObtained} $ODPG
                  </div>
                </div>
              </div>
              {/* <Input
                value={whitelistInput}
                handleClick={(val) => setMax(val, 1)}
                btnText="MAX"
              ></Input> */}
              <div className={styles.list + " " + styles.small}>
                <div className={styles.label}>IDO Whitelist Round Quota</div>
                <div className={styles.val + " " + styles.ori}>
                  0.01 $BTC - 0.077 $BTC
                </div>
              </div>
              <span className={styles.wrap}>
                <input
                  type="text"
                  min="0.01"
                  max="0.577"
                  value={whitelistInput}
                  onChange={(e) => whilistInputChange(e)}
                />
                <button onClick={() => setMax(whitelistInput, 1)}>Max</button>
              </span>
              <div className={styles.list + " " + styles.small}>
                <div className={styles.label}>Balance</div>
                <div className={styles.val + " " + styles.ori}>
                  {balance} $BTC
                </div>
              </div>
              <Button
                backgroundColor="#383838"
                handleClick={() => mint(1)}
                renderContent={() => (
                  <>
                    <span className={styles.btnText + " " + styles.ori}>
                      {isWhitelist ? "Buy" : "Not in whitelis"}
                    </span>
                    <Image
                      src={yellowArrow}
                      alt="mint"
                      width={12}
                      height={12}
                    />
                  </>
                )}
              ></Button>
            </div>
            <div className={styles.card + " " + styles.item}>
              <div className={styles.title}>
                <div>
                  <div className={styles.ori}>ODPG</div>
                  <div>Public Sale</div>
                </div>
                <div className={styles.deadline}>
                  <Timer
                    formatValue={(value) =>
                      `${value < 10 ? `0${value}` : value} `
                    }
                    initialTime={
                      new Date(1685678400000 + 12 * 60 * 60 * 1000).getTime() -
                      new Date().getTime()
                    }
                    lastUnit="h"
                    direction="backward"
                  >
                    <ul>
                      <li>
                        <h1>
                          <Timer.Days />
                        </h1>
                        <p>DAY</p>
                      </li>
                      <li>
                        <h1>
                          <Timer.Hours />
                        </h1>
                        <p>HRS</p>
                      </li>
                      <li>
                        <h1>
                          <Timer.Minutes />
                        </h1>
                        <p>MIN</p>
                      </li>
                      <li>
                        <h1>
                          <Timer.Seconds />
                        </h1>
                        <p>SEC</p>
                      </li>
                    </ul>
                  </Timer>
                </div>
              </div>
              <div className={styles.list}>
                <div className={styles.label}>Token Price</div>
                <div className={styles.val + " " + styles.ori}>
                  {tokenPrice} BTC
                </div>
              </div>
              <div className={styles.list}>
                <div className={styles.label}>Fundraising percentage</div>
                <div className={styles.val + " " + styles.ori}>
                  {((actualAmount / publicAmount) * 100).toFixed(2)} %
                </div>
              </div>
              <div className={styles.amount}>
                <div className={styles.list}>
                  <div className={styles.label}>Total fundraising amount</div>
                  <div className={styles.val + " " + styles.ori}>
                    {publicAmount} BTC
                  </div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Actual fundraising amount</div>
                  <div className={styles.val + " " + styles.ori}>
                    {actualAmount} BTC
                  </div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Number of fundraisers</div>
                  <div className={styles.val + " " + styles.ori}>
                    {fundraisers}
                  </div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>
                    Number of my fundraising amount
                  </div>
                  <div className={styles.val + " " + styles.ori}>
                    {myPublicBtc} $BTC
                  </div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Number of tokens obtained</div>
                  <div className={styles.val + " " + styles.ori}>
                    {obtained} $ODPG
                  </div>
                </div>
              </div>
              {/* <Input
                value={publicInput}
                handleClick={(val) => setMax(val, 2)}
                btnText="MAX"
              ></Input> */}
              <div className={styles.list + " " + styles.small}>
                <div className={styles.label}>IDO Public Round Quota</div>
                <div className={styles.val + " " + styles.ori}>
                  0.01 $BTC - 0.577 $BTC
                </div>
              </div>
              <span className={styles.wrap}>
                <input
                  type="text"
                  min="0.01"
                  max="0.577"
                  value={publicInput}
                  onChange={(e) => publicInputChange(e)}
                />
                <button onClick={() => setMax(publicInput, 2)}>Max</button>
              </span>
              <div className={styles.list + " " + styles.small}>
                <div className={styles.label}>Balance</div>
                <div className={styles.val + " " + styles.ori}>
                  {balance} $BTC
                </div>
              </div>

              <Button
                backgroundColor="#383838"
                handleClick={() => mint(2)}
                renderContent={() => (
                  <>
                    <span className={styles.btnText}>Buy</span>
                    <Image src={yellowArrow} alt="buy" width={12} height={12} />
                  </>
                )}
              ></Button>
            </div>
          </div>
          <div className={styles.card + " " + styles.team}>
            <div className={styles.title}>About Team</div>
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {team.map((member: Member) => (
                <SwiperSlide className={styles.member} key={member.id}>
                  <div className={styles.avatar}>
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className={styles.name}>{member.name}</div>
                  <div className={styles.position + " " + styles.ori}>
                    {member.position}
                  </div>
                  <p className={styles.intro}>{member.intro}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={styles.data}>
            <div className={styles.card + " " + styles.protocol}>
              <div className={styles.item}>
                <div className={styles.title}>
                  Introduction of project advantages
                </div>
                <p>
                  OrdPlay redefines Play2Earn (P2E) in the BRC20 ecosystem.
                  Through our diverse games, players earn $ODPG, our native
                  token, unlocking new income opportunities. We don’t stop at
                  gaming; we're developing an Initial Game Offering (IGO)
                  platform for developers to launch and promote their games,
                  ensuring a rich, diverse game selection.
                  <br />
                  Simultaneously, our upcoming NFT Marketplace allows users to
                  create, buy, and sell NFTs, offering an additional income
                  stream. The $ODPG token facilitates in-game transactions,
                  governance, and profit sharing, fueling a vibrant gaming
                  community.
                  <br />
                  With multiple revenue streams, including gaming rewards, NFT
                  trading, IGOs, platform fees, and ad revenue, OrdPlay promises
                  a financially sustainable and ever-evolving platform. The
                  future of GameFi starts with OrdPlay.
                </p>
              </div>
            </div>
            <div className={styles.other}>
              {/* <div className={styles.card + " " + styles.status}>
                <div className={styles.list}>
                  <div className={styles.label}>Status</div>
                  <div className={styles.val + " " + styles.blue}>{status}</div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Current Rate</div>
                  <div className={styles.val}>1ETH = {currentRate} Xmm</div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>My Contribution</div>
                  <div className={styles.val}>{myContribution} Xmm</div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Total Contribution</div>
                  <div className={styles.val}>{totalContribution} Xmm</div>
                </div>
                <div className={styles.inner}>
                  <div className={styles.list}>
                    <div className={styles.label}>Audit</div>
                    <div className={styles.val + " " + styles.red}>{audit}</div>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.label}>KYC</div>
                    <div className={styles.val + " " + styles.red}>{KYC}</div>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.label}>
                      Token supply owned by Team
                    </div>
                    <div className={styles.val + " " + styles.ori}>
                      {supply} %
                    </div>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.label}>Lock duration</div>
                    <div className={styles.val + " " + styles.ori}>
                      {lockDuration} Days
                    </div>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.label}>Lock percentage</div>
                    <div className={styles.val + " " + styles.ori}>
                      {lockPercent} %
                    </div>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.label}>Unsafe functions</div>
                    <div className={styles.val}>...</div>
                  </div>
                  <div className={styles.tips}>
                    Unsafe functions Powered by OKCA
                  </div>
                </div>
              </div> */}
              <div className={styles.card + " " + styles.metric}>
                <div className={styles.title}>Tokenomics</div>
                <div className={styles.chart}>
                  <Echart options={options} />
                </div>
              </div>
              <div
                className={
                  styles.card + " " + styles.grayback + " " + styles.prompt
                }
              >
                <div className={styles.title}>IDO Special Announcement</div>
                <p>
                  To protect the rights of our users, BisoSwap has prepared a
                  special parachute mechanism
                </p>
                <p>
                  This will be maximum ensure user token in reasonable price
                </p>
                <p>
                  BisoSwap will release 70% of the funds raised to the project
                  owner at the end of the fundraising
                </p>
                <p>
                  If the token falls below the issue price within three days,
                  BisoSwap will activate the parachute mechanism to protect the
                  community. We will provide 23% of the funds raised for market
                  capitalisation and marketing
                </p>
                <p>
                  If the token does not fall below the issue price within three
                  days, we will release 23% of the funds raised to the project
                  team.
                </p>
                <p>
                  7% of the funds will be used as a platform service fee for
                  marketing purposes 🪙
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderFooter>
  );
};
// @ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default withRouter(LaunchpadDetails);
