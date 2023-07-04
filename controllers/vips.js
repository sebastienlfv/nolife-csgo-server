const express = require('express');
const { QueryTypes } = require('sequelize');
const { sequelizeCsgoVip } = require('../config/db');

module.exports.getVips = async (req, res) => {
  try {
    const vips = await sequelizeCsgoVip.query('SELECT * FROM vips', { type: QueryTypes.SELECT });
    res.json(vips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while retrieving data' });
  }
}
