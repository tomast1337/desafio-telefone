import { Router } from "express";
import Phone, { IPhone } from "../models/phone";
import "../models/phone";

const router = Router();

router.get("/:page/:limit", async (req, res) => {
  const page = parseInt(req.params.page);
  const limit = parseInt(req.params.limit);
  const skip = (page - 1) * limit;
  const phones = await Phone.find().skip(skip).limit(limit);
  res.json(phones);
});

router.post("/", async (req, res) => {
  const phone = new Phone(req.body);
  await phone.save();
  res.json(phone);
});

router.get("/:id", async (req, res) => {
  const phone = await Phone.findById(req.params.id);
  res.json(phone);
});

router.put("/:id", async (req, res) => {
  const phone = await Phone.findByIdAndUpdate(req.params.id, req.body);
  res.json(phone);
});

router.delete("/:id", async (req, res) => {
  const phone = await Phone.findByIdAndDelete(req.params.id);
  res.json(phone);
});

export default router;
