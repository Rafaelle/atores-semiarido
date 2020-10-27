import styled from "styled-components";
import { device } from "../../abstracts/variables";

export const ContainerChart = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	transition: all 0.6s ease;
	align-items: center;
	@media ${device.mobileL} {
		flex-direction: column-reverse;
		margin: 10px 0;
	}
`;

export const DonutsContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 10px;
	align-items: stretch;
	width: 90%;
	position: relative;
	transition: all 0.6s ease;
	border-radius: 10px;
	background-color: white;
	margin-top: 18px;
	@media ${device.mobileL} {
		margin-top: 0;
		margin-bottom: 15px;
		border-radius: 10px;
		border: 2px solid #dadce0;
		display: ${({ collapse }) => (collapse ? "none" : "flex")};
	}
	&:after {
		content: "";
		opacity: 1;
		display: block;
		position: absolute;
		top: -18px;
		left: 50%;
		transform: translateX(-50%);
		border-left: 18px solid transparent;
		border-right: 18px solid transparent;
		border-bottom: 18px solid white;
		@media ${device.mobileL} {
			top: 100%;
			border-left: 12px solid transparent;
			transition: left 0.6s ease;
			border-right: 12px solid transparent;
			border-top: 12px solid #dadce0;
			border-bottom: none;
			left: ${({ position }) => (position ? position : "50%")};

			/* left: 50%;
			transform: translateX(-50%); */
		}
	}
`;

export const DonutButtons = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	/* background-color: white; */
	border-radius: 8px 0 0 8px;
	padding: 5px 0;
	align-items: center;
	width: 50%;
`;
export const DonutItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	/* background-color: white; */
	border-radius: 0 8px 8px 0;
	padding: 5px 0;
	align-items: center;
	width: 50%;
`;

export const DonutTitle = styled.span`
	color: ${({ color }) => (color ? color : "white")};
	width: 95%;
	font-size: 2vmin;
	text-align: center;
	font-weight: bold;
	@media ${device.mobileL} {
		font-size: 3vmin;
	}
`;

export const DonutButton = styled.div`
	background-color: ${({ active, color }) => (active ? color : "transparent")};
	color: ${({ active, color }) => (active ? "white" : color)};
	border: 2px solid ${({ color }) => (color ? color : "white")};
	width: 95%;
	height: ${({ height }) => (height ? height : "#DADCE0")};
	max-height: 50%;
	font-size: 1.5vmin;
	text-align: center;
	font-weight: bold;
	border-radius: 5px;
	margin: 5px;
	padding: 5px 0;
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	@media ${device.mobileL} {
		font-size: 3vmin;
	}

	&:hover {
		background-color: ${({ color }) => (color ? color : "#DADCE0")};
		color: white;
	}
`;

export const Buttons = styled.div`
	display: flex;
	position: absolute;
	justify-content: center;
	transition: transform 0.6s ease;
	align-items: center;
	left: 50%;
	transform: translateX(${({ position }) => (position ? position : "-50%")});

	@media ${device.mobileL} {
		transform: translateX(-50%);
		justify-content: space-around;
		align-items: space-around;
		width: 100%;
	}
`;

export const ButtonsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	min-height: 4vmax;
	width: 90%;
	@media ${device.mobileL} {
		min-height: 7vmax;
	}
`;
