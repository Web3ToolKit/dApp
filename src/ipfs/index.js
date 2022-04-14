const ipfsClient = require('ipfs-http-client');
const projectId = '27me2Nt6JaHhHSnqeasHHikIMqq';
const projectSecret = '83c2fa5d6118512e94281fe39193a958';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

const dagOptions = {
    format: 'dag-cbor',
    hashAlg: 'sha2-256'
};

const uploadToIPFS = (payload) => {
    return new Promise((resolve, reject) => {
        let data = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64');
        client.dag.put(data, dagOptions).then((cid) => {
            resolve(cid.toString());
        }).catch((err) => {
            reject(err);
        });
    });
};

const getFromIPFS = (cid) => {
    return new Promise((resolve, reject) => {
        client.dag.get(cid).then((res) => {
            console.log("res" + res);
        let data = Buffer.from(res.value, 'base64').toString('utf-8');
            resolve(JSON.parse(data));
        }).catch((err) => {
            reject(err);
        });
    });
};

export { uploadToIPFS, getFromIPFS }
