import React from "react";
import styled from "styled-components";
import { device } from "../../abstracts/variables";
import iconSet from "../../selection.json";
import IcomoonReact, { iconList } from "icomoon-react";
import {
	faGraduationCap,
	faUniversity,
	faMicroscope,
	faSeedling,
	faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IncoButton = ({ color, name, active, onClick }) => {
	const icons = {
		"Instituições de Ensino Superior": "graduation",
		"Institutos de Pesquisa": "microscope",
		"Orgãos de fomento": "university",
		"Organizações da Sociedade Civil": "osc",
		"Entidades governamentais": "governamental",
	};

	return (
		<Container color={color} active={active}>
			<Button color={color} active={active} onClick={onClick}>
				<CircleButton color={color} active={active}>
					<Icon
						iconSet={iconSet}
						color={`${active ? color : "white"}`}
						icon={icons[name]}
					/>
				</CircleButton>
			</Button>
		</Container>
	);
};

export default IncoButton;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 3.5vmax;
	height: 3.5vmax;
	/* box-shadow: 0 2px 4px rgba(0,0,0,0.2), 0 -1px 0px r2ba(0,0,0,0.02);	
    border: 1px solid #DADCE0;
    border-radius: 3px; */
	cursor: pointer;

	@media ${device.mobileL} {
		width: 7vmax;
		height: 7vmax;
		border: 2px solid ${({ active, color }) => (active ? color : "none")};
		background-color: ${({ active, color }) => (active ? "white" : color)};
		border-radius: 50%;
	}
`;

const CircleButton = styled.div`
	width: 90%;
	height: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 2px solid ${({ active, color }) => (active ? "none" : "white")};
	border-radius: 50%;
	background-color: ${({ active, color }) => (active ? "white" : color)};

	@media ${device.mobileL} {
		border: none;
	}
`;

const Icon = styled(IcomoonReact)`
	height: 60%;
	width: 60%;
`;

const Button = styled.a`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border: 5px solid ${({ active }) => (active ? "white" : "transparent")};
	align-items: center;
	border-radius: 50%;
	background-color: ${({ active, color }) =>
		active ? "white" : "transparent"};
`;
