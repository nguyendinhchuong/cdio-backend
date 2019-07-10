const nodemailer = require("nodemailer");
const user = require('../../service/User/userService');

const senderEmail = 'cdio.fit.hcmus@gmail.com';
const pass = 'a!123456789';
const service = 'gmail';
const host = 'https://services.fit.hcmus.edu.vn:253/';

exports.sendMail = async (data) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: service,
        auth: {
            user: senderEmail,
            pass: pass
        }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: senderEmail, // sender address
        to: data.Email, // list of receivers
        subject: "Đăng ký thành công tài khoản hệ thống quản lý CDIO", // Subject line
        text: `Admin đã đăng ký thành công tài khoản cho ${data.Name} với:
        username: ${data.Username}
        password: ${data.Password}
Login tại ${host} để sử dụng hệ thống.` // plain text body
        // html: "<b>Hello world?</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
