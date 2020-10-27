import React from "react";
import { Marker, Popup } from "react-leaflet";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { divIcon } from "leaflet";
import styled from "styled-components";
import L from "leaflet";

const PopUpMarker = ({ content, position, color }) => (
	<Marker position={position} icon={customMarkerIcon(color)} fillColor={color}>
		<Popup>
			<PopUpContainer>
				<Name style={{ color: `${color}`, borderLeft: `4px solid ${color}` }}>
					{content.nome}
				</Name>
				{content.campus.length > 1 ? (
					<SubItem>{`CAMPUS: ${content.campus} - ${content.estado}`}</SubItem>
				) : (
					<SubItem>{`${content.cidade} - ${content.estado}`}</SubItem>
				)}
				<SubItem>{"TELEFONE: " + content.telefone}</SubItem>
				<Buttons>
					<Button
						style={{ backgroundColor: `${color}` }}
						target='_blank'
						href={`mailto:${content.email}`}>
						<FontAwesomeIcon
							style={{ color: `${"white"}` }}
							className='icon'
							icon={faEnvelope}
						/>
						Email
					</Button>
					{content.site ? (
						<Button
							style={{ backgroundColor: `${color}` }}
							target='_blank'
							href={content.site}>
							<FontAwesomeIcon
								style={{ color: `white` }}
								className='icon'
								icon={faGlobe}
							/>
							Site
						</Button>
					) : null}
				</Buttons>
			</PopUpContainer>
		</Popup>
	</Marker>
);

export default PopUpMarker;

const PopUpContainer = styled.div`
	display: flex;
	flex-direction: column;
	font-family: "Lato", sans-serif;
`;
const Name = styled.span`
	font-size: 14px;
	font-weight: bold;
	padding: 5px;
`;
const SubItem = styled.span`
	font-size: 12px;
	color: #7a8a97;
	border-left: 4px solid #7a8a97;
	padding: 10px 0px 0px 10px;
`;
const Buttons = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 10px;
`;

const Button = styled.a`
	overflow: hidden;
	color: white !important;
	background-color: white;
	text-decoration: none;
	outline: none;
	border-radius: 100px;
	text-align: center;
	width: 65px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 0.9em;
	font-weight: bold;
	float: center;
	padding: 5px 10px;
	margin: 5px;
	&:hover,
	&:focus {
		.icon {
		}
	}
`;

const customMarkerIcon = color => {
	return divIcon({
		html: `<svg xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    version="1.1" x="0px" y="0px" viewBox="0 0 100 100"
	 enable-background="new 0 0 100 100" 
	 xml:space="preserve">
		
        <g>
			<g>
				<circle fill="#ffffff" cx="50" cy="35" r="15"/>
                <path fill="${color}" d="M63.257,25.493c-7.324-7.324-19.189-7.324-26.513,0c-7.325,7.32-7.325,19.197,0,26.514c0,0,13.248,12.992,13.248,27.993    
                c0-15.001,13.265-27.993,13.265-27.993C70.581,44.69,70.581,32.813,63.257,25.493z M49.992,46.262c-4.137,0-7.492-3.355-7.492-7.5    
                c-0.001-4.146,3.354-7.5,7.493-7.5c4.152,0,7.506,3.354,7.506,7.5C57.499,42.907,54.146,46.262,49.992,46.262z"/>
			</g>
        </g>
</svg>`,
		className: "marker-icon-custom",
		iconSize: L.point(40, 40, true),
	});
};
