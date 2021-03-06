const fs = require('fs');
const path = require('path');
const { op } = require('./main');
op.initialize({ name: "now.sh", readConfig });

module.exports = async (req, res) => {
    try {
        let r = await op.handleRaw(req.method, req.url, req.headers, req.body, req.headers['x-real-ip'], '', req.query, req.cookies);
        res.writeHead(r.statusCode, r.headers);
        res.write(r.body);
        res.end();
    } catch (error) {
        console.log(error);
        res.writeHead(500, {});
        res.write("error");
        res.end();
    }
}

async function readConfig() {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config.json'), 'utf8'));
}