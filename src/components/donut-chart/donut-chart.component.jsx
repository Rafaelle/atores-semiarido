import React from "react";
import styled, { keyframes } from "styled-components";
import { device } from "../../abstracts/variables";

const DonutChart = ({ items, color, percentage, colorRing, name }) => {
	return (
		<SvgItem>
			<Donut width='100%' height='100%' viewBox='0 0 40 40'>
				<DonutRole
					cx='20'
					cy='20'
					r='15.91549430918954'
					fill='transparent'></DonutRole>
				<DonutRing
					cx='20'
					cy='20'
					r='15.91549430918954'
					colorRing={"gray"}
					fill='transparent'
					strokeWidth='.7'></DonutRing>
				<DonutSegment
					percentage={percentage}
					color={color}
					cx='20'
					cy='20'
					r='15.91549430918954'
					fill='transparent'
					strokeWidth='3'
					strokeLinecap='round'
					strokeDasharray={`${percentage} ${100 - percentage}`}
					strokeDashoffset='25'></DonutSegment>
				<DonutText color={color}>
					<text y='50%' transform='translate(0, 2)'>
						<DonutPercent
							x='50%'
							textAnchor='middle'
							className='donut-percent'>{`${items}`}</DonutPercent>
					</text>
					<text y='60%' transform='translate(0, 2)'>
						<DonutData
							x='50%'
							textAnchor='middle'
							className='donut-data'>{`${name}`}</DonutData>
					</text>
				</DonutText>
			</Donut>
		</SvgItem>
	);
};

export default DonutChart;

const SvgItem = styled.div`
	width: 20vmin;
	font-size: 20px;
	margin: 0 auto;
	animation: donutfade 0.6s;
	@media ${device.mobileL} {
		width: 25vmin;
	}
`;

const Donut = styled.svg``;

const DonutRole = styled.circle``;
const DonutRing = styled.circle`
	stroke: ${({ colorRing }) => (colorRing ? colorRing : null)};
`;

const DonutSegment = styled.circle`
	transform-origin: center;
	stroke: ${({ color }) => (color ? color : null)};
	animation: ${({ percentage }) => (percentage ? donut(percentage) : null)} 1s
		ease;
`;

const DonutText = styled.g`
	font-family: Arial, Helvetica, sans-serif;
	fill: ${({ color }) => (color ? color : null)};
`;

const DonutData = styled.tspan`
	font-size: 0.2em;
	line-height: 1;
	transform: translateY(0.5em);
	text-align: center;
	text-anchor: middle;
	color: var(--text-secondary);
	fill: var(--text-secondary);
	animation: donutfadelong 1s;

	@keyframes donutfadelong {
		100% {
			opacity: 0;
		}
		0% {
			opacity: 1;
		}
	}
`;
const donut = percentage => keyframes`
  0% {
    stroke-dasharray: 0, 100;
  }
  100% {
    stroke-dasharray: ${percentage}, ${100 - percentage}};
  }
`;

const DonutPercent = styled.tspan`
	font-size: 0.5em;
	line-height: 1;
	transform: translateY(0.5em);
	font-weight: bold;
`;
