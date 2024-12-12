const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'User Information',
  password: '179328',
  port: 5432,
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM Tai_khoan WHERE tai_khoan = $1 AND mat_khau = $2',
      [username, password]
    );
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, password, name, address, phone } = req.body;
  try {
    await pool.query(
      'INSERT INTO KHACHHANG (ten, dia_chi, sdt, tai_khoan, mat_khau) VALUES ($1, $2, $3, $4, $5)',
      [name, address, phone, username, password]
    );
    res.json({ success: true, message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Change name ' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));