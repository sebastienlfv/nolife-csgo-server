const { queryGameServerInfo } = require('steam-server-query')

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

module.exports.getRetake1 = async (req, res) => {
  try {
    const infoResponse = await queryGameServerInfo('149.202.87.104:27040')
    console.log(infoResponse);
    const infoResponseStr = bigIntToString(infoResponse)
    res.json(infoResponseStr)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Une erreur s\'est produite' })
  }
}