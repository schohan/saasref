import Autolinker from 'autolinker';
import Filter from 'bad-words';
import _ from 'lodash';

const filter = new Filter();

export const TextProcessor = {
	warnText: `<p class="text-error"> WARNING: Do not use bad words. Your account will be deleted if you continue to do so.</p>`,

	setWarningText(newWarn) {
		this.warnText = newWarn;
	},

	autoLink(inpText) {
		if (_.isEmpty(inpText)) return inpText;
		// Replace porn links with empty string
		var matches = Autolinker.parse(inpText, {
			urls: true
		});
		let processedText;
		let hasBadDomain = false;
		matches.forEach((m) => {
			// console.log('m.getUrl() ' + m.getUrl());
			if (this.hasPorn(m.getUrl())) {
				hasBadDomain = true;
				return;
			}
		});
		if (hasBadDomain) {
			processedText = this.warnText;
		} else {
			processedText = inpText;
		}

		return Autolinker.link(processedText, {
			truncate: { length: 32, location: 'middle' },
			className: 'link'
		});
	},

	stripBadwords(inpText, addWarnText = false) {
		if (_.isEmpty(inpText)) return inpText;
		let newText = filter.clean(inpText);
		if (newText !== inpText && addWarnText) {
			newText += this.warnText;
		}
		return newText;
	},

	// TODO implement this
	hasPorn(domain) {
		return false;
	},

	linkAndClean(inpText) {
		if (_.isEmpty(inpText)) return inpText;
		const cleanText = this.stripBadwords(inpText, true);
		return this.autoLink(cleanText);
	}
};

// console.log('TextProcessor = ' + TextProcessor.linkAndClean('shitty text'));
