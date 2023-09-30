import nodemailer from 'nodemailer'

export async function sendEmailServices({
        to,
        subject,
        message,
        attachments=[],
} ={}) {
    const transporter = nodemailer.createTransport({
        host:'localhost', // if fail => stmp.gmail.com
        port: 587,  //587, 465
        secure: false, //false, true
        service:'gmail', //optional
        auth:{
            user:'eslamhussin600@gmail.com',
            pass:'babdbgcekhckgqpk',
        },
        // tls:{
        //     rejectUnauthorized:false
        // } لو وانت بتبعت ايميلز فجأة وقف 

    })

    const emailInfo = await transporter.sendMail({
        from:'"El 3AW 👻" <eslamhussin600@gmail.com>',
        to: to ? to : '',
        subject: subject ? subject : 'HELLOW',
        html: message ? message : '',
        attachments, 
    })
    console.log(emailInfo);
    if(emailInfo.accepted.length){
        return true
    }
    return false
} 