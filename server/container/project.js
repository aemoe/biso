import db from '../database/db.js';
import fs from 'fs';
import Sequelize from 'sequelize';
import e from 'express';

const Op = db.Op;
const PROJECT = db.PROJECT;
const PROJECT_TEAM = db.PROJECT_TEAM;
const PROJECT_TOKEN = db.PROJECT_TOKEN;
const PROJECT_MEDIA = db.PROJECT_MEDIA;
const PROJECT_IDO = db.PROJECT_IDO;
const PROJECT_IDO_DETAIL = db.PROJECT_IDO_DETAIL;

PROJECT.hasMany(PROJECT_TEAM, {
  foreignKey: 'projectID'
});

PROJECT_TEAM.belongsTo(PROJECT, {
  foreignKey: 'projectID'
});

PROJECT.hasMany(PROJECT_TOKEN, {
  foreignKey: 'projectID'
});

PROJECT_TOKEN.belongsTo(PROJECT, {
  foreignKey: 'projectID'
});

PROJECT.hasMany(PROJECT_MEDIA, {
  foreignKey: 'projectID'
});

PROJECT_MEDIA.belongsTo(PROJECT, {
  foreignKey: 'projectID'
});

PROJECT.hasMany(PROJECT_IDO, {
  foreignKey: 'projectID'
});

PROJECT_IDO.belongsTo(PROJECT, {
  foreignKey: 'projectID'
});

const WHITELIST = [
  'bc1pyf6e4ysv00e84hwv5am07m2hfcsxs5l9q8zt6c6aj4aal03mh5xqe376p0',
  'bc1phdhlj7w9kukqclmphrts2mwt5lgf7ljdqxal6yqyhjz3jcua2zespmg8ss',
  'bc1p72a3n0uv5alv3fa8a6mhz267wvp8fjef0ltvy24c047sdlduzg9s633vzf',
  'bc1pcmkdjzlyhdpky23h82kccv6hta8fytl9l7djppv40untj5rctgpsqhlr6m',
  'bc1p2gnpkkruaz4kkr63m58gaqc9xqfzsnhnlr5fcxgampwt33c59tssfca297',
  '32c8KqnFJsPnzfpgPKFzDsKaVuuqfnjcWP',
  'bc1q9nud20xvnxf4uxmtk5cpdxyjdlqvxggslp55tv',
  'bc1qg36lu9vqhrtk2zmg8m6yshtqcltfgevtvcntpf',
  'bc1pqjsltkxr3ktfes42rs4v2yvztrwvwqqpaltpga5ne8cg28fsvy0qjdmnuz',
  'bc1p2puskzmne9qhkah8unwc0ns6jdemsrqgmn5m0zhfqn7373a5cvgs7e03ft',
  'bc1p3n9nrshusc49940amhlwfhzte97kmv488c9j9khnhrkvmkksh3ase09c0c',
  'bc1pz2fp8y983mw9ljkvh90rkg8n9jdvycy7vgre4y5lgq6ushx2374qt2hlv4',
  'bc1pnp0e4pp3dwk46j9sqhexy5ezsw622zhht7dtesgctp5u90600rtq0ftdvd',
  'bc1phtmdus64vkpeq0cwm6uyn79q8y4ap588j99r5fx6p46m43d438zq8t9czc',
  'bc1pg4lwyw9uvx0zc70ydg9xvvdtz90k5ketmerzc8kfjczt7c357leq0cq6my',
  'bc1pxpz6tpa5gyxj7djlgyss54q7uag2qlfcf94tj5f9z6x8n7unf9tqx8m9ek',
  'bc1ps84dkgp50j3j83j6dejq6d5h2lf3yhunyunt9n4e9d9g4cr30h6qvfulsd',
  'bc1p78mqul97mhtkch8lnc9mqu68nl7ph659ye37sku8q8z2y88j2w2q20f3wd',
  'bc1pey55x43fvqg5q6t2ez3mazy27cc3u2vyzllclkr08p6qj0l2nz9qlr9udv',
  'bc1qsc8d9h9fa0np9t702nd04fv6ua38jarec952fq',
  'bc1qdjr30mvpxk7anktg2qhacmnyfz8p7dplrctvg9',
  'bc1qjak29qprazrve4ju7ltpjg92vyvm5jg33eaptg',
  'bc1paynmdy58wmu8z02x3n4ryzj20nchstgkw83u3cz6dp63u3apkdss7x2elu',
  'bc1pyrqhj87qmpnd9dcvjpv0chrw6swwsp7dn7zamn9fr5x669uy85us99k2vh',
  'bc1pqwadjqpkzlk39l5s4mpfyhmggglj954mfadq0n4z4f6hzw78ssgqdp9pns',
  'bc1pnfqa4j0ls798ndt9ahmtk93efex0yvy3d8eyrtaz9rpy8xu6gllsqqshtm',
  'bc1pk5lsuuzl3km6y4jckh9q3fnyqpmt9vkce4am49vqjrqcsca6wfps2qtrhq',
  'bc1p5zqsrmwem89yj2zdqdmapgpxfra0mkpgtvwthxpmy6zw4x2xfhwsst5usk',
  'bc1pjuxsewcgr6n4m0c5vrv862zk7df5cx7l9kc4ludl3y7fwhql9unq24gwnw',
  'bc1pxm2pmmp0smwnz2e6qrz8dq8457tc72mn267trpwratsnmhqc6rssg982vq',
  'bc1p0qzt4qyh2430u07ylne92wrz3qev69k8nckx854cpvk4qy00pddslk3zqn',
  'bc1px0y9ltr37wqrh4z8jrakt0jl3q5hrq7dgq6kdugymfdrvq4v8jfsrm8fsf',
  'bc1pqztla4qtlnh35l8l2z5t235vk98a0d7ex3cs6g80pgw0tzpk3yzqh9l4rl',
  'bc1ptgdlzfu3f6dkmuqeawd8s7veuluxg0d84zu9grzsesqy2t9rz56sd44hcn',
  'bc1pwauu0hvwq8e0eh4lvua6tl8mcjxq3jrw3yvtzsnp54ce3rqxxm2qgjd5q6',
  'bc1p32phtl6xvm863w38ae9jvexgz4ymj0p3a7n97kr6u5qefeuph2dsw7e32g',
  'bc1pnan5mnflg76tzyqd4fwdctx2mqkyehqj7vdhhrtd85m6lk7hkwssadr55p',
  'bc1pn48sseyq4pgamzhjjzl499npqtt9g6f6ty97mcwug5rezpup3kcqcysqh2',
  'bc1p5k2arkutunj27f25rzu3g36djx7p66wk9x4p7u3elz90cv23e6gswrr5wv',
  'bc1pqwadjqpkzlk39l5s4mpfyhmggglj954mfadq0n4z4f6hzw78ssgqdp9pns',
  'bc1pgx0ylvumht2rr0gla2jztjxe4vvlr4gx2ljy3rzz3qvxkp0krpdqa92r0z',
  'bc1pxrnm9fv8n3scyc04l6pae8lw09fl72gjqj6v5rmnljazue4t647sswcczs',
  'bc1ptxfpwdu2v6u2mv406fttdqzxec4deyn2f8xhqtz9taqh7gpmwyhqhyfd4x',
  'bc1pn5st5hvnkm2dat5k4zk4hfp5vv5faal8myc9jgsa25n6d6f2cg5qw4k3sh',
  'bc1peya8yhfwr4zrmtak9s9wnkszmcqv24xcty8z3htxp52a704gvx2q4p5nyj',
  'bc1phuuwree36mtln9zkruxh44tm0jrrep4ft2rvrmcngw3jtjjmhtfsdzm5hn'
];

// 获取Launchpad总数据
export async function getProjectTotalInfo(req, res) {
  const totalProjectCount = await PROJECT.count({
    where: {
      state: 1
    }
  });

  console.log(totalProjectCount);

  res.send({
    msg: 'success',
    code: 1,
    totalProjectCount: totalProjectCount,
    totalUser: 0,
    totalLiquidityRaised: 0,
    totalLockLiquidity: 0
  });
}

export async function getProjectInfo(req, res) {
  const { projectID } = req.params;
  if (!projectID) {
    res.send({
      msg: 'Incomplete parameter',
      code: 0
    });
    return;
  }
  const projectInfo = await PROJECT.findOne({
    where: {
      id: projectID,
      state: 1
    },
    include: [
      {
        model: PROJECT_TEAM,
        required: true
      },
      {
        model: PROJECT_TOKEN,
        required: true
      },
      {
        model: PROJECT_MEDIA,
        required: true
      },
      {
        model: PROJECT_IDO,
        required: true
      }
    ]
  });

  if (projectInfo) {
    res.send({
      msg: 'Find!',
      code: 1,
      projectInfo: projectInfo
    });
  } else {
    res.send({
      msg: 'Not Find',
      code: 0
    });
  }
}

//IDO
export async function mintSale(req, res) {
  let { address, tx, amount, type, projectID } = req.body;

  if (type == 1 && WHITELIST.indexOf(address) == -1) {
    res.send({
      msg: 'Not on the whitelist',
      code: 0
    });
    return;
  }

  if (!address || !tx || !amount || !type || !projectID) {
    res.send({
      msg: 'Incomplete parameter',
      code: 0
    });
    return;
  }

  const totalBuy = await PROJECT_IDO_DETAIL.sum('amount', {
    where: {
      projectID: projectID,
      type: type,
      address: address,
      state: 1
    }
  });
  console.log('totalBuy', totalBuy);

  if (type == 1 && (totalBuy > 0.077 || totalBuy * 1 + amount * 1 > 0.077)) {
    res.send({
      msg: 'Have exceeded the limit',
      code: 0
    });
    return;
  }

  if (type == 2 && (totalBuy > 0.577 || totalBuy * 1 + amount * 1 > 0.577)) {
    res.send({
      msg: 'Have exceeded the limit',
      code: 0
    });
    return;
  }

  const ga = !!req.cookies._ga ? req.cookies._ga : '';

  const result = await PROJECT_IDO_DETAIL.create({
    projectID: projectID,
    address: address,
    type: type,
    tx: tx,
    amount: amount,
    ga: ga,
    date: new Date().getTime(),
    state: 1
  });

  if (result) {
    res.send({
      msg: 'Success',
      code: 1
    });
  } else {
    res.send({
      msg: 'Save failure',
      code: 0
    });
  }
}

export async function getAmountByAddress(req, res) {
  const { address, projectID, type } = req.params;
  console.log(req.query);
  if (!address || !projectID || !type) {
    res.send({
      msg: 'empty',
      code: 0
    });
    return;
  }

  const totalBuy = await PROJECT_IDO_DETAIL.sum('amount', {
    where: {
      address: address,
      projectID: projectID,
      type: type,
      state: 1
    }
  });

  res.send({
    msg: 'success',
    code: 1,
    data: {
      address: address,
      totalBuy: totalBuy
    }
  });
}

export async function getTotalSale(req, res) {
  const { projectID, type } = req.params;

  if (!projectID || !type) {
    res.send({
      msg: 'empty',
      code: 0
    });
    return;
  }

  const totalSale = await PROJECT_IDO_DETAIL.sum('amount', {
    where: {
      projectID: projectID,
      type: type,
      state: 1
    }
  });

  const totalUsers = await PROJECT_IDO_DETAIL.count({
    distinct: true,
    col: 'address',
    where: {
      projectID: projectID,
      type: type,
      state: 1
    }
  });

  console.log(totalUsers);

  res.send({
    msg: 'success',
    code: 1,
    data: {
      totalSale: totalSale,
      totalUsers: totalUsers
    }
  });
}

export async function projectCheckWhitelist(req, res) {
  const { address } = req.params;
  console.log(address, WHITELIST.indexOf(address));
  res.send({
    msg: 'success',
    code: 1,
    data: {
      isWhitelist: WHITELIST.indexOf(address) != -1 ? true : false
    }
  });
}
