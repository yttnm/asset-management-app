const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Create an asset
app.post('/assets', async (req, res) => {
    try {
        const { name, purchase_date, purchase_price, asset_type, notes } = req.body;
        const newAsset = await pool.query(
            "INSERT INTO assets (name, purchase_date, purchase_price, asset_type, notes) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [name, purchase_date, purchase_price, asset_type, notes]
        );        
        
        console.log("Inserted new asset: ", newAsset.rows[0]);  // 追加
        res.json(newAsset.rows[0]);
    } catch (err) {
        console.error(err.message);  // 追加
    }
});

// Get all assets
app.get('/assets', async (req, res) => {
    try {
        const allAssets = await pool.query("SELECT * FROM assets");
        
        console.log("Fetched all assets: ", allAssets.rows);  // 追加
        res.json(allAssets.rows);
    } catch (err) {
        console.error(err.message);  // 追加
    }
});

// Delete an asset
app.delete('/assets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAsset = await pool.query("DELETE FROM assets WHERE id = $1", [id]);
        
        console.log("Deleted asset with ID: ", id);  // 追加
        res.json("Asset was deleted!");
    } catch (err) {
        console.error(err.message);  // 追加
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");  // 追加
});

// Update an asset
app.put('/assets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updateAsset = await pool.query(
            "UPDATE assets SET name = $1 WHERE asset_id = $2",
            [name, id]
        );
        
        console.log("Updated asset with ID: ", id);  // 追加
        res.json("Asset was updated!");
    } catch (err) {
        console.error(err.message);  // 追加
    }
});
