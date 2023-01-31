"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailer_1 = require("../config/mailer");
class MailService {
    send(mail) {
        return new Promise((resolve, reject) => {
            mailer_1.transport.sendMail({
                from: '"🕹 Gamezonia Online Shop 🕹" <tiendaonlineguillermo@gmail.com>',
                to: mail.to,
                subject: mail.subject,
                html: mail.html,
            }, (error, _) => {
                (error) ? reject({
                    status: false,
                    message: error
                }) : resolve({
                    status: true,
                    message: 'Email correctamente enviado a ' + mail.to,
                    mail
                });
            });
        });
    }
}
exports.default = MailService;
