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
  foreignKey: "projectID"
})

PROJECT_TEAM.belongsTo(PROJECT, {
  foreignKey: "projectID",
})

PROJECT.hasMany(PROJECT_TOKEN, {
  foreignKey: "projectID"
})

PROJECT_TOKEN.belongsTo(PROJECT, {
  foreignKey: "projectID",
})

PROJECT.hasMany(PROJECT_MEDIA, {
  foreignKey: "projectID"
})

PROJECT_MEDIA.belongsTo(PROJECT, {
  foreignKey: "projectID",
})

PROJECT.hasMany(PROJECT_IDO, {
  foreignKey: "projectID"
})

PROJECT_IDO.belongsTo(PROJECT, {
  foreignKey: "projectID",
})

const WHITELIST = ["bc1pahx5fyu5jttgfpufjfemham3n7g9st5hd4agtxr0tcz6s252233qdm2qja",
"bc1p966ycy9ux7ekj9lxwg8g2e2nmu2lwkeq69aup2r7d3ztjnychn8qdzlw7h",
"bc1p04ylkpkqnlju3lej3y9092l6exr57rjaa5dpg6gpv7rmnxrg037qq9dw5f",
"bc1ppnh5q9jmpl358ujxyxjg38u6tg0dh7pc6ewv2s3sp6k8h70vz2pqexa80n",
"bc1p384fvvr2ywu2slzyl8a7h5j25yw3n8rslrv8sdc83svavlpfk5hqe2fz6y",
"bc1pxjvntpfg30r7e2jp6qmm7l36aaqpdt4vevdqpx6t7td85023cnlsypl2pv",
"bc1pgkv4qvn3ug3czm8xqye0082f3ke4f8r5hn6xunl4fkwmzyfgh8jskw0kmc",
"bc1pqy3j8mrhn7v38jluv5vsd5jpgqade73k8muhe6ddmn95scw5wwds9smjnz",
"bc1qyjh4wc23w9t70s3gvrx6feat7f3u3q6v0ndh6c",
"bc1qyc0852a6nv2secnfg7njh2vqn8ftq80qyhd6kp",
"bc1pnf6kp4melvehneuhasqw2l0alncpu9mtmm0e8e2lm2zrdkftfaysqyjaft",
"bc1pc6ltcmdx0ckwqxkkj44t7mcezddwknne4jtktjumxn60xavs653s09t57u",
"bc1pemxy3hk0rrta7lk70x0qak5j3494eag3c4w5qd5sccw3qkh06snqaj9y3l",
"bc1pwk9236muqkftp2dsadzyjcgpjmfz396mkp9nghffhkk5hanj2x2szz3pne",
"bc1p5as6qd7s477uftkhax59h5gesjnt0wxzea4mwda3rv9jxh4psj4qdn8rfh",
"bc1qjv5lpf966uxzxvqqm5z5qxtm65pk728dje5afn",
"bc1pjfrc980306c0zf64z30yenz0jx52wg03rxzk9zhauplt4v2qh0zqx8vllk",
"bc1p6alkckhsk3dv7kcxg7l09gx9u80l9e8s0tgc4pf6et9q920mct6smaj8ph",
"bc1pp6d7skcw7ynmhfq5v43qcu8yuhtezc9up6dy9j3d5n882ggczh5q7lgexa",
"bc1p3kcdxzp7uhc0sxf2yrtsm4s87anrfk4m7vg8tlvgezep50wet7dsv25z9h",
"bc1ptdaddq0llrg3wjlzpg5l83a0hdqvef46r7d2xcqryj68f8eww39sq69a5d",
"bc1pqfajxt5yjf7zjfzywlta6rmv8n4g4sn207kltyha99uq73njenaqym6fcj",
"bc1pr288vauea76xn4nwzmqra86a2pzsv8t4h5m7m606tnzjlrxtxytsy2drkt",
"bc1qs4e4zer7mpc3urj0k4ymmjjjmf3cf9z52gec5u",
"bc1q9nnfsnkyd0fjqsewltrm6953glu5nn54et947w",
"bc1qsk5hk6ky65azwtfxk6rh5y5pug5glz7vj4w4xy",
"bc1qdjnat3m4zg22vl5xvkekkk25rdqtr76f2yqla7",
"bc1q0h95fu3nq9hlfpcye3g5y9rmw563k76zr3997w",
"bc1qhgs4a4tpgdy6wtz025emu7fvyhuku5vt5hzsaq",
"bc1q8z7ft3frludxgw4gtlr8x4nj02cu920zq9spd4",
"bc1qtjrl5tgmtfvjv4gdpntgqxdwjet40yh5zck8p6",
"bc1qgv0kywm7acgkr5u6udwjadn08dgsc7yajtz6py",
"bc1qjkslpgyurpaag6p9zltmjkjdmjvfe57ucvxq4j",
"bc1pvx6e7ws4ajuvhh6v6yd9t42xrevl7enxtujxmejrulj8nwx5xhls2lzjnz",
"bc1paa5zry7c65zx692rrpuwswjhxn3fpawd5u42v7ffyye5rsl2k3lsezf0ug",
"bc1ppznjtea5h6407wqfyqlfzdu8k2eectcynh04y3hprlxzkpgunr0seu450y",
"bc1pfc3x8tgm2ckpezdxyrsd0dkfrtcp44qwvum0z3gcnj9n0juyeydsp56a5w",
"bc1pqc75ny6sdyy2hafh6zfxf79k99kh05a7qlqcyuq7n2pu7xlytvfqsnzpj6",
"bc1pkl9xphzgwdgj7kq43ljdzlwwdedgd0y34cpffjm85y90djexamasdcgyvh",
"bc1pmkk62aua2pghenz4nps5jgllfaer29ulgpmjm4p5wlc4ewjx3p3ql260rj",
"bc1phy6e60cg5rtuudtjsxff4e2clr4fcl33e7l0yjl65a6f3l3w8jaq6q6n5f",
"bc1phpm84j43tpujm9ypq55m540rym9wegtr3ta62f7f2vld863dqlnq80r78m",
"bc1p4u74gswqj2cwe2r2f4ldzsh2vsutx9zau644cc6tuu3hu74tvqqs5vxxul",
"bc1pmhnjnzq23yyddvw8q934pw5g7dfwssn4p4ahuffk4hu5qr72659qkw6xl4",
"bc1p23gpnzr925tcgk8u2j2w9c75zlcrvgkcf2w7mlz92evwcejs3mns58dw8a",
"bc1pt3v4cu5q5cvr9gampzc4ktwqkagaswdeyty9q23c27ayf4lpnfkska3jm7",
"bc1pmhnjnzq23yyddvw8q934pw5g7dfwssn4p4ahuffk4hu5qr72659qkw6xl4",
"bc1pl03tuc8um26xhld6rl0l9pyhjuqk4gudescjylhtxjzkvxmpxe4s6x4672",
"bc1prl5jpnjakz2razwl4msm3eaas498qetc3pxc63z8tw9j5zc2nlqs7md6zy",
"bc1pelassk9pse0rxgtgtgtpx8gn6tvkh4upvw77nd2mw6fdnmwfpdvs0q7edq",
"bc1p23gpnzr925tcgk8u2j2w9c75zlcrvgkcf2w7mlz92evwcejs3mns58dw8a",
"bc1pv785t865l5gy6qwdxvsl69udnc9dq50f4ljtd3yac6zyw06dzs5qt0yn05",
"bc1qya384jqp55rhgejl488qqws89nn72yx7hktm52",
"bc1pmzt8zwmvwg6x9v9kp557gt80n6zfahlyjujf022zw6e35nyrsrwqed8wk4",
"bc1ppkad8p7s6ke25vdslmt2d7ms60ehxju8hx5g6cws540nnv7pr3mskanhth",
"bc1q2r99dw25wc9da2en7tf22sqzw4hvr09d2thgja",
"bc1pnad9atw5aprjpxxwgyhlmsepzsa75zj963xd27vh3gkvxapxzruqr5mqzz",
"bc1pqdk0ulpnvg05jqstpan2y7rnazr9pvk290x2zyttdjyutg0rfg8qdt2n5l",
"bc1puw3kfvahyak6csgfy3q6uhwm8l4udrjm0kwr0kv53f6mvz4hrp0qxyfvka",
"bc1p79ezk6hd7nwwuwpy58f34jcr9rteetq9w4mpsj9ez7aushtp8u4s8yy3qm",
"bc1pt5hqwh2e95s2c2wdgwp8psru5958znuse6mqt7w26h3zh4z4l9ashsta5n",
"bc1p8dfyqwp0p6gwtm6ht53afkzk8a39mpcmkjmhcyp3qvj9gzlx39tqmscstr",
"bc1p79jk7vl4wa7nr70dmwrwuv30z0x63qs2lpmzjr24ztmpq0scyt6q07vfl3",
"bc1pdeu5fcfhexfldklx87ge3swt82hrgq5lzm8wmzvpafhclrmu3maqfkhaa4",
"bc1pq57as2kwa54j52z6g50r9gp6hjxjfwqmk2kmr7409suqx7z67taqqds07q",
"bc1paeep52zyzvxumjyrp4u4kzpxedr7mahqxqkjudk99n237p3jmx2s93vd0f",
"bc1pt8ncqf5re6lm00t6vs8uhngjm83t26q5gthhygfl4ru9pq2h2wlqup6wu7",
"bc1pz493gnpcnfa8shz0yk3af6gjl53a97z25q3a32n3zdr8faae27uq2vnazv",
"bc1pczere8n2pgc9d50gy0pkpkxj7vrtgvhmf3z274u9vhvyc2e9afdsxfnadj",
"bc1px5mvkgjf3q3nsd6hfk9qxwtfw9dm2l6v2e0u69ksuuaqwtdsaxnsywh56p",
"bc1ph8gakalms6rcnkfp0zakvmrswmgsrk9nafc57q69xqz2eqsn4ersnwl9n0",
"bc1pxlp9jf5f7svt2xwhms4jkhns2wwdm70luzzc9mqvf0ynykmn8tequeyems",
"bc1p2l28yuvlpmxg9t5g9kwtz0mmalvzt7dhp48refudszwje8vzv6hqfuzszl",
"bc1pddwgj9c48867r0ja4sj35lcc8f9zshk6evhs52vgfvr07702tnjsd6z9f2",
"bc1pua7jhj2f2uqd0u8lhnzp9eyrlrcfrrajafruag0h9rt4a309duyq9usrsz",
"bc1pl7y8rpc7mx8chveq3fmwaewarknu2zpx43576umgvsm2x8l87pxsr0khf7",
"bc1pzvscdhj4pxrh7e5qdlzg3tvfax5zpremkdcegsrq04x4u3h4zt5smmfppu",
"bc1pfuqug9ehttpg5at909dmx6zfpl6tdlarfx9llqndqrd2pkk93phqu7a2p0",
"bc1pu7y2uarfwu4vuyypv445a0mx0s5x0ypk2u2mg5rcguhr4t73hvtq9mp3jj",
"bc1pk40yfd099cl0dhj70sqrclkklqxmdn032mlq0nj4ef9v5nrv996svcfgqy",
"bc1pe8jj4vlpdlcuqylhwr5wduljn4g5ms0ms303mjf69l42zj8zgmuqssxlsv",
"bc1p3zrg76a6fdypdp4s9paq0hhetdlpdfum6sjllr603qfqun9pvuqqe9sg9f",
"bc1pgm7sfyr6hcy7lpftee3gq8pug29sjlay2fg83y73yfae7s5ftteqyhnp2z",
"bc1pwgmkqurqsap6ymd4qp5dyvpz42frthm450qxth4k2anxsluk4vwqsk9ttf",
"bc1p7dtnmh6j2wxtaxwxukyyx00yvszsgkvv97s6gwucw7ysvrveeyvs5svart",
"bc1p8w7jt5u6msvwdnr3fl0ujwxddahzk3v0th2u4rs55cla6p22asks75c964",
"bc1p9x0r6vl7f6aexwl070lhalst33pnsp6kwz2jtgr4r0vd6jdzwx7qlj400w",
"bc1pkc0m59kdshap204dt3qz7pmcpzmux9tnruxznuftccs7ps4gw5eqsc6mle",
"bc1pklanyqa8ytdlpzqgfjwktecrxven95qr8sgyqnwvqh90ww8592nskytjqj",
"bc1puc0gswe0k56eazhrycqmvdnj8nq565vr6zzjhum5s2vzv75gg47sjvrc3f",
"bc1p8mzfn2djzs0zuwv59vsd7n30qqrullw4u7ctky4fqgudlu2hdyaqdr4c3e",
"bc1pux0pyvxujmaud2tyfed0lutjfxy4n4g0llj2gd6pd29g3wxemlvqh52769",
"bc1purssfn7gu7lqeezmnjxa6gdagwlmwy62l7gg8wa8vva6vmdu2m8s9kanxa",
"bc1pf58448ffal8zykzhy2g4g86f4yn9g0nr5sv57d8n8ne47gly08dqgz5es8",
"bc1qz9vwp0n5punay2ynfa8yheca09hyle8u0q0dzh",
"bc1pvmwt5shkdp809svzydqzku4th4rt89848fuka4wyxw6jxa0fp6eqta40uj",
"bc1p8dpk3d2xkewttxmjqqe5zdu6szcsepskzmkfg5zmyhrx9fe775rsmup2t9",
"bc1pnrr9at7nal6ca4nqxgde7pc39xas2e9cxlafy5rnj0xs9h2n5rcq4vdspf",
"bc1qusfarrkmc5vmmnlk2razgj73xk0tapguhwdxhk",
"bc1paley5k9hdwmxtnc56vz6y2jg8hjduxmsg36m8ds40upduphczmeqzzc475",
"bc1pmsuf2723w4e57nncxf6luul6r8tta5cqs0xs29xaaalp6868rsvslpducl",
"bc1p5xvv6f5ryaqsc0ewlcja4yjytwpqyh4mxfh2vws3vvul6wt75xkst2ugr7",
"bc1psqlkpeu464lr2pep00ku940w7qc0mqun24zyq2ccn2grwrug38js2ue5vl",
"bc1pljugykdhhkgfsetejrjxlvsyasc5mga6tf95ynw3yaunakchcmsqt8xql2",
"bc1pw3flcmt6llxgve68hg9e9mqvv5tcn0pe5s69ws8f2hcge73sc5xqnupjyg",
"bc1p5mdjm54ldlfe252zk4yhyl82ktep8k0z7uwwyl7rlyey9l00k3aqw9q34l",
"bc1pdac7rmqvk52shnlnxs52z0l9z8j26zmxe36r0kxy9r4sw55jhvvqa7wclk",
"bc1pce4wugqztcmmh2mcrpfacmttx6z94hcx9efvqfkggc74lzz8mekqwaxrd6",
"bc1pss5tvuumnjavwpznaucjse3chuss846edkk9d9l5w993v752cc4qu8cl79",
"bc1pju4aquqf4f2y8e7x3lvwg3qaalyjchxzeqty8xtv2jzf48v2fdqszsvahu",
"bc1pg4h037smuhzfm66eng825m48x0kpx32j5dedcnc7cl40qfn7rnpqg5x96g",
"bc1p776l6tt6v29dl2aw93l8q33jjwvyjw2hufamm54mkkpqagxgm3ksm4r46e",
"bc1pylxur0s3sclal4un608ggn6xxy25lt7rwcudk7vuts35979tsccs60pfxr",
"bc1pyae43k090ryxv5xgt4suszpkjpzygv4zmy0wjy86m78dyatm5l7qe6kprc",
"bc1p2fu5jd6t75lv963p9ztzyjrku6ctna5f3y4pqtujg7j8jtlj6ygqmqr95w",
"bc1p6upx58g3y0sy74z3tdhyu7p44d47n8gzp4fcsm2jlsdzkxfnu67sh5e5kg",
"bc1p4a9r8x2ccuanfjz5s00hsmy84nt52cplkyyp43n3kcgflsslsk5qjchk60",
"bc1pp7py3hwl8pejgjdsgpqd864eswfpp2gp3kh5ze2fxvctqnhwcupq6cxks3",
"bc1pjkup2jtp7jrsylgn04n6cccxq0qpnmyvetpmzd7s037skntrjzfqhn2mmx",
"bc1pu0t5gza4zm9na76amn4jp4cjkuxk4rph7w5xwpdcslm0wh3lucasrlqgz6",
"bc1qgp887nfs78k2f252098useq245kar4vq024gue",
"bc1p6a68gequefz3ycdl6rsaaj6u90hredtg47huf8pdu2fhhmtphyrq4jr2y9",
"bc1pz7wp2lz6avefw95tcjrg2yy0t5phr3ldg3xwzzqcwcva8ahng5yskv8s6h",
"bc1p20qht7wz38klv200c9h4u4x86c2207595eutsxd69t8vfngnl4xs3xhrkk",
"bc1p0py6c024rhjr6r6gnu6zuhewud55wt2gdyurc6wp65d09swl0a3svflapz",
"bc1phfxplqkacuun3a9wcdgwdv8sulcshkqen7y5mlx979ftzm64vpyqxyfvhj",
"bc1pqqdnvgsu6e9spme8nlnsavx0kyp439gkl0aftclhjx8d3j752s3q2d0n6c",
"bc1pexryugp30esdmm8uyl3ldkv8mkp77kalzqh9xkuede2cg8e9yersyugnmz",
"bc1pfc3x8tgm2ckpezdxyrsd0dkfrtcp44qwvum0z3gcnj9n0juyeydsp56a5w",
"bc1pz734uvu0e5wplay97gt340mv0r8ltnu2j3rm42ma09skacpupwtq3ufhnx",
"bc1psfpasjy0x2f2m7qrdgcc3jzykzrf26efjkac0ak8d34lnyvkk7hq62d807",
"bc1pa5cr5du4vvm9jrmewv3746kpqsv7ja6gxjztwzh43g5uld285rqqqlyfpg",
"bc1pamsheya25e9v53dzjrl78scz7gt6j9ujcn8fs7hftqldk3pg57ssjtu0yp",
"bc1pdj8teq88ktnlrpnfwljjnuzkfn8p3huxgjlk6qt37zgd3wuds5mq6w8myx",
"bc1pa8kknht72q4zuctz3xqgdsww0gp6745fj0xfgnvf540q80msaqnqpsmpyp",
"bc1plyaeryccyhd8hcr54qplunzl35v3f2l04y6d0dcyqacvsp23mkusuhy5dx",
"bc1phnjc2ajdphxqt6m8vhcmqusruupsp4qmc9caas3rwyzwy2qhz9lq9tspe4",
"bc1pzl6u43qzwfzeeca57xsad7rpvcxj8752rrjvjlvulmhaa5ugku9sy0s735",
"bc1pxlnf2lyew888gzwqp2fe4dwsfhhntjl3p3f7pnlgfd37x8vn2sjsp46dwa",
"bc1pvrvpqspuuyy7yp8p59u6ewvhf7rs7q0trye2j32pjaw3rn98y36sl5ga5e",
"bc1ps9ghe9jeq3my60mg6ncfh97hu8ypt8d5662tsgtzy8xzw6pzau7qzva4gz",
"bc1p4kmf9qfff2jlg2kae77drqx8h8y8x5mv2ww4qqmm643z5sf2mmlsxl5dw0",
"bc1pjsm5t63j98m52zuf43n3ezucpfxgx8gazsp0nyvy7w6w0kvd7r4qywhd58",
"bc1pwp306s6xkw2rwvfmfw7p5nnmfmezsksgs920fnlc5s455lxv03ssecyrwr",
"bc1pqysvnja0l8rjmx49eruxpjca27p8h688gyangsnkkw4he9pmzg3q8jkrq6",
"bc1plamgru6s3kncqxj3yp7zuc46h54nxyptnntyqf977d7qg2cqmpcqtrpmp4",
"bc1pq32v6r7egvpjc783t5vm06ka3nldpxzhemcryqcnynhr8eezf9yqplzapx",
"bc1pn5mnn64hv049u2dk5p8j2clp6clrlyqzpr7g3mv9v90950nn0fksuttfa8",
"bc1p9gvzsjyewaem3zecwpcm2nj24hv9d52sc7j64g7uyk9vfh6vlspqm0hdu0",
"bc1pgr5zxyu3p6q8rvm87068k3u8akehznst8zj78l8pu5v8rmtnf68sc2gkml",
"bc1pw47j9sa9q9kz6f57lc0ne73lq9sa7ggwvz4dk9kgr72xh5znwvxqxt7hww",
"bc1pdluy92dkyfgudxt5zpnkwdy93rgxawr3prq8dryrfmwdzxzwpzjqarc4z0",
"bc1pz02acg3xfw9akm74fd865x07h9w8dr35alj45e2mytc5n55pmxzsj04ryr",
"bc1pyevkw9cy7qyk88l24s9wx2afhjuz6nmf46jp0q629px88jq8kcds4rjpyq",
"bc1pjnjs7a59ku5t06yk58myp79quxyp30n6zce824v0fym6jyjdwgkqa99m0c",
"bc1p9talms3faha7wezkhrl2ssh3ec9ztqewxqqj9tz5gxcfpks2hazqewuyks",
"bc1pg9a459lmqj4llxrsksfp8pvx3fwnutp2pqpre6650dsytlzyz9xst9ecjq",
"bc1pkkytyz4mejuedpy0vrlm2t0jj4245w8ycp9wanrqzsc6x68h6yvspqd6w0",
"bc1pd9eu48820tgmyv5g8jukt73rp703lfh8mv09m0wuur9x25sdw76qxr8kr6",
"bc1p569d5wfvnl3ywekyhpcqn94vc4w83z4z5sp8cxwy9ewz00mlujsq9qc56h",
"bc1psw72g7v2cae3rsa9kluckxaqtcvvddk7wuf2x2nz2rvdhgc4dcgqdv05qe",
"bc1p2dc7mxqkdtqp03fhwqettxwdt4e4qepqufg0hrtmx05l0a0pyjeqc6hew0",
"bc1p9hztpwdx0f3evqy9fl0yx6uppcn3tmzzm6cjwtk3gjmm5jf6hvaspus4cq",
"bc1pwmmxnt93nrdcwzpxnuwxdmz6c9038xsv27mcye9r4e5fgamh4fxsvcags6",
"bc1pyclp4gkfpryx5su8s285m9anpy7jq93z7gu6epe9z0xxave78xxsu65emt",
"bc1prqhqqkxk2gytn2su90ejq6ws69mh3naxsfljavu5zm5uq8sh8dtqqw9ph0",
"bc1pnpqv7cpj5t95xj69tqrw63jktsetl8ka8hsm6fgg3n86zu79dvtq2cef96",
"bc1pnsfmrqz6s06l0zggnq250zn55mp323kvmd0kcj07rvapljtzruhqwfuw7y",
"bc1pxzjgaylcvtpnhu0ysvcz9qnxlxtr7xat8phl9fmjyrc0vn0gjlesxf04p2",
"bc1pytndx7lmwgn8ru5ujt08dhzg27nsclf820454ghnlfmtuwhkq92s6n0pz5",
"bc1pnpqv7cpj5t95xj69tqrw63jktsetl8ka8hsm6fgg3n86zu79dvtq2cef96",
"bc1pf0l7kl5cdkuhxuthmyxm7luyhqgn5ljwr8fqkhcrgtu2dkmk8epqhhdwaj",
"bc1pemc0dw99daxvt7c6dhz08wwxgzzcxq267mn4h3lhc8zeqzqfp4kskrkxg4",
"bc1pk800vsplajr60r6xfe0t0rm936puxkn4kkqeqvwa4y64gd3lhn4qy2ej2h",
"bc1p67tjvx9t992xeydn3alcetupfgjrtst8leu9hh8gss64cu2vu7mqygfkj7",
"bc1qtasesqjqygpzuegkay6j9hy64txakdtqaycq0l",
"bc1pxcv5xzte5atp62czmp0e4z2m7usumk3u7dvp6azajdge6wq7hmpq2ycmv5",
"bc1p7zddz9yed7s0g3hmtq8yu45c9xlcftv5kw9vljhjl03jsash4q8qcyasas",
"bc1pmehaukkdnzlhq0pnrrjn9e3gp54czljry837skjl7uju48364l2q0rh72c",
"bc1p47rfj9jq6undm989wkdwefnl7gupm883yg8wm5hmfchzeggy8m9se2yur2",
"bc1pda37fk0chepe0juf2unf6pexmjw5tfxry5fn969eq2jc6s9ry4cqhlaxd9",
"bc1purs2g6uu7fev0nxeszqvk84q6j2cxj9kzzzslt7gvsc27yqrxp3sd4f44x",
"bc1pd2u28th6skypucwxdyus9j5yxyzkly9rj2dftwt9r60ftw2kxlvqkvdtcz",
"bc1p82tsuju30tzshtkswnx63dk8xnt6u30waqqqzslnaf4gp6ru8cvqkst5jc",
"bc1pxsafnfkrdznlzw8ecxdnz3rlnplw2nz5wf30ky6a5wy4ulw9qv7st3amjf",
"bc1p7hpugh2am6wqzz4kfz0wuqan3gfa4sldj4dff3d9n3ta55a7355seh39g2",
"bc1pysa5xcjrujsvwpyaghel6pstakzuckn0ye6f3qpq3luw5rzj7mvsvfa28t",
"bc1plstw23jhwjhxgtmj493xw9fvy9y3hl0d98gscv3axlud4mahfnvq4afcwt",
"bc1p8u4y6k2cdqmgjd43waymu2h9es9r4fzgrj9cze6q7fcl858reluslm7mud",
"bc1p9xcx200vx2fe2fq5sfwwnu5djx8rcr2w9nx8j0hzmy7hnmk207uq4d0ty2",
"bc1pttnrt7a5vnj264gnc0fdkywfe8gu26lehmqmt8a8kwd4q3hka59qq9j44m",
"bc1pj8v8n9zyla3egfc8j7snytdgn0prgfeq5kar8xg5aev70p69j5dsxy7s0g",
"bc1pv43w5q88zly37u4w2zqq3nwj5xxq2cvdnyt277p2kezt37lp8lssaqdg8e",
"bc1pd8s04mnddmhu3kthywv8fe5qa5vd7eqad7xnv7fsjd94rdplyt9q9meuyz",
"bc1p56s9330s7xm600w7haprn7gz0f7ygp94m480a09wulecr6hypchq0j9677",
"bc1pu80cyzr9uhqz7thupw05xpx8r8jftawn8vm74st2ry0ljn4jhmrsgnttnx",
"bc1pa86t3tcg3avrf9jpqrxtkfdk0awhrsrd7kxkaw4wpujeju9yykrqcvyl6t",
"bc1pnnqu2xg9l3a8l4ntl4a5cze7jmrquc6hrfh68vvkrzzvtfz4546sv6yczw",
"bc1pjucwgra3xd8axk06yj34qj3z0ryykn0nnq2860fz549eggk3tsfq88k609",
"bc1pcgv4krk5syuk0hqcehnpsdyn4937dtz0pvnsag07hcn7at68k8ls9fmqkp",
"bc1pp5hnq8246gtzf4zhq5s5pxadmqq0xze93gqxch6se9wqv58ndrksxmquq7",
"bc1pqu3vkjrgag88paltut6q5l5puxdgmacssvt93qxnv27dlweye86qqh2zmz",
"bc1prlznh43cwqyyug9uwkp0fs4gwkhrdna5lx0zr9gwktl5khd4zzhsvm3k5d",
"bc1pp7py3hwl8pejgjdsgpqd864eswfpp2gp3kh5ze2fxvctqnhwcupq6cxks3",
"bc1pjkup2jtp7jrsylgn04n6cccxq0qpnmyvetpmzd7s037skntrjzfqhn2mmx",
"bc1pu0t5gza4zm9na76amn4jp4cjkuxk4rph7w5xwpdcslm0wh3lucasrlqgz6",
"bc1q2a8y3yjgehpk5w3xz60gk5p4mq9w07lwpxu9xx",
"bc1qsr7hv7l0s6makyc76vuc57adtfyf9e09jypaau",
"bc1ptknrxk9hurdjen7rjnc99ftyux8g8jevspmkrcqrl64cqynttfhqjgp27l",
"bc1pjnjs7a59ku5t06yk58myp79quxyp30n6zce824v0fym6jyjdwgkqa99m0c",
"bc1plszj3m39rr4nylsfqkpehnah0gjvxhg2um84z8zu23k90dlx7pfsg8gu2s",
"bc1pxtzq49r24mtgx2qzxqc4kgv303ahsea72dd8rcdlfxnulk670jmqdhdvhy",
"bc1p08yyljfcz8w7034ay9v02fxqnlfep5euyaayujafm5plxept9emsgykg04",
"bc1pzqhdrs2w8ff2t4xfma7wpxcfuzkld2pxcz94ukvs37lr55vglz7skkhkwy",
"bc1plzpu28v8d9fs5cat08kynz0wruwsvmrcccnqzqz9lvk0vcltrrvqpd9clc",
"bc1p45tqkcwjudx425pzpjg0s43gv5m8xet9466r5hfsa8j4zdqwplsqkll50x",
"bc1pffjq2cr0295zeckjap89ajz29ss2ch787neyz9uc8weyq6pkn7tqxfezah",
"bc1pz0u55la84dajguslnl5h0w0ghztlcl5snylclutayk3fwtmfcm8s7msx6g",
"bc1pxuh5c2lp8u2g2rx99y43s8tcffs929szv28kz0lyjkyale7l2czq0dqrd4",
"bc1pkhzttmrznerfwtazkse5vtwj0dm5lf302s7pm6dyayqg0ccltgdspzwfzg",
"bc1pa0zyft7puqxjng5hvgaa8kauakc9xax3km6xpcty76ny5e5gk49qwfxszn",
"bc1pv99u8j8qceedgt75hz970g388yzv5650ymzzdaaecxha59mltjnqj8nu93",
"bc1pv0ye4r5gah6g0490qugcexdqueaht8djk2zmmdvv2amdqv2flqaqdmkcu7",
"bc1p8mkvacdan5xh8jpfwmmeec7lxh2xqduggwmsthrutkd0v6rt2q0sxju4j3",
"bc1p5qg0qrk557ez254dglv4kxj2mt52ck0n7ngm6v3ut5ewztaf0f6s3q828e",
"bc1ptdr4qf4d2p6lh5yck786wnx3s5243x0tktzxrha8zn2swq8jd26spv34le",
"bc1pxvnmvl77uw9ldkdcdmk9jzwrsm4wcl4ny8wrl3rzel5dluxnp5qsnta0es",
"bc1prrgteqmupfhefhk5qtru6f5mv447tq0qm9pzrxfxka5e5dk9zrdsedc93d",
"bc1q023y4qa7kwf2l4scc2n0wvpz7zmgckcg0exzyk",
"bc1pntxy6lumeefx8qrt67aqp2erve3d3dmzc6z78j6jgkujdy35q6uqwkjeec",
"bc1px3rwppewpypmhxkcud0zzu8gp53w87qvt43zgq6j9566t4xwtuhq469kg4",
"bc1pd5qd7lz89f7cukjygnpcnvx99faud0davj0vuc0fnvgwrvr8adxs9q93f0",
"bc1p0fh80rr0ann9zjpk9n8v6z7sly0990exarkdmj6rcl04w2v089fsd2um0y",
"bc1pztpvaz2mrskuu2ffjja0kztzvnq7xhjqzxu6l7xqw3wvslz996hq0d5sve",
"bc1p8395lxw5fc36zz8cx2vt9vg53uzvk7z3e45756ufu2ru276q49xs2jvdda",
"bc1ph035m5k52ceuazm5vn99g5nurymg0p66dfmhn8dmrzg8lay7z6aq2tlysz",
"bc1p5mutrqm7dhy0ukqr0etfnury82nn9tnerruun96qgydjhp7aam4qdgafg5",
"bc1psh9e6aue89c8cxpdffu4f33hg5jwhvh2jnt03nthhese6ph3wl4qz3pm9d",
"bc1ptjnpkrahpjjrh8z5mjmvp6r6s7fc49fl8xhhquak6222083yn6yszuy85w",
"bc1ptel5xsaxge3qar9q4dfe4xfqe2szthhrk2kyfceqkeqhuvakcqhqpw5k72",
"bc1pnsh8vlqzvcm0pxypunxnjd8kk7pwfsct3ugsv8hskw524z89xfvs8gn8uy",
"bc1pqupng50n9g9r3z9kmfxys87yq7lde8laklcuk0uncju9wrvlfa7qnxe00f",
"bc1pn88swgdvs9x0eazkcgaufsmwhp27jf478py468qdea8xkgau9mnsm8kpt3",
"bc1p8kjg09ukfqe9s6ugxnf3xj2fzz7ecaka0umne0r53uc0prnwqwkqpwcfk8",
"bc1peqj0rkj5ufd5a5prj0deux56kmrc0qdhcxlxh62amr67pmdr4s9svmkd0a",
"bc1p0vzmza6cncf2dku4mr9mky8ef6xxs3rd4qv6wk0a0pmjp7fjx28qzy88dy",
"bc1p8qwj0fjh4sjyefze9et3ymcq6yvdw6zh94zq7fqvfahs93jkt0uqxcx796",
"bc1pflykt3lvjjpymzl0pgd9x4eyyye7jd6s5lremnz5pt557j0ravcs5pt3at",
"bc1pvjn36qyertdptgscc7vcul709u8eurwvr4a83pwy07kl3vu4x6rsy6vj2m",
"bc1px9v0ufzaftx4zm9t9zk4xgqhksqpan0fnsjdrf0cf3j7fy7j0j5q5u5wdv",
"bc1pswqkz4e76ex9jrzuty7upsjpqdh5gdm3ln3lp6yvlu0wlzqhpdsqtg0d0j",
"bc1pqg54nn933wt38tr053qmcvqe2drdswz2v7zpyak3ynjfveqjvrmshn30j3",
"bc1p4akwj39ggwtupkqtlvpkxv3f6ht5rjyht2f3lk7k8hd43dd0tk4svdjmfa",
"bc1p8hgd8dpljxl07ckr83kjqv8096xcktf99lz93eh008mx9qtt07dqpkcc0r",
"bc1pd879hcqy9j2pxx6yr4fcwlzp72evv6tm0j33ty9ctut7ua9p2ucst2xk28",
"bc1p6d0fvnsp0amkwngd698pwkpqkw22jruw468fady585tcm3zyxkpslqsx93",
"bc1paf6q8gdc5qnuqltzjat8dzgrct7xppephnnc60nuh4qtrjzqut3qwvs7q7",
"bc1pkax5cdjpfmr26zsmg67cw348fuv58lxkvh669n5ldd48qq0dewqqljkej2",
"bc1p6t792g3kx0xl0rjdv7lug0l4zvsqlav5mg3krlf3nxuj8nwc9upqvul5qa",
"bc1plv908az4z36fvn62mc575rcq55drmrk79cwj53g8xu9gux7tl42qswxln2",
"bc1pddvgnpfcs068pl33grrwtu8kkz9gw2khcxewq9jqlgrda20z2t6qh326vz",
"bc1pnz5z3tw5l43eczyzw97dutmh70d6jsh2ud8jup3578hv62j6fcksjnanfn",
"bc1p2hr6dmlucm5fx7e0kxklgyu7gfs59ac5tagett29uprg5hxwtqwsp8wzq2",
"bc1p5rsvxnrvda6cn8qp3ld853uczj4yu5t7mrkq72484h0j4xlgd5ws4p2g0d",
"bc1p8s5xqtlass8yycfd3tlfu3u4yntv65u06etpq247pgz8hv3p790sh9mp9q",
"bc1prg6554twce5xzryhrsczqqzksjz57kysqsvs4p77ef4c0afat3xqfe66ag",
"bc1pgp8pqk775ug5uegdedrlllqwdy4trnapxsznlv4aycd40v63mr4spsc7lj",
"bc1paj6l5q7ksj59cezmkfyupxszt99s5l365u2f0466qaylq6tqv7psdz0qq7",
"bc1p7raaxv4uen803aq6vkqteyrs63ttk5s36wvzt2v94hkm3atmcv9q4rg64h",
"bc1p74azeyzdqh96q7ur0wf4fywgj52dwg4t6y888ttds6xskymg0alqxn8mg5",
"bc1p2u3vrk6443m0e8kjframkfhx60y5rfhxvz0ta9h0dc37ylc60k8qvec9tx",
"bc1pkk4nwucyc0xyw94untyktzmc7nxdcxp0pt5e7hl5my7yjayazx7qc3yjfd",
"bc1pqq8nyxxuty3lumwn69nyvuthl7x3h7mclrw4thhdk3s2lml3d7ss66c3dd",
"bc1pychpzznn6hxkm950vje050xxxz2uejvsdxwh50lt9a4j7fy7p9xscetvyn",
"bc1qaw3cg53lfa46l2lthw9k7smf2s5z6un5jcwzry",
"bc1puhx3u9d3pw04kzrx04vxwg58lln73z4edzujf008eu5trf3xdy7qer4da0",
"bc1p7lauhys7tgn3f6zw34zx7lcy0ascwrspyls5t8w0sgyjr6gvp8ks99y80q",
"bc1pxtvcdmqmq7cz48jvjv79k74ump9g7p64mqh70d566v00mcfaz3gsk8r486",
"bc1pw0e9qh6rptm9jlmkcfeuyqxxyjwvh5z702x8ug8lx4l4a4jj8wysrv4fty",
"bc1pwyhgufthqm423lvqyv2s7cv0av8hzukfacsrde8xa3z2eppellms3cernw",
"bc1pql80wlgny7n8pa5nsfv3h6q5jj6qnahap2y55wsy6re6hk27sa0spmfzmu",
"bc1p2uu6tvqy2swsgggcrkvzfausmcf7m8ydy0u742te39935cw2g68qcyu4ym",
"bc1pn5aek8mwtzp74nkq9xhf4w2gzlys6mxen42thgeqyljq5yn7f0qqntjgxu",
"bc1py3eee0yxgcm2hleez9lrc3c8qtjnzgvnjtfgmqtu5wktyrq5q0zs4wlskk",
"bc1pnv42hgxru2d5uqtdzrfguqtkglvvq6dkmtvdrn2jaxda8f08unzqz8f3y9",
"bc1p2072xn0a7u3smd76tap5s7ckseqc980csppzx3qmjhv4njexvy2sfw7aum",
"bc1p4hj505xtw8c7drk456khju542l5xmjdl2xmy282jv4ev7tk8sccsqes96j",
"bc1pe0f0s6hcc6qrlnt9h5esd6gmlj5zpt6lepl65hhqc0g5u24yet9s2vmc8x",
"bc1pdkl2sfqss8u454vnpzmx35lkwpn9dd7d5jdkdeuv7yylds29g5zsd2deu4",
"bc1pkc2ylzs5p90exeunjsplpefyehafm9sfs47jszgcalphd05qxn7qnght5j",
"bc1p4awe92waamnxmwpqmh7mfjkdanl9ls3arm2rvwqxuwvn46ak6qdsrhju88",
"bc1pkqpvm8k0raujhe5w4ay9p2fx77c0lrzlnp43279d7qyc84cquj2q9s8puy",
"bc1p4up4kr62z3vavpp6t938nlfj9mmw57y66ee8tcqa6a8mec3c3yxqgxqfr7",
"bc1pnzgyu0ur2m6c99cgkmrw39q8mm2vl2cfstpp4pm38a0g7sx06xqqv35q0f",
"bc1pzqjwayhl2c0ngpr3t2ws9ye839v29dnftletk5ld4ve0s60wrucsnnhg87",
"bc1p88f9xvj9cq2ya5pssmmdpvcjfdwf9t8nd359g86n7nrdw4d7jl8sakh72m",
"bc1p9n3l7um7w8jpyegvhayeekd57d9za2ugv25uf34lr6q2tleg9wsqcenvgp",
"bc1php3gwuah0v7xtay94a84epupvl3lt3dkdwun6myk8emjtzl86jeqd5upcq",
"bc1p9w7amjnj3w4myst5304mdumc4lke4q0jaarnfx8vxyelx2hr3slq2045h6",
"bc1pkadde0ucqa00ngm3hs9hhk78n7flycxl7dcg4jzghumfra020n9qg8m5vh",
"bc1q8g52tkxak7w069pwc39fu45940zdzgzdyaegkm",
"bc1pe7gdjwrmsm22scntp27z8pjsc4yvj789v5qx9l30vekqtwfyzpnq2zrehu",
"bc1p9nwq6qgkec562fvu2edn8ul3gmnrye8628dmszpq0ukarqmvsc8sjfe8g9",
"bc1ps6nnrjw8ev34pn3n5ych92e5gw343rwxlzc87uajld2grhgz3fks52nlgn",
"bc1pjp8ffjl87sprqrfnhpavcqy6p9hxe7xsgdzxg0rm2jgj9j7hdp7qrxdhv2",
"bc1pzy583lnaxp5kfqpjsltptwkc9kr3yvl7x89huhsswv02kqg5le3qwfeumy ",
"bc1p3fychhc4f2sx7guwahanm5qtan7drm3xjdagfsquzrnum7ftaysqpep7lf",
"bc1p0khqsw9300g5vg4zhkhfy7r2ww36jtpvs4rsxmeatfzf389k86gqetg3ln",
"bc1peypqg4gz0228vnjxrqh9swq0j46sjd6t7mrk9eydnrr9vpcmgy4qphzhg5",
"bc1q7qlyhzt52jr20hc5c6wel52jykjvgrd0skv2uq",
"bc1p6dhvt9v64lcdfmq3rx3vjgsts9gw85eche3dtcd95xagd5kxvs6qryuw6n",
"bc1pyslaz2r8ulajr035sw80jwr0n2y8ryz7v6znuk9vmalp9tje2lrqhz0sxd",
"bc1q972302mqs2vcfag97cczy66pmqujepta69ntkn",
"bc1q5zch9cpk8pw5n6lrxacvgasvdw9ll0pp357885",
"bc1qmcw940lynpm95x0nthmzzwec97dqf68qjxj4v0",
"bc1qzmgn02203awkrtt0vrvq4mpd7rrav8znu8f0au",
"bc1qsq4q8guqwgq37uavwvk20s2f4u4e8ny9w5u90y",
"bc1qwyql8kq4eawz9ppqf59jrfejcp5gvl0qyack3y",
"bc1p8qayzdd8sljg4fg3tz8puccuz948pqq5qy095e6e4ug96250zcasr52hcw",
"bc1pklxfqg3gycp76eytkujf3npgndla9067q0daqnu7k4t35n5ds5mseyzw6n",
"bc1p6aj2vx4vfc47e4xmh3e833a45ty409tnfv9av7glmjzd5ym7nnfsqpvgdz",
"bc1pej4w37njks3x82ceultahpnp5ll3tszpu0ukzrwaa5uneze4ftzqvj8p7x",
"bc1pl4ewvtlknk73cht9m4aj47f95hr3v0f7d7al6cyv6uhng4pwyxsqswcl8w",
"bc1pvz3h2fdn8ws7y4tn7l5up8efc8pguu2drtjm5v856ct57f7l4naqau46pn",
"bc1peq49v702rw0ec8dn4jaam0zau3c7c8wlpkaev65unc9sne5ajmesgvjyy8",
"bc1p69wn4harj7hjddcrew00d026mt8p3wv2r68yn0y7k8svuxdq28xqf0wtev",
"bc1pg3wyjkjl23jnug98aqqanwmzu57h2r0mx450gcqrcgls7y59kwqsppj4tf",
"bc1p4cvyumln8g2eh0lsg2k2j9mtjmtptuhnxu3mkdhyyej7n93azjpswv4dea",
"bc1p996szvhx09q3m2j42srdpd548jmjdnx2dn2pcu5p9c7pxzthfu8qvs3fqr",
"bc1qwvzvsspyk8cshfj5z6g0yje46qcjs0ykvveyz7",
"bc1p9hkzts3t9tmstc9ca7jet6y5lf5derwkukuayx9kddll7lzm2v0q7nc3hy",
"bc1pw780lu4re7ykrjfqm6a4lvltdn8ej045kdgdt7zr94d7lhgt3mks9szhe5",
"bc1pr72g3uwxuyhem8tp09avg0zw8zp5yp3tksc8ezvhj6th06drms7qzkeqcg",
"bc1p6r29kh39ak70l2jzwmmujl98v94c32zl4cdsn3d82gcgak76wwsqvhmzh5",
"bc1p7uxxtq2l353dy55kcqn3cxvddwks6fs320vh53k44l8prmdntk8qz0gcls",
"bc1pkh3ccmdn7xq92prvz7qdfmwazf0tyr5rnw2kc0u7uhmmrxhc98ms7hxsc6",
"bc1pyc26trm68e0qn2ld8f7q69tzhuxgxayy8tsaf2xv2k23agwj9whshsqauk",
"bc1p68crjd7ayuvxywf3lexunjv90glz83swa6ekwymhfj7qqtkrfl3sku3adr",
"bc1plhc8hhn8ufc42ucyfu4mj68c6jqt0ch8p2xyp627qlv2xtjvq07ql7raha",
"bc1pn90vyez28gje4d66w4hga48p25ahlj0zv3fvgx3kq6fyj8g9nphqqfgeze",
"bc1pmzt8zwmvwg6x9v9kp557gt80n6zfahlyjujf022zw6e35nyrsrwqed8wk4",
"bc1pl7lxmvcgz33m20lp38zctxvldh6mpr387p65djjjj9ydcmxadptqxvgfn5",
"bc1p7kpcjsfauyyppw257ajue5sx0yrj75wjn0xwxc7j5yg2flw2k5tqfn28pg",
"bc1p5s0zk298ezwvj5je520mc7lvekl002kwl9qrq2tvxydk7phty5eq5rkfht",
"bc1p3857jjnhx7egdehfy5uwmhflw5ze64jghrw383lwqe2xww8uwpssr7xfga",
"bc1pzdvrunjgphcaaxzdg890ydf2vcy9q74kc7wvc0d9n8rmca6mvrhscuxl3z",
"bc1pj6fvqvf97mldqk0sptwm70fpy82xw3787qf9vczn2jdnk07tpz9sad8ql0",
"bc1pcpsky7h9ddv6j78fvhkn59lv2dvs7nqrdjka2v90akz078fhxedq39u00c",
"bc1ptz99k8m09dvgd7405x66ye2xehh5x58y8j77ewmkxwfvtr6x6qvs9lltu2",
"bc1p2uxntapuw42uldevwysdwas09qnxcexfahv202vmpzfct49xp46qxetrev",
"bc1p6n2yz8lnmw8n2kk5skz4nj7petd8l6vj5f47kmufqaus952tukdsxzrzxd",
"bc1qy078zyqatj8w6wed2zxnydrl0d40g08jgcljq3",
"bc1pqzwa4w9g502d3s5pa02cg47qtvuqw2nqndwuccflevum2pt77d9qejde7e",
"bc1pvcz8a9e05wrp8rxf2xearfz6yxvkzpt2gdwm6gcvvdmz33klxy7qx03pen",
"bc1pvcz8a9e05wrp8rxf2xearfz6yxvkzpt2gdwm6gcvvdmz33klxy7qx03pen",
"bc1puf9qqffv02wyu8zzmt3w65u3qnqy5c75uf6sxc88x6jd2f900gwsg8z50l",
"bc1pkkzgc73dnrk6m4tn43jl7w4wft4jjl2l85c65d3ghjp9w4g3z5gsjptg2q",
"bc1ptnrqs5hmdxqh2xwujvnqs0epjpqzwcftqdnmmdvg9dlak0nk3p4qpxp722",
"bc1pjx654z0pl7qkrs0jprc5chkrygwmeey88x6dr9eplwrt0z5k7x7sadtx9j",
"bc1p35402p0cvnwvg7khwuwt9y5vwsd8p7urwcpur9j8394xqjpzl5jqawshjz",
"bc1p2djtcd2u82xjel26rxrggwnruh5nfkjq4k9zfcydc8j8se2hs2sqfqy8ak"]

// 获取Launchpad总数据
export async function getProjectTotalInfo(req, res) {
  const totalProjectCount = await PROJECT.count({
    where: {
      state: 1,
    },
  });

  console.log(totalProjectCount)

  res.send({
    msg: "success",
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
      msg: "Incomplete parameter",
      code: 0,
    });
    return;
  }
  const projectInfo = await PROJECT.findOne({
    where: {
        id:projectID,
        state: 1,
    },
    include: [{
      model: PROJECT_TEAM,
      required: true,
    },{
      model: PROJECT_TOKEN,
      required: true,
    },{
      model: PROJECT_MEDIA,
      required: true,
    },{
      model: PROJECT_IDO,
      required: true,
    }]
  });

   if (projectInfo) {
    res.send({
      msg: "Find!",
      code: 1,
      projectInfo:projectInfo
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

  if ( type ==1 && WHITELIST.indexOf(address) == -1) {
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
      projectID:projectID,
      type:type,
      address: address,
      state: 1,
    },
  });
  console.log("totalBuy", totalBuy);

  if (type == 1 && (totalBuy > 0.077 || (totalBuy*1 + amount*1) > 0.077) ) {
    res.send({
      msg: "Have exceeded the limit",
      code: 0,
    });
    return;
  }

  if (type == 2 && (totalBuy > 0.577 || (totalBuy*1 + amount*1) > 0.577) ) {
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
    type:type,
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
      type : type,
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
    distinct:true, 
    col: 'address',
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