

exports.Admin = async (req,res,next)=>{

  const user = req.user;

  if(user.username ==='admin'){
    return res.status(200).send({ success: true, message: "admin" })
  }
  return res.status(200).send({ success: false, message: 'Not admin' })
   
}