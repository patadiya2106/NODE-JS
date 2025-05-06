const admin = require('../models/adminModel');
const nodemailer = require('nodemailer');
const fs = require('fs');


const loginPage = (req, res) => {
    try {
        if (req.cookies.admin == undefined) {
            res.render('login');
        } else {
            res.redirect('/dashbord');
        }
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
};

const logout = (req, res) => {
    res.clearCookie('admin');
    res.redirect('/');
};


const losspassword = (req, res) => {
    res.render('losspassword');
}


const checkEmail = async (req, res) => {
    console.log(req.body);
    try {
        const email = req.body.email;
        const data = await admin.findOne({ email: email });
        console.log(data);
        if (data) {
            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                service: "gmail",
                secure: false,
                auth: {
                    user: "rahulpatadiya07@gmail.com",
                    pass: "elyiecppuhrbpfnk",
                },
            });

            let otp = Math.floor(Math.random() * 900000000);
            const mail = {
                from: '"Admin Panel" rahulpatadiya07@gmail.com',
                to: "nencymaisuriya@gmail.com",
                subject: "OTP Verification - Password Recovery",
                html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                  <div style="max-width: 500px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); padding: 30px;">
                    <div style="text-align: center;">
                      <img src="https://www.example.com/logo.png" alt="Logo" style="width: 100px; margin-bottom: 20px;">
                    </div>
                    <h2 style="color: #333333; font-size: 24px;">Password Recovery OTP</h2>
                    <p style="color: #555555; font-size: 16px; line-height: 1.6;">
                      Hi there, <br><br>
                      We received a request to reset your password. To continue with the process, please use the OTP below:
                    </p>
                    <div style="background-color: #ffffff; border: 1px solid     background-color: #337ab7;
; padding: 15px; text-align: center; font-size: 28px; font-weight: bold; color: #007bff; margin: 30px 0; border-radius: 5px;">
                      ${otp}
                    </div>
                    <p style="color: #555555; font-size: 16px; line-height: 1.6;">
                      If you did not request this, you can ignore this email. <br><br>
                      For your security, do not share this OTP with anyone.
                    </p>
                    <div style="text-align: center; margin-top: 30px;">
                      <p style="color: #777777; font-size: 14px;">&mdash; Admin Panel Team</p>
                    </div>
                  </div>
                </div>
                `
            };
            

            console.log("OTP sent: ", otp);

            console.log("OTP  send: ", mail.message);

            try {
                let information = await transporter.sendMail(mail);
                console.log("OTP sent: ", information.response);

                res.cookie('otp', otp);
                res.cookie('email', email);
                res.render('otppage');
            } catch (error) {
                console.log("Error sending OTP: ", error);
                res.redirect('/losspassword');
            }
        } else {
            res.redirect('/losspassword');
        }
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
}


const checkOtp = (req, res) => {
    console.log(req.body);
    console.log(req.cookies.otp);
    try {
        if (req.body.otp == req.cookies.otp) {
            res.redirect('/newSetPassword');
        } else {
            res.redirect('back');
            console.log("otp has not matched...");
        }
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
}

const newsetpassword = (req, res) => {
    res.render('newSetPassword');
}

const checknewpassword = async (req, res) => {
    console.log(req.body);
    try {
        if (req.body.newPassword == req.body.confimPassword) {
            const email = req.cookies.email;
            const data = await admin.findOne({ email: email });
            if (data) {
                const updatepassword = await admin.findByIdAndUpdate(data.id, { password: req.body.newPassword });
                if (updatepassword) {
                    console.log("password Updated.");
                    res.clearCookie('email');
                    res.clearCookie('otp');
                    res.redirect('/');
                }
                else {
                    console.log("password not update");
                    res.redirect('back')
                }
            }
            else {
                console.log("new password and confim password is not match");
                res.redirect('back');
            }
        }
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
}

const userChecked = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await admin.findOne({ email: email });
        if (user) {
            if (user.password == password) {
                console.log("Login Successfully...");

                res.cookie('admin', user);
                res.cookie('loginSuccess', 'true', { maxAge: 60000 });

                res.redirect('/dashbord');
            } else {
                console.log("Password not matched.");
                res.redirect('/');
            }
        } else {
            console.log("Email not matched");
            res.redirect('/');
        }
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }
};

const changePassword = (req, res) => {
    try {
        const currentAdmin = req.cookies.admin;
        if (currentAdmin != undefined) {
            res.render('changepassword', { currentAdmin });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
}

const changemypassword = async (req, res) => {
    console.log(req.body);
    try {
        const { oldpassword, newpassword, confimpassword } = req.body;
        const adminData = req.cookies.admin;

        if (oldpassword === adminData.password) {
            if (newpassword !== adminData.password) {
                if (newpassword === confimpassword) {
                    try {
                        const isUpdate = await admin.findByIdAndUpdate(adminData._id, { password: newpassword });
                        if (isUpdate) {
                            console.log("Password updated...", isUpdate);
                            res.clearCookie('admin');
                            res.redirect('/');
                        } else {
                            console.log("Password not updated");
                            res.redirect('/changepassword');
                        }
                    } catch (e) {
                        res.send(`<h2> Not Found : ${e} </h2>`);
                    }
                } else {
                    res.redirect('/changepassword');
                }
            } else {
                res.redirect('/changepassword');
            }
        } else {
            console.log("Password is incorrect");
            res.redirect('/changepassword');
        }
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
}

const viewProfile = (req, res) => {
    try {
        const currentAdmin = req.cookies.admin;
        if (currentAdmin != undefined) {
            res.render('profile', { currentAdmin });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
}

const updateProfile = async (req, res) => {
    try {
        const currentAdmin = req.cookies.admin;
        res.render('updateprofile', { currentAdmin });
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
};

const editProfile = async (req, res) => {
    const currentAdmin = req.cookies.admin;
    const id = currentAdmin._id;
    console.log("Id", id);
    console.log("Profile Page", req.body);
    try {
        const updatedAdmin = await admin.findByIdAndUpdate(id, req.body);
        console.log("Updated Data : ", updatedAdmin);
        if (updatedAdmin) {
            res.cookie('admin', updatedAdmin);
            res.redirect('/dashbord');
        } else {
            res.redirect('/updateprofile');
        }
    } catch (error) {
        res.send(`<h2> Not found: ${error} </h2>`);
    }
};


// dashboard page
const DashbordPage = (req, res) => {
    try {
        if (!req.cookies.admin) {
            res.redirect('/')
        };
        const currentAdmin = req.cookies.admin;
        const loginSuccess = req.cookies.loginSuccess;
        res.clearCookie('loginSuccess');
        res.render('dashbord', { currentAdmin, loginSuccess });
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
};

// add admin page
const addAdminPage = (req, res) => {
    try {
        if (req.cookies.admin == undefined) {
            res.redirect('/');
        } else {
            const currentAdmin = req.cookies.admin;
            const adminSuccess = req.cookies.adminSuccess;
            res.clearCookie('adminSuccess');
            res.render('addAdmin', { currentAdmin, adminSuccess });
        }
    } catch (error) {
        res.send(`<h2> Not found : ${error.message} </h2>`);
    }
};

// view admin table
const viewAdminPage = async (req, res) => {
    try {

        let records = await admin.find({});
        const currentAdmin = req.cookies.admin;
        records = records.filter((data) => data.id != currentAdmin._id);
        if (req.cookies.admin == undefined) {
            return res.render('login');
        }
        res.render('viewAdmins', { records, currentAdmin});
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
};


// insert admin
const insertAdmin = async (req, res) => {
    try {
        req.body.avatar = req.file.path;
        const insert = await admin.create(req.body);
        if (insert) {
            console.log('admin data inserted..')
        }
        else {
            console.log('admin data not inserted..')
        }
        res.cookie('adminSuccess', true);
        res.redirect('/addAdmin');
    } catch (error) {
        res.send(`<h2> not found : ${error} </h2>`);
    }
};

// delete admin
const DeleteAdmin = async (req, res) => {
    const DeleteId = req.params.DeleteId;
    try {
        const data = await admin.findByIdAndDelete(DeleteId);
        if (data && data.avatar) {
            fs.unlinkSync(data.avatar);
        }
        res.redirect('/viewAdmin');
    } catch (error) {
        res.send(`<h2> not found : ${error} </h2>`);
    }
};

// update admin form
const UpdateAdmin = async (req, res) => {
    const UpdateId = req.query.id;
    try {
        const data = await admin.findById(UpdateId);
        if (data) {
            const currentAdmin = req.cookies.admin;
            res.render('updateadmin', { data, currentAdmin });
        } else {
            res.redirect('/viewAdmin');
        }
    } catch (error) {
        res.send(`<h2> Not found: ${error} </h2>`);
    }
};

// edit admin post
const editAdmin = async (req, res) => {
    const editId = req.params.editId;
    try {
        const data = await admin.findById(editId);

        if (req.file) {
            if (data.avatar)
                fs.unlinkSync(data.avatar);
            req.body.avatar = req.file.path;
        } else {
            req.body.avatar = data.avatar;
        }

        await admin.findByIdAndUpdate(editId, req.body);
        res.redirect('/viewAdmin');
    } catch (error) {
        res.send(`<h2> Not found: ${error} </h2>`);
    }
};

module.exports = {
    loginPage,
    logout,
    userChecked,
    losspassword,
    checkEmail,
    checkOtp,
    newsetpassword,
    checknewpassword,
    changePassword,
    changemypassword,
    viewProfile,
    updateProfile,
    editProfile,
    DashbordPage,
    addAdminPage,
    viewAdminPage,
    insertAdmin,
    DeleteAdmin,
    UpdateAdmin,
    editAdmin,
};