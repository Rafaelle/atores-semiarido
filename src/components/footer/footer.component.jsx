import React from "react";
import styled from "styled-components";
import logoInsa from "../../assets/insa-logo.svg";
import logoMCTIC from "../../assets/logo_mctci.svg";
import govFederal from "../../assets/governo_federal.svg";
import { device } from "../../abstracts/variables";

const Footer = ({ color }) => {
	return (
		<FooterContainer color={color}>
			<FooterContent>
				<LogoContainer>
					<InsaContainer>
						<LogoInsa src={logoInsa} alt='Logo Insa'></LogoInsa>
					</InsaContainer>
					<LogoMCTIC src={logoMCTIC} alt='Logo mctic'></LogoMCTIC>
					<LogoGOV src={govFederal} alt='Logo gov'></LogoGOV>
				</LogoContainer>
			</FooterContent>
		</FooterContainer>
	);
};

export default Footer;

const FooterContainer = styled.div`
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 90%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: transparent;
	border-top: 3px solid white;

	@media ${device.mobileL} {
		background-color: ${({ color }) => (color ? color : "transparent")};
		transition: all 0.6s ease-in-out;
		width: 100%;
		transform: translateX(0);
		position: static;
	}

	background-color: ${({ active, color }) => (active ? color : "transparent")};
`;
const FooterContent = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	@media ${device.mobileL} {
		width: 100%;
		flex-wrap: nowrap;
	}
`;
const LogoContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: flex-end;
	flex-wrap: wrap;
	@media ${device.mobileL} {
		justify-content: center;
		flex-wrap: nowrap;
	}
`;
const InsaContainer = styled.div`
	display: flex;
	flex-grow: 2;
	font-family: "Roboto";
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	flex-wrap: wrap;
	@media ${device.mobileL} {
		align-items: center;
		flex-wrap: nowrap;
	}
`;
const InsaText = styled.span`
	color: var(--color-focus);
	font-size: 14px;
	font-weight: bold;
	@media ${device.mobileL} {
		font-size: 10px;
	}
`;
const InsaAdreess = styled.span`
	color: var(--color-focus);
	font-size: 12px;
	@media ${device.mobileL} {
		font-size: 8px;
	}
`;
const LogoInsa = styled.img`
	height: 2vmax;

	@media ${device.mobileL} {
		height: 30px;
	}
`;
const LogoMCTIC = styled.img`
	height: 3vmax;

	@media ${device.mobileL} {
		height: 40px;
	}
`;
const LogoGOV = styled.img`
	height: 3vmax;
	@media ${device.mobileL} {
		height: 40px;
	}
`;
