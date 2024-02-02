export default (ext) => {
	switch (ext) {
		case 'js':
			return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg';
		case 'jsx':
			return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg';
		case 'svelte':
			return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg';
		case 'ts':
			return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg';
		case 'tsx':
			return '';
		case 'html':
			return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg';
		case 'css':
			return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg';
		case 'scss':
			'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg';
			return;
		case 'json':
			return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg';
		case 'php':
			return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg';
		case 'py':
			return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg';
		case 'java':
			return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-plain-wordmark.svg';
		case 'cpp':
			return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg';
		case 'c':
			return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg';
		case 'sql':
			return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg';
		default:
			return '';
	}
};
