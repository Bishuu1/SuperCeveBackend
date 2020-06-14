const { Schema, model } = require('mongoose');


const userSchema = new Schema ({
    username: { 
      type: String,
      required: true,
      unique: true
    },
    password: { 
      type: String, 
      required: true,
      trim: true
    },
    name: String,
    rut: String,
    birthday: Date,
    scholarLink: String,
    accessLvl: Number,
});

userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
  
  module.exports = model("User", userSchema);