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
  "bc1pyf6e4ysv00e84hwv5am07m2hfcsxs5l9q8zt6c6aj4aal03mh5xqe376p0",
  "bc1p0fsc3w0t93jey0g4nntnux8l9ya3z9qq9w5fke02jj4fgay5d08ssjsv9c",
  "bc1pw6gczg36nzayyt2466yprm5j3wwvejvpw8h92d50ra2y7vuuvk3sc4qrra",
  "bc1p8jmlehlmrpj2xry7nu6x3edhtavsmvp7yyv9p5pcwuk2rx6m0jdskny9z8",
  "bc1p65dek3n9guatf5m84uzj33nrvwrq7ks7jxnngc8a6e38tq9qhc5sgzr9ln",
  "bc1p3eul6r3p54zn3cga4n3wzsue70ff9nzgtghl4a6j2l20kntkkfjq9xrusx",
  "bc1pev4xhfmhnjt08pzvgc6glymusevwp42mzfxnpj9gs4m6gzmlcg2qpeuaeq",
  "bc1png3t7pe3e64cmuuz3egmptcvmn7c6twuten3ved9m984y644pdns89saek",
  "bc1pmszz7v93swcd59ty2564mwkj6lgc5yfykzvywumjqyg6qnvglvfq4lhzgt",
  "bc1php3gwuah0v7xtay94a84epupvl3lt3dkdwun6myk8emjtzl86jeqd5upcq",
  "bc1paj6l5q7ksj59cezmkfyupxszt99s5l365u2f0466qaylq6tqv7psdz0qq7",
  "bc1p7q6adej4ths8ayeksnfth3ggcsa72hwr8rctm2ghwgf639ut6vysp693f7",
  "bc1p3hnhfer085eagl07cddk85f84hltaemapafuzmec6qee887yfh5s42saak",
  "bc1peausfrdpt55m2w9w2xvcpylmnzrwd2u2748wg6x08yu6mg5qu9tsvdknxx",
  "bc1pvldzajjj0vyrpn2wz3wjx9hfssnl78rrh33wwjutchw9mzyxjyrqtzen8n",
  "bc1pj0qemwve7mn7mcy66xpepksktkw0dyjvzxk7waffyjnk5vwyga0snsvr67",
  "bc1pz58pye03ded6a0kfrv8an7jph3kf5yccwm4gvj2krd863wf9wtpsr86rsf",
  "bc1phtfy62xurwxmu86f7txcs88yz53qemjmu7w49hl9rv5yn4aga3kqssjjf5",
  "bc1p5rve6fn7zsfst6k99kzrx37x68wr73cmj78x9nz0k4fmxxsmtz9qj5ttem",
  "bc1qe2s00shljcyrx7vm2lg6ns4n7l95qyvmnrkkfu",
  "bc1p0cec2z4x37ympuztzatpantz3p8k663lhzss69q4k3rpqna7828svvxkwa",
  "bc1pmxcvjnj2sajg6pylrjfwjkklnjfaxg6yvsx2a5v3ftykth03yvuqraajpe",
  "bc1pqkdael55zeha2n2w343v0wxqj34addevmuhzu5w0kjkhspj743mq4g4kmm",
  "bc1p5fqln2a9as3cprskg0rjdxx3nyarcg6u82vg798phyas37mkvcjqcslhm9",
  "bc1pr9uxux45l3m6p2y49nn9fr4ewpmfaahwl7nykhj35xp6g6szjsgsjdjkpz",
  "bc1p4q6n933w95x4y8aphsrztxg2r00epyc7z7vjef9x589kkm9j276shz3rv8",
  "bc1pgj8ser9st835n4fdnj7w3f9kznamcn074telhsd4s2y7revh23zq6c476h",
  "bc1p3hj7k3getlgrn4eee3acqzlafy32cxsatw9zmd4tmumv9gt250hslne7vf",
  "bc1pfusv4qh3lt6g27npqdufa2jgkc6lqdacvpkrqaxxzankcpd36ejsykqp5s",
  "bc1pygrn7cklcsy00n2aw209lhl7jfymxh3uasqgcplta8qt74my3x0qwlcj30",
  "bc1qpv3xckgmc7usx4me9mx5dnldv772epku90u4fm",
  "bc1qf5ffv48qhh98equ7hun2g0y00wf20c7j0ntqzr",
  "bc1pxu4005l7jj6m40dql60vj8smk7n4sagan5jdsy8mq2ws8hexwvsqmu09kc",
  "bc1pp36e76nv3afswv6eh4y83p5u2tmvvmsx4cy8nqn8wg6p58hr09tsm8wflx",
  "bc1qsyc4x3rplg5cncrhk2tvmrhd78c762m9yjfrkr",
  "bc1pcv5h3ytv82rkvz9muqrtcet6np5nfma5ws7e4ztg3scjr348809qynjgr3",
  "bc1pce4wugqztcmmh2mcrpfacmttx6z94hcx9efvqfkggc74lzz8mekqwaxrd6",
  "bc1p0qh062h2tqdr42n3r9ukww3e6wh0vfxwx74m3gwsl4j8u8fy0yfs29h8r5",
  "bc1pnxlyk5dsfcrsddt52px2p2cagr7m3wte9r356wnlwx20al3cmunqlmfu73",
  "bc1ptkw4rqcrwacll0n8a4xdtjaygcqgzmkx7g0xgehkwxmfsmt2yd5qvkkg3w",
  "bc1psunhjm5czun99599lu3k57a68kpg7xlj2g9k7fcf47y4zywyrgpqq3devq",
  "bc1phhu5mzxr5t6wpes5q7eq3m8kumwmjg49qxs7x9z3dnxlnc20e5xsze7l5f",
  "bc1p8c3nt9h8c5qhlxd4gp5aasrxc74dkrjkjfej60jafkzqxgrwzlvs8wv8vw",
  "bc1pvhw8rudl58vjkcv5pxs4hzuuje0p5am0x24m0lnhu7s3qjfvkkxs76pkxh",
  "bc1pj7hzgen8k0uqptgmyqygc0j7ruw4k8uah36c5ch07u9csj6mkneqz7wa47",
  "bc1pu05mpma87zvr4m7kglsr2hy6pwux28lulg5rtw0g2499t5y2pjuql2cnz7",
  "bc1pan928mks8tjg0u3a6z39f72c70jupsxwygln9v4g3kkyg4lvvr8skzmuyn",
  "bc1py0yf9k8r7s59zkxa04rmj0egynu6p54kraufu6mah7e2erx536ps50zxwz",
  "bc1prank4eqx3zu8lhy3hewfz2dzcmqlmwd5qdenygaa6s3q0jk3q06qrfdhee",
  "bc1p09erfpcsz0v8f8f4z2dhft5rhycp83gfx9c45az35lx2y632vmwslavcgs",
  "bc1p3nl75h04v274c70v3gveraxnzxv3w7kwldvwawmkff3qz7lep0uqdm50dw",
  "bc1per6p772kuzdk3y8eud3kkx5nkg5c0jgppzc4c77k3a42lzxuv7fsv87hym",
  "bc1pt9fll2ymwgzz4ulxd40dtsjm2ned34qg8xv7z5re7mkxvfm9mx2sdkf7gx",
  "bc1pj03mwhc776hrxkkp8lk53n6a570p67x52j632lvy4xn2w2ecqm4sd48frn",
  "bc1pqzdw8u333srygykhf8dwjkgjmfk4t3llkpww7kvu8gzhrepf8w7qw63yp8",
  "bc1pr5yzv7s8ghargtwaqydnqs02pez2qyz2d2jn8v2yshyclcxrczds7qngqv",
  "bc1py3y4url9v3vrag3g6wymfc9m6ulfrhk6fprg2y2677vd3xjtxw2qkzfqrl",
  "bc1pfqfjlw20sa533d9f50c4qunggeleukkcurarjdwltzx8fzf456gqfxms4",
  "bc1pzdq7tfvrznvfhn66m54j5683pxkatma34em5lgeuvyk6xy0jtyzqjt48z3",
  "bc1pzqm97ufzxug4gqg79qhmrrh9eqkvrv2lt4zcjg2r0aa4ahdf3a4qmwx7tj",
  "bc1pr6rywpqmcfq2ky6xdudeus6fxs38e469j27cwty5gg5e5jgjususfrjlu2",
  "3CDktJDYsvdxj22roJK3JS2wUi7xVvVrhP",
  "bc1p277r6z56t8frhp262qzs83cphq07nlz5tnzwm56p0ea4lm4x7ueqarfn3a",
  "bc1pu8jpvmmf0qxuegqvx3m5hlcqrsfua6g08ktxv25r4hlgz0jnwn7sln622k",
  "bc1puls3gc36grsvv70zh5hgajyw7l08dah2j9kv0ld28kxskmd3tavqyd9quu",
  "bc1ptx72wnf26je2hzsvxy3glynzugxt4v8r9e5v86psvgxmmekle7hstmmwqw",
  "bc1plhm6cwznvtzck6zrx5huew9tx9f63l0fg38cuktsdg2epkhktw8qd09csz",
  "bc1pdkv9pxpz5vka9cdx9y4aqthzetz9euhzygvreuymgfu6vprmxlvs59kp4h",
  "bc1p04g35kcje6yaw6vh39364p826rnheurl4pcgye0z078vlvg23ayqe5fmau",
  "bc1p0h42p6mwddkdae2qp5h7t7xtrj23hpunjt6xjfr4ldk22kls8saqvnvpje",
  "bc1p5uh2ye3ndlxjpsrz3r5uvh9jtkldwmlygl6hv2qcvfaj3hskmlsqxa9rtg",
  "bc1p9sc9j8tdtnjvdrtcaamuce7eudh5dw7mx2q5sgw2r8mpgchtltlql8ed45",
  "bc1pltdnua9vejddkl9kjeejsw9tj7fu3u20yu95g58zgqnm4g86r40qpvhjfr",
  "bc1pwxd3hgj8f6twkz630rxx2tdc5kj0p9h2fru8kx5ppkq943d4xfuszzakvq",
  "bc1p5sh2jfz40ehje7uqpakqadjmt9de6c9fgvw47pkh9ypvl0u7454qsemtcu",
  "bc1prf4hgskr4yne2mp36a70y8ea06m8f2mf7mq24x7mluwjdncjnyus969yvf",
  "bc1p8m90j24t7j8kn5yz98dqfq3ywmx85drhk4pdcw9fdv0k5n0dpc8qqqfltk",
  "bc1p0xqjcylv9dwm32vrccxtlhptz6kjgluu5myyth6k4ng2gjak62kqxd4pk9",
  "bc1pxcgm36k2h7yq7mqnv0m7ek7udp5039j0hy5jqjfur7xvstyvz6lsthnu6n",
  "bc1p78zkdpgvwxv956mrffvcwwtnhrs8sz2eru795fvscjnj8x8tt86shnlatd",
  "bc1pz0xqsq8r4qxnns4fxmsjmagtsrmjqlsqylhlahdl3fr3vvsk9jjs5jrwr3",
  "bc1p8apk5q5yvkm4aefjksrth8xtc7h4xnx45e3exqq34nxdyegtav0qrwed28",
  "bc1pdfe607d93g07g8cnag5pawm598fntl9nsq3zddxtlj5q09qhr8ss37xp2c",
  "bc1ptsvhp0qudvmde8fduujl4cwucwfeth6nmd0ukvvczd08278e963qk0cjuh",
  "bc1pmde2s4dnp67mh5n634vuhpwn8467ykxqgelhq0d4az50r63xtn8s5q7e8v",
  "bc1pxua8jzz2eqzsnjqqx8heqprnr6kg72f5t4jvqw48dfkugfytekdqcs5wrl",
  "bc1pxm905g89pamsqwt6zeek5atfzyf2fva0adjaanud20zc8ceagrnq3qjf74",
  "bc1q4l0azjx4mhtw8yj906e0j369hzuwf2r47u5jhp",
  "bc1q5at9s7sl5zm0pc6n5wggv53ghuq3042swksffs",
  "bc1qp7eprt60gs73y2hyq3ndkaqwwkzkxpwup2n5ea",
  "bc1qxafs49aq2t70skywqx9n4ht8a545na473lwj9r",
  "bc1q4q57xhwktgvpkg4q2s6vw09e6f9uktjfjtpr9r",
  "bc1qdfm75sjplrdw5sk08f2hfs0je4zwwsxyy7l3n7",
  "bc1qmkc4rxyf2vh4tzfkp7u4qnmf7x2vfly02y8lqz",
  "bc1qtuury60tcqueddjwe62n32lua723nru07xtgrv",
  "bc1p9vd9rumxex07jaeczluup8a87908zc2cqnfunw74uk6cm87u2cgse4gtvx",
  "bc1pgmf4vtv4mhq22vmxmf7xqr0ntpxz8ruujt85quwr67k2ptwgpp9qyphfyr",
  "bc1p70g8yqnflsagk2qu2nhz46jfckxlsfzs3ddu5lklg8lhx9ykuwfs4gzdeg",
  "bc1psxjqjdsrdhkqqwa23scyn00l05hedav0ra0d2jedgl9fn3yqsagscazhtl",
  "bc1pw5dffj2ygluqz0ky4mpuyhslzg8nvgn3lz8kjqqxpv8xms5wv6yq53sc2q",
  "bc1p9v2d5upfdvs0gqczv9td2w3kd4wnczsmqlgx4d92egj520m06cps30wvnn",
  "bc1qcuskpx8zjshhth96w883nrlzty4s7e2375ahx4",
  "bc1qhjmywpt3xzw276ukd5m9tggkq2xy6ercey7hyy",
  "bc1qth43atnamfka0yv7c0pk4jlfv0z70rfsvr6wqx",
  "bc1qrv0hlk9sdq0ayv7pj49ef3mpzcqywftls9ma74",
  "bc1phk80v83vqyrmkvqd8kf4s0sye38067fytews4dmxww5jkyn4jcfqgp7ylh",
  "3EgTxWXa6sBkjsQzgYJWL4YQfv2FwvgH9X",
  "bc1pr8z23kwh9c5vjcyn4p6qcngd070uclpaxmwagl6qk47lts3na6esj30fj5",
  "bc1ppjm92vm2wury5ajpkprc8lsnlya9v30cn7utuzsezh7syernv93q636lwq",
  "bc1pv9qhrfwy2thgx92aqxhcsk5kdwt23wnn3qnpdcrgrgzfz87j3t0sp8vxaf",
  "bc1pja55ngn487s6qtct8asfnuq0gqdusrqnrjakf6raevls8plukj6sfy5ta0",
  "bc1phdhlj7w9kukqclmphrts2mwt5lgf7ljdqxal6yqyhjz3jcua2zespmg8ss",
  "bc1p72a3n0uv5alv3fa8a6mhz267wvp8fjef0ltvy24c047sdlduzg9s633vzf",
  "bc1pcmkdjzlyhdpky23h82kccv6hta8fytl9l7djppv40untj5rctgpsqhlr6m",
  "bc1p2gnpkkruaz4kkr63m58gaqc9xqfzsnhnlr5fcxgampwt33c59tssfca297",
  "32c8KqnFJsPnzfpgPKFzDsKaVuuqfnjcWP",
  "bc1q9nud20xvnxf4uxmtk5cpdxyjdlqvxggslp55tv",
  "bc1qg36lu9vqhrtk2zmg8m6yshtqcltfgevtvcntpf",
  "bc1pqjsltkxr3ktfes42rs4v2yvztrwvwqqpaltpga5ne8cg28fsvy0qjdmnuz",
  "bc1p2puskzmne9qhkah8unwc0ns6jdemsrqgmn5m0zhfqn7373a5cvgs7e03ft",
  "bc1p3n9nrshusc49940amhlwfhzte97kmv488c9j9khnhrkvmkksh3ase09c0c",
  "bc1pz2fp8y983mw9ljkvh90rkg8n9jdvycy7vgre4y5lgq6ushx2374qt2hlv4",
  "bc1pnp0e4pp3dwk46j9sqhexy5ezsw622zhht7dtesgctp5u90600rtq0ftdvd",
  "bc1phtmdus64vkpeq0cwm6uyn79q8y4ap588j99r5fx6p46m43d438zq8t9czc",
  "bc1pg4lwyw9uvx0zc70ydg9xvvdtz90k5ketmerzc8kfjczt7c357leq0cq6my",
  "bc1pxpz6tpa5gyxj7djlgyss54q7uag2qlfcf94tj5f9z6x8n7unf9tqx8m9ek",
  "bc1ps84dkgp50j3j83j6dejq6d5h2lf3yhunyunt9n4e9d9g4cr30h6qvfulsd",
  "bc1p78mqul97mhtkch8lnc9mqu68nl7ph659ye37sku8q8z2y88j2w2q20f3wd",
  "bc1pey55x43fvqg5q6t2ez3mazy27cc3u2vyzllclkr08p6qj0l2nz9qlr9udv",
  "bc1qsc8d9h9fa0np9t702nd04fv6ua38jarec952fq",
  "bc1qdjr30mvpxk7anktg2qhacmnyfz8p7dplrctvg9",
  "bc1qjak29qprazrve4ju7ltpjg92vyvm5jg33eaptg",
  "bc1paynmdy58wmu8z02x3n4ryzj20nchstgkw83u3cz6dp63u3apkdss7x2elu",
  "bc1pyrqhj87qmpnd9dcvjpv0chrw6swwsp7dn7zamn9fr5x669uy85us99k2vh",
  "bc1pnfqa4j0ls798ndt9ahmtk93efex0yvy3d8eyrtaz9rpy8xu6gllsqqshtm",
  "bc1pk5lsuuzl3km6y4jckh9q3fnyqpmt9vkce4am49vqjrqcsca6wfps2qtrhq",
  "bc1p5zqsrmwem89yj2zdqdmapgpxfra0mkpgtvwthxpmy6zw4x2xfhwsst5usk",
  "bc1pjuxsewcgr6n4m0c5vrv862zk7df5cx7l9kc4ludl3y7fwhql9unq24gwnw",
  "bc1pxm2pmmp0smwnz2e6qrz8dq8457tc72mn267trpwratsnmhqc6rssg982vq",
  "bc1p0qzt4qyh2430u07ylne92wrz3qev69k8nckx854cpvk4qy00pddslk3zqn",
  "bc1px0y9ltr37wqrh4z8jrakt0jl3q5hrq7dgq6kdugymfdrvq4v8jfsrm8fsf",
  "bc1pqztla4qtlnh35l8l2z5t235vk98a0d7ex3cs6g80pgw0tzpk3yzqh9l4rl",
  "bc1ptgdlzfu3f6dkmuqeawd8s7veuluxg0d84zu9grzsesqy2t9rz56sd44hcn",
  "bc1pwauu0hvwq8e0eh4lvua6tl8mcjxq3jrw3yvtzsnp54ce3rqxxm2qgjd5q6",
  "bc1p32phtl6xvm863w38ae9jvexgz4ymj0p3a7n97kr6u5qefeuph2dsw7e32g",
  "bc1pnan5mnflg76tzyqd4fwdctx2mqkyehqj7vdhhrtd85m6lk7hkwssadr55p",
  "bc1pn48sseyq4pgamzhjjzl499npqtt9g6f6ty97mcwug5rezpup3kcqcysqh2",
  "bc1p5k2arkutunj27f25rzu3g36djx7p66wk9x4p7u3elz90cv23e6gswrr5wv",
  "bc1pqwadjqpkzlk39l5s4mpfyhmggglj954mfadq0n4z4f6hzw78ssgqdp9pns",
  "bc1pgx0ylvumht2rr0gla2jztjxe4vvlr4gx2ljy3rzz3qvxkp0krpdqa92r0z",
  "bc1pxrnm9fv8n3scyc04l6pae8lw09fl72gjqj6v5rmnljazue4t647sswcczs",
  "bc1ptxfpwdu2v6u2mv406fttdqzxec4deyn2f8xhqtz9taqh7gpmwyhqhyfd4x",
  "bc1pn5st5hvnkm2dat5k4zk4hfp5vv5faal8myc9jgsa25n6d6f2cg5qw4k3sh",
  "bc1peya8yhfwr4zrmtak9s9wnkszmcqv24xcty8z3htxp52a704gvx2q4p5nyj",
  "bc1phuuwree36mtln9zkruxh44tm0jrrep4ft2rvrmcngw3jtjjmhtfsdzm5hn",
  "bc1pukd47ckam6phnvfc805zy7at8msvk4dg2sk4alz0ka9n4z4v55ds9zum3q",
  "bc1pk37ygem8exv6yrkpfmlqn02tczg5xw36adaxrc9fhcx4uu8el5dqmk0zn6",
  "bc1ph035m5k52ceuazm5vn99g5nurymg0p66dfmhn8dmrzg8lay7z6aq2tlysz",
  "bc1p5mutrqm7dhy0ukqr0etfnury82nn9tnerruun96qgydjhp7aam4qdgafg5",
  "bc1p05v07pjhkd4uvzgn6qf8l68jc9xmpclyka5glejgzrk38u5qkk5safqymp",
  "bc1pz9h56x99etaevry8wq4edx3xkvq75plwkec63zy970s3x07k72ds5j4nt2",
  "bc1p5fqgh94ngea0hqwzns4umzasvy5eelgv4cxv4leuz0zzpl5lnsnsu6hjh3",
  "bc1p97r3fpjxhumntcrvjyshwaths389a4ajuxuz9590ejy9wu22h8xqcuytkw",
  "bc1p2ls0r4vmjffpzp58x8as8upzhydfu38nzcpvw7ryzwsh876zg3ks6rxs5x",
  "bc1py5ej4zfw9szzgdla5s5gmxctwxztq5th8plmh9mljj72736hd3vs8fj3lp",
  "bc1pg4ux4pqcl9vn8pdxz4c48quxvx28tq6u5gkvwrlmp9gq9uzpjavqy0t44c",
  "bc1ptl97qu2a0lyn9tkgqsrus4yn7d6x6zdcvmsfh683rq0xryfs3fus4lfx39",
  "bc1p3md9a9l5asjymznfxe5zn5vmpq540nrad2j503m588eztkjjz63qsny88q",
  "bc1pmw7dyhnqtwm8lqv6qn0l9l2e6xdgl8fk70fxjq2sx3tfuungvszsydlfc6",
  "bc1pw9ezjjch93w44nycsa20vamktjncxhh0u6l67xe2k4u7xt4l0m8qdfx3an",
  "bc1p09dw6qu000p7wmqzn2twajd4d66v9dsx4xfs8rns8x3wuyqju98sksfdkx",
  "bc1p60rv2tmm7cgukzmfvte8unky3aquvaknj9nl2cav3amcqx76t6cqal4qx3",
  "bc1pzy289u9fwhw76sg7z54mkea6853nkutpz0xkhfy09rqhs3j86dtscc0xc9",
  "bc1pvuw4qe7aw7l20vpfzhreypur4mcsamt3d7cc3wqy0ctjkyaza2fsezqdte",
  "bc1pqxj0js20x7e78glpl3t4wfy8j8dy0z9458r397zlvewx4z67crjsdnjtzr",
  "bc1pct0vgwetvc06kf2eqzh8xmrzadzk7z55asy9v54rpvrxs8vqaetsllzxpg",
  "bc1p22gwtlkfmu7aln8y5xvf6ar7tkjg5tsf6l9lvaama20k2wkm72nqkhkvrh",
  "bc1pd5qd7lz89f7cukjygnpcnvx99faud0davj0vuc0fnvgwrvr8adxs9q93f0",
  "bc1ps9xyj2msad7wtx2wagt2emafvd4mgzp769qcyf7j97mrt6cq0pwqrmmlta",
  "bc1ph70zsehac7vgz4g0lsfjjsd6rjydv8pnttglmsv3jcy06jxw5ueqa88h50",
  "bc1psnz7qx6dc78w5px5mnntth6ve48ygry92k230hedkxqnysjfs0qqjugs74",
  "bc1p07x3pd0etr593svy7rx7d2y0r85wk8vjuf7540sh0z8dtd0xck4sjruj4d",
  "bc1phu7sp9gml0cefdpm3umys8e6tmnw5fyh5vnpmvaaaefzg5r54a4qs00c46",
  "bc1pf9ynryu60q64c6vvyzk4zqz8kvhszlpgg0ywlsac0wrg30gu35fsrxe343",
  "bc1p3vcx409eqxdgkq0k9fflsy7uxcv9arz8m69hvpdy8eck2pultlts903zxc",
  "bc1p6haw5uetpmhyvrhz4pff5v6jfzt8qrfc6d8vkvk7tkjlgw00ke3smh34hy",
  "bc1psrpq2w33vn2hepdfk0uhlj6w5qkeqdywkw2lptwr20h9766ezsastryvq6",
  "bc1pjkypwun9a4r2w46qak0tp65ek6whj8umevxvn9p2u3unx0r9dahqsj0l42",
  "bc1p44fjf3j4z7ua8m57yn7rjjwu9ttuehlv02ypfnzjxpauqwemff3sgcghnx",
  "bc1p85zk2rdy0fyy5zl2cudvt4k0kujxy3ne4w0tzswklwsxc9elyt8qzpucnz",
  "bc1p4r95zrz4lcclwen9s4v6fjf0la2dcggzadpzr0cfjsj7l6d5025sk3q6f6",
  "bc1pv0dl402gzw3mvpmjtl09xk54dqlv2npacpyql8uu3vafx9ymdseqmd0j72",
  "bc1pxwhlsryev05ymjhnnt7pxm5c6ysactjryjh2zt3xcwxtzwwnqtqsfkzl3j",
  "bc1pvups568jqm8ly93vyxrfddereakd92v73e2lx9rf478gsn4muycqm8uh4m",
  "bc1pw03daslq8923kfdpdlfrlc09pwwhh7amqjs6nldra48xdg5p4mcq2uxjeq",
  "bc1pklln39k7t8t072awqcrrnt4d7zzjay3r4yjgdl2s5qtvvy23tsas8586yu",
  "bc1pu7p6u9h9y8ec58p7e2qp9zcencu796jg22e5lu8unvjkpecdvyuqkmura0",
  "bc1p4m2qu95jumnl0hdpcv6wfrespapptvwu6vr0v0vh235gzct29kfs2hyt0r",
  "bc1p2e9nsgphlr38trayv0w0fk9qvfaugkre8tstx42wmexke2ahf3kqt4nq9p",
  "bc1ps5z3w8l7j3p0d4zupgsw9day6r3jcak5kfuzs6kf4jfrjwunkpyqsnp6xq",
  "bc1ptsl5gn8q7pz9vdjk4uutykvyp9fralla0g2j3pxa89u0mpacxr8sj5dn07",
  "bc1qp4683h40lqxcpf9dmzzlw8d67cnmevjufedxwq",
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

  if (type == 1 && (totalBuy > 0.077 || totalBuy * 1 + amount * 1 > 0.077)) {
    res.send({
      msg: "Have exceeded the limit",
      code: 0,
    });
    return;
  }

  if (type == 2 && (totalBuy > 0.577 || totalBuy * 1 + amount * 1 > 0.577)) {
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
