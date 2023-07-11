import db from "../database/db.js";
import fs from "fs";
import Sequelize from "sequelize";
import e from "express";

const Op = db.Op;
const PROJECT = db.PROJECT;
const PROJECT_TEAM = db.PROJECT_TEAM;
const PROJECT_TOKEN = db.PROJECT_TOKEN;
const PROJECT_MEDIA = db.PROJECT_MEDIA;
const PROJECT_IDO = db.PROJECT_IDO;
const PROJECT_IDO_DETAIL = db.PROJECT_IDO_DETAIL;

PROJECT.hasMany(PROJECT_TEAM, {
  foreignKey: "projectID",
});

PROJECT_TEAM.belongsTo(PROJECT, {
  foreignKey: "projectID",
});

PROJECT.hasMany(PROJECT_TOKEN, {
  foreignKey: "projectID",
});

PROJECT_TOKEN.belongsTo(PROJECT, {
  foreignKey: "projectID",
});

PROJECT.hasMany(PROJECT_MEDIA, {
  foreignKey: "projectID",
});

PROJECT_MEDIA.belongsTo(PROJECT, {
  foreignKey: "projectID",
});

PROJECT.hasMany(PROJECT_IDO, {
  foreignKey: "projectID",
});

PROJECT_IDO.belongsTo(PROJECT, {
  foreignKey: "projectID",
});

const WHITELIST = [
  "bc1pkgw3ckvhvf4m2pq2fw9w4x8s9l4lvp2y5xz6guau90e4ppqqflgs3mdujx",
  "bc1pnyfc0snks4n3trlsy2yv677p2jgysgeparz6v6zstewchfv5nttscr6mea",
"bc1peaddd7j6cqepuqhyxdg4dyf9je6uc8afk4t39y5z8y9yypcg7yrqle24ys",
"bc1pflx8vf8vn9asvg0w6ylk6v509ezlve55262e4jatxvsmthygsv4s9057c4",
"bc1p0gvwlnlw4zrhw6n3z8u4kvqyjcz3h66mzx482vs597nxm2zvrnuq8qswu8",
"bc1p85pspm4lwm5nll904lzxh25q5nwx6wj95xe87wzeltxhg7csyyfs9ms3jp",
"bc1p6ut3ggayn6t3cux03wujvrnfy3w8fakmctljgtwtalshcel63s3qu2gz62",
"bc1p9vd9rumxex07jaeczluup8a87908zc2cqnfunw74uk6cm87u2cgse4gtvx",
"bc1p58u6fv0yh979amm9mp370zl0gcf7tv0aa69r4p2sgdu8h58klsmq87rssg",
"bc1pj0qemwve7mn7mcy66xpepksktkw0dyjvzxk7waffyjnk5vwyga0snsvr67",
"bc1p80cv05ycuxnag6fhfa5kqgvfx66grwgq6pz442g9fu8wxu7z75ts998l5e",
"bc1pfwmr59x2mp5wr0a3ppyfgee2wf79rvyhtpyeucrkshv5jdsuq4wq5sxcxj",
"bc1ppxtpmm58lhct0cufk7h9c3a26ey2zdufn72ea4ayfj23x6uzgwkqz8vaws",
"bc1pcq7776qnkw5d74d75j0mu3y52xtwcjfjusfke75778n92rfzhpjscrhxkp",
"bc1ptfda4tvgdvskqrnfpv93p2wzf5rjlt8csnycul2vaqzpkcly0v4sv3gzfy",
"bc1px5jh5h52e24aspz7hx8rmjlxdvhtxej9ckdhk3pn0tas7rles76qvwe7tz",
"bc1phuejkrksgxdht2fs3s48q2e88wzvc3c6vawzy226yn2t6w7cskhs69d8aj",
"bc1pm0cvjxph0zh3mynkkrdtnk2dju4c720ec35nfc6kd5d4sl5jrwzqt6x9ma",
"bc1phy3l2hvftst203e6lcc2dke0823z5e87tntdt2dpyktcervw0q6sv6per0",
"bc1pfqylrx3qm00d22emxnvq8j3l6rap9yv6xszpuwqxcwx82y4cyruspe3j5j",
"bc1pfqylrx3qm00d22emxnvq8j3l6rap9yv6xszpuwqxcwx82y4cyruspe3j5j",
"bc1pnnhcxuyk6fzzczqda7qa00yxlym2hgm0cyd0edlcakm5ccnwmmzqgqlwjj",
"bc1pe7tq4jkdfxnqs5w75mev4e7s2ddlf3y0cghxuydq5vfkwpjp402sjfms6j",
"bc1p0l30q9up7ewn0v25sxlydn925a3pwjgwz5amdwfdl56h7j5zucfszjprf4",
"bc1pp3p72nhy82jz9u4cga2ee3l0dxaj2ug72udadgfqf0dggu5uhq5ssqpgn5",
"bc1p0l30q9up7ewn0v25sxlydn925a3pwjgwz5amdwfdl56h7j5zucfszjprf4",
"bc1p9zzhclcn63f75mn6lckkaudmz55ahj0wagxk6a2muv7cw0eemtqs3ew78c",
"bc1pmdsnwlrrk9msrmjygvakss2pefpq5hm753f58u4gcmm7hhasgn9sjlgvh2",
"bc1pzq6cx8yw0d76prp44ayvwnngc9mjhh2tvgcjftrnjxmxcdeg34wqvyq8yj",
"bc1qawsmdflquns0z5745fn93q5gwvhcgcy0vgsun8",
"bc1pzq6cx8yw0d76prp44ayvwnngc9mjhh2tvgcjftrnjxmxcdeg34wqvyq8yj",
"bc1psduywwp7wuzazlpkeztsmrrjaew348kcgwsyeq23ws0fkyuyurjqavy48j",
"bc1pmue7czhal4j8mjw2dk0yv28d75xppvc3wggf9m35dnvmau84hmzs276tnh",
"bc1qleswvdg8lxjjy63gnntuzt3k42j8wv0q2a4rnx",
"bc1p0yhd3zllc4fg0hre73ndvsra0fwgxsev3svhxnza7x40wzdeqttqs6rv6e",
"bc1p7ccuk7z52xs0frgz4tattsxvxxn05fhx9mnhd8j0acnd9aenhmxs8s6n0r",
"bc1pzq6cx8yw0d76prp44ayvwnngc9mjhh2tvgcjftrnjxmxcdeg34wqvyq8yj",
"bc1qyrdz873et5rxp9lxxtt29j985w4ynqz8s7w6yd",
"bc1peaddd7j6cqepuqhyxdg4dyf9je6uc8afk4t39y5z8y9yypcg7yrqle24ys",
"bc1pc52wgrpxjjl2p2cvlarkl7cxd2gx5yd2klf3er68unm7h0hzx3nsnaauj5",
"bc1psduywwp7wuzazlpkeztsmrrjaew348kcgwsyeq23ws0fkyuyurjqavy48j",
"bc1pj3z94vapqqx476hh2at68q0ngl2yatvvhrs39g5wrg2ku668rfpq0advru",
"bc1pcfsjwswwvhly70suw84w5rzaufjf7mmydvrrx07nwt9xsvcsxv5qyrpnrd",
"bc1pfykjh7gfvjze7zvwyxh604xug7texvjcg6kea7cldusfaspqk09qtr392v",
"bc1qy5x477rmc35stwms9gfmm9t6hga8n9ga3mfftj",
"bc1q9ag7u24ps9xh7p2jlk2nmy733lyvjhrec4l6gg",
"bc1q062cafq5y8twze04dpgeek3fg03rkp6rm45z28",
"bc1pywac8uhsgf6yqyud07tsafwen7uz7f90ps9exaxf7rx65m393z2qpj8ln8",
"bc1p5gwqdp5ejgj6gavjdtxzg0z2m939wffw2xjxdr6pjgxl49q02kzstylwtt",
"bc1p8dgqadak3gtlmtp77jk9l34z0zk52v5k895nc68jmxpx5kru4s5s4uxr5r",
"bc1pt486zu49ra2ps0jwa75ygvqqyhxsm53x0se74h62zdlxjtqd2ehqkljdkc",
"bc1qn4vtv2fg48jnng3v0tt3r8guqer2wvchlzys2c",
"bc1p0nql6hxzghn7fe36p82d9qj49zfpx7jcr6z6jpsp6auhxtq05lvqvhtedl",
"bc1p4yklhqacx9kyr7s6chldpquar8qpxwzh9ap7h42kjqnu04v5gnxqndtdas",
"bc1qkyhvqad3v28s9mt56e60kzg3m4f44l4a8ph0n5",
"bc1p89y5jq2k770udda8z65dhuj8auzzd3zw4ge60a205j5ey5mgpnhq8s95er",
"bc1p36zjyuyk6f5ku7wzw2j466l9e4q77xlwqdlgmc5slyq8a25sx3wqqgp6ym",
"bc1qkyhvqad3v28s9mt56e60kzg3m4f44l4a8ph0n5",
"bc1q93dkfr024yu8485ldqyrmm2r9dm9u34jcls0wm",
"bc1pznnrwklm7z4m82pt2w9hm7h7yay3sncmguf69rse4wftakn3jn2q5e32ee",
"bc1p8x8zm04tcvlxa48qyux5au9rd3nf784pzmh08jdvq468w5kvz0nq3zkgnh",
"bc1pahx5fyu5jttgfpufjfemham3n7g9st5hd4agtxr0tcz6s252233qdm2qja",
"bc1qyjh4wc23w9t70s3gvrx6feat7f3u3q6v0ndh6c",
"bc1pahx5fyu5jttgfpufjfemham3n7g9st5hd4agtxr0tcz6s252233qdm2qja",
"bc1qyjh4wc23w9t70s3gvrx6feat7f3u3q6v0ndh6c",
"bc1pahx5fyu5jttgfpufjfemham3n7g9st5hd4agtxr0tcz6s252233qdm2qja",
"bc1pv3ar3c4equrd95swd3xljs7rzjs7y3tyyeqxgtah5asx5s5a8plqyzpqrv",
"bc1qyjh4wc23w9t70s3gvrx6feat7f3u3q6v0ndh6c",
"bc1prx0psdqmyxhwe7kq5vlgq5k4j4lrkpyhfjqfq79vq9xkrqcddywsyfp70q",
"bc1qyc0852a6nv2secnfg7njh2vqn8ftq80qyhd6kp",
"bc1pcupsetuuxu78l9d3ejkr4h5sz6sjlvu7g8pengafy97qlkka0euse6judy",
"bc1qa5cyrf9j465jn69uztmnn3pt6lm3acqfw3jv9d",
"bc1pyr0e2z6c09ga9r6vxlqx8ycnrmmjm89rh2y23m6ka447l7whsalqsp09lt",
"bc1pz4qrmdl3tf6lqlphlekxxeum4ejf346pkx8559rytfv463tg29lsu2z8c7",
"bc1p57umhtx7aq7qk9kd7s9q82xervh0p4xrsyv2p0434n45hegvsghqh5xwd0",
"bc1pm44nheqsl8yyga42nrxudgafjwyctfq9x3k7wlpny2u4duyydu3st9cu6v",
"bc1pvxdujr9qskup72c0lk9uup06w0dx0qcp9wfq25duhx9247hlg6zqhwegfp",
"bc1qjxf2cjcfzcfzry4tzp90xkuzqwehzugg8pguy7",
"bc1pckkjt0x25rtga8vudzrfg7d6p0awuw0l6v4jtrkdglukt2rzv0ms27qxjg",
"bc1qa8ea88lrp57r6g74l7v3scjhjm66gd48svk2f0",
"bc1qu8d4ckvlqcrtvwphs9g8xahjwdz2gslrl6heuj",
"bc1pr678a9l2dl5qqwdadskjhc92fryk2msucun0y2nj6z82ajefstdsp5t3q9",
"bc1pyqd0k64pdw9wra5t065p9qk3cu2lmwxffwg4cewcks8ry4dhdf6qn76uu3",
"bc1q8t2tdlwucephnu0n6v52j7jjg7r2q76t2sxqqp",
"bc1phgzsphk0w2kfz2v6q8lwf6zaqmw7lc3fj9ewyju0sagufheuewyq0gsrdw",
"bc1py6yacmar7w9tevfsdwk0g5ppautu6zfuknja2napal0ggmjvgqdqmftz3k",
"bc1pyk62hah4409z9qphp0q0mkkwgpdz2rgzpyyst3aapclpek55gt6qt2fzhh",
"bc1pg0j2s3dpnjfsz67kff5sladjehjslyu6vugngtl3mydjkj4rxwjsyg250d",
"bc1pk5x509yqh625x6u66g63ac2qu07pmfe6jqv2uq7lxytm6wsq88ksp5l22q",
"bc1pr678a9l2dl5qqwdadskjhc92fryk2msucun0y2nj6z82ajefstdsp5t3q9",
"bc1p4t6ujzswgrslt863n7ndv0rzwpcwedwzjk8gcnqvkpgzstuzqzwqmancww",
"bc1q4jmkk7dqzcp3mypjjedj5axnsuuefcl0dn0tv8",
"bc1p8c8v4w7ws5d3gmutud3sgsqwrnvua2zrsvyw9dlw5d7muwsnzwcqrycq5q",
"bc1pusrnmhzkffgd580txp5q05wp7edrc9s0rp7lw5tzh7ayqjs70naswx0s4z",
"bc1pj689559xsc54n99ps9mm5ve3zzkfzydz9rq3quehfrj7xh9868lq7u0zrk",
"bc1qzaesz56acmnme5nn7s3adsxnxawgfrm8cshf76",
];

// 获取Launchpad总数据
export async function getProjectTotalInfo(req, res) {
  const totalProjectCount = await PROJECT.count({
    where: {
      state: 1,
    },
  });

  console.log(totalProjectCount);

  res.send({
    msg: "success",
    code: 1,
    totalProjectCount: totalProjectCount,
    totalUser: 0,
    totalLiquidityRaised: 0,
    totalLockLiquidity: 0,
  });
}

export async function getProjectInfo(req, res) {
  const { projectID } = req.params;
  if (!projectID) {
    res.send({
      msg: "Incomplete parameter",
      code: 0,
    });
    return;
  }
  const projectInfo = await PROJECT.findOne({
    where: {
      id: projectID,
      state: 1,
    },
    include: [
      {
        model: PROJECT_TEAM,
        required: true,
      },
      {
        model: PROJECT_TOKEN,
        required: true,
      },
      {
        model: PROJECT_MEDIA,
        required: true,
      },
      {
        model: PROJECT_IDO,
        required: true,
      },
    ],
  });

  if (projectInfo) {
    res.send({
      msg: "Find!",
      code: 1,
      projectInfo: projectInfo,
    });
  } else {
    res.send({
      msg: "Not Find",
      code: 0,
    });
  }
}

//IDO
export async function mintSale(req, res) {
  let { address, tx, amount, type, projectID } = req.body;

  if (type == 1 && WHITELIST.indexOf(address) == -1) {
    res.send({
      msg: "Not on the whitelist",
      code: 0,
    });
    return;
  }

  if (!address || !tx || !amount || !type || !projectID) {
    res.send({
      msg: "Incomplete parameter",
      code: 0,
    });
    return;
  }

  const totalBuy = await PROJECT_IDO_DETAIL.sum("amount", {
    where: {
      projectID: projectID,
      type: type,
      address: address,
      state: 1,
    },
  });
  console.log("totalBuy", totalBuy);

  // if (type == 1 && (totalBuy > 0.077 || totalBuy * 1 + amount * 1 > 0.077)) {
  //   res.send({
  //     msg: "Have exceeded the limit",
  //     code: 0,
  //   });
  //   return;
  // }

  // if (type == 2 && (totalBuy > 0.577 || totalBuy * 1 + amount * 1 > 0.577)) {
  //   res.send({
  //     msg: "Have exceeded the limit",
  //     code: 0,
  //   });
  //   return;
  // }

  if (type == 1 && (totalBuy * 1 > 500000 || totalBuy * 1 + amount * 1 > 500000)) {
    res.send({
      msg: "Have exceeded the limit",
      code: 0,
    });
    return;
  }

  if (type == 2 && (totalBuy * 1 > 500000 || totalBuy * 1 + amount * 1 > 500000)) {
    res.send({
      msg: "Have exceeded the limit",
      code: 0,
    });
    return;
  }

  const ga = !!req.cookies._ga ? req.cookies._ga : "";

  const result = await PROJECT_IDO_DETAIL.create({
    projectID: projectID,
    address: address,
    type: type,
    tx: tx,
    amount: amount,
    ga: ga,
    date: new Date().getTime(),
    state: 1,
  });

  if (result) {
    res.send({
      msg: "Success",
      code: 1,
    });
  } else {
    res.send({
      msg: "Save failure",
      code: 0,
    });
  }
}

export async function getAmountByAddress(req, res) {
  const { address, projectID, type } = req.params;
  console.log(req.query);
  if (!address || !projectID || !type) {
    res.send({
      msg: "empty",
      code: 0,
    });
    return;
  }

  const totalBuy = await PROJECT_IDO_DETAIL.sum("amount", {
    where: {
      address: address,
      projectID: projectID,
      type: type,
      state: 1,
    },
  });

  res.send({
    msg: "success",
    code: 1,
    data: {
      address: address,
      totalBuy: totalBuy,
    },
  });
}

export async function getTotalSale(req, res) {
  const { projectID, type } = req.params;

  if (!projectID || !type) {
    res.send({
      msg: "empty",
      code: 0,
    });
    return;
  }

  const totalSale = await PROJECT_IDO_DETAIL.sum("amount", {
    where: {
      projectID: projectID,
      type: type,
      state: 1,
    },
  });

  const totalUsers = await PROJECT_IDO_DETAIL.count({
    distinct: true,
    col: "address",
    where: {
      projectID: projectID,
      type: type,
      state: 1,
    },
  });

  console.log(totalUsers);

  res.send({
    msg: "success",
    code: 1,
    data: {
      totalSale: totalSale,
      totalUsers: totalUsers,
    },
  });
}

export async function projectCheckWhitelist(req, res) {
  const { address } = req.params;
  console.log(address, WHITELIST.indexOf(address));
  res.send({
    msg: "success",
    code: 1,
    data: {
      isWhitelist: WHITELIST.indexOf(address) != -1 ? true : false,
    },
  });
}
