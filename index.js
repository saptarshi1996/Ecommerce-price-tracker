const server = require('./setup/app');

const PORT = process.env.PORT || 8443;
const HOST = process.env.HOST || '0.0.0.0';
server.listen(PORT, HOST, () => console.log(`Server on PORT ${PORT}`));

require('./setup/io');
