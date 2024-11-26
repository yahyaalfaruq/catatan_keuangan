
import express from "express";
import pool from "../db";

const router = express.Router();

// Get All Records
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM catatan_keuangan");
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
});

// Get Record by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM catatan_keuangan WHERE id = $1", [id]);
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
});

// Create Record
router.post("/", async (req, res) => {
  try {
    const { tanggal, keterangan, pemasukan, pengeluaran } = req.body;
    const result = await pool.query(
      "INSERT INTO catatan_keuangan (tanggal, keterangan, pemasukan, pengeluaran) VALUES ($1, $2, $3, $4) RETURNING *",
      [tanggal, keterangan, pemasukan, pengeluaran]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
});

// Update Record
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { tanggal, keterangan, pemasukan, pengeluaran } = req.body;
    const result = await pool.query(
      "UPDATE catatan_keuangan SET tanggal = $1, keterangan = $2, pemasukan = $3, pengeluaran = $4 WHERE id = $5 RETURNING *",
      [tanggal, keterangan, pemasukan, pengeluaran, id]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
});

// Delete Record
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM catatan_keuangan WHERE id = $1", [id]);
    res.json({ message: "Record deleted successfully" });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
});

export default router;