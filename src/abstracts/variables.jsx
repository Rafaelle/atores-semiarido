const size = {
	mobileS: "320px",
	mobileM: "375px",
	mobileL: "600px",
	tablet: "768px",
	laptop: "1024px",
	laptopL: "1440px",
	desktop: "1600px",
	desktopL: "2560px",
};

export const device = {
	mobileS: `(max-width: ${size.mobileS})`,
	mobileM: `(max-width: ${size.mobileM})`,
	mobileL: `(max-width: ${size.mobileL})`,
	tablet: `(max-width: ${size.tablet})`,
	laptop: `(max-width: ${size.laptop})`,
	laptopL: `(max-width: ${size.laptopL})`,
	desktop: `(max-width: ${size.desktop})`,
	desktopL: `(max-width: ${size.desktopL})`,
};

export const colors = {
	biodiversidade: {
		iconColor: "white",
		colorDark: "#306C63",
		colorLight: "#46B6B1",
	},
	"gestao-informacao": {
		iconColor: "white",
		colorDark: "#606062",
		colorLight: "#F58634",
	},
	desertificacao: {
		iconColor: "white",
		colorDark: "#Ae3336",
		colorLight: "#DC8F44",
	},
	"recursos-hidricos": {
		iconColor: "white",
		colorDark: "#52658C",
		colorLight: "#91D8F7",
	},
	"producao-animal": {
		iconColor: "white",
		colorDark: "#754C36",
		colorLight: "#faf174",
	},
	"producao-vegetal": {
		iconColor: "white",
		colorDark: "#4E5A62",
		colorLight: "#50BEA1",
	},
	mineralogia: {
		iconColor: "white",
		colorDark: "#847059",
		colorLight: "#E8C782",
	},
	default: {
		iconColor: "white",
		colorDark: "#52658c",
		colorLight: "#91d8f7",
	},
};
