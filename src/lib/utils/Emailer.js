import mailjet from 'node-mailjet';
import { AppConfig } from '$lib/config/appConfig.js';

// Initailize with Sendgrid API Key
// sgMail.setApiKey(config.email.mailjetKey);

export class Emailer {
	/* Create a standard email message */
	static async createMessage(fromAddr, toAddrArr, subject, textContent, htmlContent, customId) {
		return {
			From: fromAddr,
			To: toAddrArr,
			Subject: subject,
			TextPart: textContent,
			HTMLPart: htmlContent,
			CustomID: customId || 'PasswordReset'
		};
	}

	static async sendMail(fromName, fromEmail, toName, toEmail, subject, htmlBody) {
		const message = await Emailer.createMessage(
			{ Name: fromName, Email: fromEmail },
			[{ Name: toName, Email: toEmail }],
			subject,
			'You need HTML viewer to read this email',
			htmlBody,
			'Default'
		);
		//console.log('Sending Message ' + JSON.stringify(message));
		return await Emailer.sendMails([message]);
	}

	/* Send mail to multiple addresses  */
	static async sendMails(messageArr) {
		let mailer = mailjet.connect(AppConfig.email.mailjetKey, AppConfig.email.mailjetSecret);
		const request = mailer.post('send', { version: 'v3.1' }).request({
			Messages: messageArr
		});
		return request;
	}
}
