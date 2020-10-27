import React, { Component, Fragment } from "react";
import { Map, TileLayer } from "react-leaflet";
import TopoJSON from "./topojson";
import topoJsonData from "./semiarido.json";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import styled from "styled-components";
import { device } from "../../abstracts/variables";
import { withRouter } from "react-router-dom";
import L from "leaflet";
import "./map.styles.scss";
import MyPopupMarker from "../popup-marker/popup-marker.component";

class MapMark extends Component {
	constructor() {
		super();
		this.state = {
			bounds: null,
		};
	}
	iconCreateFunction(cluster) {
		return L.divIcon({
			html: svg(cluster.getAllChildMarkers(), cluster),
			className: "marker-cluster-custom",
			iconSize: L.point(
				35 * (1 + cluster.getChildCount() * 0.01),
				35 * (1 + cluster.getChildCount() * 0.01),
				true,
			),
		});
	}
	getBounds(markers) {
		const arrLat = markers.map(ele => ele.position[0]);
		const arrLon = markers.map(ele => ele.position[1]);
		let corner1 = L.latLng(Math.max(...arrLat), Math.min(...arrLon));
		let corner2 = L.latLng(Math.min(...arrLat), Math.max(...arrLon));
		return L.latLngBounds(corner1, corner2);
	}
	render() {
		const { markers } = this.props;
		return (
			<LeafletContainer
				center={[-10.2756537, -42.6561154]}
				zoom={5.5}
				zoomSnap={0.1}
				minZoom={5}
				viewport={{}}
				animate={true}
				boundsOptions={{ padding: [50, 50] }}
				bounds={markers.length > 0 ? this.getBounds(markers) : null}
				easeLinearity={0.6}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
				/>
				<TopoJSON data={topoJsonData} />
				<MarkerClusterGroup
					showCoverageOnHover={true}
					spiderfyDistanceMultiplier={2}
					iconCreateFunction={this.iconCreateFunction}>
					<MyMarkersList markers={markers} />
				</MarkerClusterGroup>
			</LeafletContainer>
		);
	}
}

export default withRouter(MapMark);

const LeafletContainer = styled(Map)`
	width: 65vw;
	height: 100vh;
	z-index: 2;
	@media ${device.mobileL} {
		width: 100vw;

		& .leaflet-control-container {
			display: none;
		}
	}
`;

const MyMarkersList = ({ markers }) => {
	const items = markers.map(({ key, ...props }) => (
		<MyPopupMarker key={key} {...props} />
	));
	return <Fragment>{items}</Fragment>;
};

const svg = (markers, cluster) => {
	const markersByColors = {};
	markers.map(ele =>
		markersByColors[ele.options.fillColor]
			? (markersByColors[ele.options.fillColor] = [
					...markersByColors[ele.options.fillColor],
					ele,
			  ])
			: (markersByColors[ele.options.fillColor] = [ele]),
	);

	const propsByColor = {};
	const colorKeys = Object.keys(markersByColors);

	colorKeys.map((ele, i) => {
		const items = markersByColors[ele].length;
		const totalItems = markers.length;
		const percent = (items, toalItems) => (100 * items) / toalItems;
		return (propsByColor[ele] = {
			stroke: ele,
			strokeDasharray: [
				percent(items, totalItems),
				100 - percent(items, totalItems),
			],
			strokeDashoffset:
				i === 0
					? 25
					: 100 -
					  propsByColor[colorKeys[i - 1]].strokeDasharray[0] +
					  propsByColor[colorKeys[i - 1]].strokeDashoffset,
		});
	});

	const circles = Object.keys(propsByColor).reduce((acc, ele) => {
		return (
			acc +
			`<circle class="donut-segment" 
							  cx="21" cy="21" 
							  r="15.91549430918954" 
							  fill="transparent" 
							  stroke="${ele}" 
							  stroke-width="3" 
							  stroke-dasharray="${propsByColor[ele].strokeDasharray[0]} ${
				propsByColor[ele].strokeDasharray[1]
			}" 
							  stroke-dashoffset="${propsByColor[ele].strokeDashoffset % 100}">
					  </circle>
		`
		);
	}, "");

	return `<svg width="100%" height="100%" viewBox="0 0 42 42" class="donut">
	<circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff" opacity="1"></circle>
	<circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="3"></circle>
	${circles}
	<g>
		<text y="60%" transform="translate(0, 0)">
			<tspan x="50%" textAnchor="middle" style="
			font-size: 1em;
			line-height: 1;
			transform: translateY(0.5em);
			text-align: center;
			text-anchor: middle;">${cluster.getChildCount()}</tspan>   
		</text>
	</g>
  </svg>`;
};
