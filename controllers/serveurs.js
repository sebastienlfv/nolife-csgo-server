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

module.exports.getInfoRetake1 = async (req, res) => {
  try {
    const ip = '149.202.87.104:27040'
    const infoResponse = await queryGameServerInfo(ip)
    const infoResponseStr = bigIntToString(infoResponse)
    res.json(infoResponseStr)
  } catch (error) {
    console.error(err)
    res.status(500).json({ err: 'Une erreur s\'est produite' })
  }
}

module.exports. getPlayerRetake1 = async (req, res) => {
  try {
    const ip = '149.202.87.104:27040'
    const playerResponse = await queryGameServerPlayer(ip)
    const playerResponseStr = bigIntToString(playerResponse)
    res.json(playerResponseStr)
  } catch (err){
    console.error(err)
    res.status(500).json({ err: 'Une erreur s\'est produite' })
  }
}

module.exports.getInfoFfa1 = async (req, res) => {
  try {
    const ip = '149.202.87.104:27015'
    const infoResponse = await queryGameServerInfo(ip)
    const infoResponseStr = bigIntToString(infoResponse)
    res.json(infoResponseStr)
  } catch (error) {
    console.error(err)
    res.status(500).json({ err: 'Une erreur s\'est produite' })
  }
}

module.exports. getPlayerFfa1 = async (req, res) => {
  try {
    const ip = '149.202.87.104:27015'
    const playerResponse = await queryGameServerPlayer(ip)
    const playerResponseStr = bigIntToString(playerResponse)
    res.json(playerResponseStr)
  } catch (err){
    console.error(err)
    res.status(500).json({ err: 'Une erreur s\'est produite' })
  }
}

module.exports.getInfoFfa2 = async (req, res) => {
  try {
    const ip = '149.202.87.104:27018'
    const infoResponse = await queryGameServerInfo(ip)
    const infoResponseStr = bigIntToString(infoResponse)
    res.json(infoResponseStr)
  } catch (error) {
    console.error(err)
    res.status(500).json({ err: 'Une erreur s\'est produite' })
  }
}

module.exports. getPlayerFfa2 = async (req, res) => {
  try {
    const ip = '149.202.87.104:27018'
    const playerResponse = await queryGameServerPlayer(ip)
    const playerResponseStr = bigIntToString(playerResponse)
    res.json(playerResponseStr)
  } catch (err){
    console.error(err)
    res.status(500).json({ err: 'Une erreur s\'est produite' })
  }
}