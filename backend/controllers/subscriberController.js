import Subscriber from "../models/Subscriber.js";

export const subscribeUser = async(req,res)=>{
  try{
    const {email} = req.body;

    if(!email)
      return res.status(400).json({message:"Enter email"});

    const exists = await Subscriber.findOne({email});

    if(exists)
      return res.json({message:"Already joined MPACT ✨"});

    await Subscriber.create({email});

    res.json({message:"Welcome to MPACT 🚀"});
  }
  catch{
    res.status(500).json({message:"Server error"});
  }
};

export const getSubscribers = async(req,res)=>{
  const users = await Subscriber.find().sort({createdAt:-1});
  res.json(users);
};
