const { queryGameServerInfo, queryGameServerPlayer } = require('steam-server-query')


// convert BigInt to string recursively in an object
function bigIntToString(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'bigint') {
      obj[key] = obj[key].toString()
    } else if (typeof obj[key] === 'object') {
      obj[key] = bigIntToString(obj[key])
    }
  }
  return obj
}

const getServerInfo = async (req, res, ip) => {
  try {
    const infoResponse = await queryGameServerInfo(ip)
    const infoResponseStr = bigIntToString(infoResponse)
    res.json(infoResponseStr)
  } catch (error) {
    console.error(err)
    res.status(500).json({ err: 'Une erreur s\'est produite' })
  }
}

const getPlayerInfo = async (req, res, ip) => {
  try {
    const playerResponse = await queryGameServerPlayer(ip)
    const playerResponseStr = bigIntToString(playerResponse)
    res.json(playerResponseStr)
  } catch (err){
    console.error(err)
    res.status(500).json({ err: 'Une erreur s\'est produite' })
  }
}


// RETAKE

module.exports.getInfoRetake1 = async (req, res) => {
  const ip = '149.202.87.104:27040'
  await getServerInfo(req, res, ip)
}

module.exports.getPlayerRetake1 = async (req, res) => {
  const ip = '149.202.87.104:27040'
  await getPlayerInfo(req, res, ip)
}

module.exports.getInfoRetake2 = async (req, res) => {
  const ip = '149.202.87.104:27043'
  await getServerInfo(req, res, ip)
}

module.exports.getPlayerRetake2 = async (req, res) => {
  const ip = '149.202.87.104:27043'
  await getPlayerInfo(req, res, ip)
}

module.exports.getInfoRetake3 = async (req, res) => {
  const ip = '149.202.87.104:27046'
  await getServerInfo(req, res, ip)
}

module.exports.getPlayerRetake3 = async (req, res) => {
  const ip = '149.202.87.104:27046'
  await getPlayerInfo(req, res, ip)
}

module.exports.getInfoRetake4 = async (req, res) => {
  const ip = '149.202.87.104:27049'
  await getServerInfo(req, res, ip)
}

module.exports.getPlayerRetake4 = async (req, res) => {
  const ip = '149.202.87.104:27049'
  await getPlayerInfo(req, res, ip)
}

module.exports.getInfoRetake5 = async (req, res) => {
  const ip = '149.202.87.104:27052'
  await getServerInfo(req, res, ip)
}

module.exports.getPlayerRetake5 = async (req, res) => {
  const ip = '149.202.87.104:27052'
  await getPlayerInfo(req, res, ip)
}




// FFA

module.exports.getInfoFfa1 = async (req, res) => {
  const ip = '149.202.87.104:27015'
  await getServerInfo(req, res, ip)
}

module.exports.getPlayerFfa1 = async (req, res) => {
  const ip = '149.202.87.104:27015'
  await getPlayerInfo(req, res, ip)
}

module.exports.getInfoFfa2 = async (req, res) => {
  const ip = '149.202.87.104:27018'
  await getServerInfo(req, res, ip)
}

module.exports.getPlayerFfa2 = async (req, res) => {
  const ip = '149.202.87.104:27018'
  await getPlayerInfo(req, res, ip)
}

module.exports.getInfoFfa3 = async (req, res) => {
  const ip = '149.202.87.104:27021'
  await getServerInfo(req, res, ip)
}

module.exports.getPlayerFfa3 = async (req, res) => {
  const ip = '149.202.87.104:27021'
  await getPlayerInfo(req, res, ip)
}

// HSMOD

module.exports.getInfoHsMod1 = async (req, res) => {
  const ip = '149.202.87.104:27100'
  await getServerInfo(req, res, ip)
}

module.exports.getPlayerHsMod1 = async (req, res) => {
  const ip = '149.202.87.104:27100'
  await getPlayerInfo(req, res, ip)
}

module.exports.getInfoHsMod2 = async (req, res) => {
  const ip = '149.202.87.104:27103'
  await getServerInfo(req, res, ip)
}

module.exports.getPlayerHsMod2 = async (req, res) => {
  const ip = '149.202.87.104:27103'
  await getPlayerInfo(req, res, ip)
}