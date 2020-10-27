import React from "react";
import styled from "styled-components";
import { device } from "../../abstracts/variables";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HideButton = ({ active, collapse, color, onClick }) => {
	return active ? (
		<Button
			active={active}
			collapse={collapse}
			color={color}
			onClick={() => onClick()}>
			<FontAwesomeIcon
				style={{
					color: `${color}`,
					height: "80%",
					width: "80%",
				}}
				icon={faChevronDown}
			/>
		</Button>
	) : null;
};

export default HideButton;

const Button = styled.a`
	display: none;
	height: 4vmax;
	width: 4vmax;
	justify-content: center;
	align-items: center;
	/* background-color: ${({ color }) => (color ? color : "white")}; */
	border-radius: 50%;
	transition: all 0.6s ease;
	transform: 
		rotate(${({ collapse }) => (collapse ? "180deg" : "0deg")});
	@media ${device.mobileL} {
		display: flex;
	}
`;
