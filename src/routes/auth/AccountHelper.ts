import { Emailer } from '$lib/utils/Emailer.js';

export class AccountHelper {
	/*
	 * Send a single activation email
	 *
	 * @param toName Name of recepients
	 * @param toEmail Email of recepients
	 */
	sendActivationMail(toName, toEmail) {
		const expDate = new Date();
		expDate.setHours(expDate.getHours() + config.authUrls.expAfterHours);

		const encStr = encodeURIComponent(
			await Encrypter.encrypt(toEmail + ';' + expDate.toISOString())
		);
		const activateUrl = `${config.authUrls.activateUrl}?token=${encStr}`;
		const fromName = 'OneSkool Admin',
			fromAddr = 'resetpassword@oneskool.com',
			subject = `Activate your account. Link expires in ${config.authUrls.expAfterHours} hours.`,
			htmlBody = `Hi ${toName}, 
				<p>
                Thanks for signing up at OneSkool.com. Before you can login, please  
                <a href=${activateUrl}'> click here </a> to verify your email address. 
                <p/>
                <p> If link doesn't work, you can copy/paste this URL in browser's address bar: </p>
                <p> ${activateUrl} </p>
                <p> Thank You
                </p><p> 
                Team OneSkool 
                </p>`;

		return await Emailer.sendMail(fromName, fromAddr, toName, toEmail, subject, htmlBody);
	}
}
