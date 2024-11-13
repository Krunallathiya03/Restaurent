const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")


// get user information
 const getUserController = async(req,res) =>{
       
       try{
              //find user
              const user = await userModel.findById(req.body.id);
               //validation
               if (!user) {
                     return res.status(404).send({
                       message: "User Not Found",
                     });
                   }

                   //response
                   res.status(200).send({
                     message: "User get Successfully",
                     user,
                   });
              
       }
       catch(error){
              res.status(400).send("Error in get user api..")
       }


 }


 //update user
 const updateUserController = async(req,res) =>{
       // try{
       //        //find user
       //        const user = await userModel.findById({_id:req.body.id})
       //        if(!user){
       //               res.status(404).send({message:"User not found"})
       //        }
              
       //        //update user
       //        const {username ,phone , address} = req.body
       //        if(username) user.username = username
       //        if(address)  user.address = address
       //        if(phone)    user.phone = phone

       //        //save user
       //        user.save()
       //        res.status(200).send({message:"user updated sucessgfully.....",user})
       // }
       // catch(error){
       //        res.status(400).send("Error in Update api",error)
       // }

       try {
              
              const { username, phone, address } = req.body;
      
              // Update user in one step with Mongoose
              const updatedUser = await userModel.findByIdAndUpdate(
                  req.body.id,
                  { username, phone, address }, // Only fields that are defined will be updated
                  { new: true } 
              );
      
              // Check if the user was found and updated
              if (!updatedUser) {
                  return res.status(404).send({ message: "User not found" });
              }
      
              // Respond with success message and the updated user data
              res.status(200).send({ message: "User updated successfully", user: updatedUser });
          } catch (error) {
              console.error(error);
              res.status(500).send({ message: "Error in Update API", error });
          }

 }


 //update password
 const updatePasswordController = async (req,res)=>{
       try{
              //find user
              const user = await userModel.findById(req.body.id)
              //validation
              if(!user){
                     res.status(404).send({message:"User not found.."})
              }

              //get data from user
              const{oldPassword,newPassword} = req.body;

              if(!oldPassword || !newPassword){
                     return res.status(500).send({message:"please provide old or new password.."})
              }

              //check password
              const isMatch = await bcrypt.compare(oldPassword, user.password)
              if(!isMatch){
                     return res.status(400).send({message:"invalid old password"})
              }
              

              //hasing the password
              const hash = await bcrypt.hash(newPassword,10)
              user.password=hash;
              //save the user
              await user.save();
              
              res.status(200).send({
                     message: "Password updated successfully",
                     user: {
                         id: user._id,
                         name: user.name,
                         email: user.email,
                         password:user.password,
                         address:user.address,
                         phone:user.phone
                     }
                 });


       }
       catch(error){
              res.status(500).send({message:"Error in updatepassword api"},error)
       }
 }


 //delete user
 const deleteUserController = async (req,res)=>{
       try{   
              const deleteuser = await userModel.findByIdAndDelete(req.params.id)
              res.status(200).send({message:"user delete Sucessafully",deleteuser})

       }
       catch(error){
              res.status(500).send({message:"User not deleted"})

       }
 }



 module.exports = {getUserController,
                   updateUserController,
                   updatePasswordController,
                      deleteUserController}