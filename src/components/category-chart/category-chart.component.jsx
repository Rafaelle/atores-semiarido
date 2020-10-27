import React from "react";
import IconButton from "../icon-button/icon-butom.component";
import Donut from "../donut-chart/donut-chart.component";

import {
	ButtonsContainer,
	Buttons,
	DonutButton,
	DonutTitle,
	DonutItem,
	DonutButtons,
	DonutsContainer,
	ContainerChart,
} from "./category-chart.styles";

const positions = ["-10%", "-30%", "-50%", "-70%", "-90%"];

class CategoryChart extends React.Component {
	constructor() {
		super();
		this.state = {
			currentSubcategoryIndex: null,
			currentSubcategory: {},
		};
	}

	onClickCategory = () => {
		this.setState({
			currentSubcategoryIndex: null,
			currentSubcategory: {},
		});
	};

	render() {
		const {
			onClickCategoryButtom,
			onClickSubcategoryButtom,
			items,
			donutData,
			currentCategory,
			currentCategoryIndex,
			collapseCategory,
		} = this.props;
		const { currentSubcategoryIndex, currentSubcategory } = this.state;
		return (
			<ContainerChart>
				<ButtonsContainer>
					<Buttons
						position={
							currentCategoryIndex > 0
								? positions[currentCategoryIndex - 1]
								: "-50%"
						}>
						{items.children.map((ele, index) => {
							return (
								<IconButton
									onClick={() => {
										onClickCategoryButtom(ele, index + 1);
										this.onClickCategory();
									}}
									key={index}
									active={ele.name === currentCategory.name}
									color={ele.color}
									name={ele.shortName}></IconButton>
							);
						})}
					</Buttons>
				</ButtonsContainer>

				{currentCategory.children && currentCategory.children.length > 0 ? (
					<DonutsContainer
						position={`${20 * currentCategoryIndex - 10}%`}
						color={currentCategory.color}
						collapse={collapseCategory}>
						<DonutItem>
							<DonutTitle color={currentCategory.color}>
								{currentCategory.shortName}
							</DonutTitle>
							<Donut
								items={donutData.items}
								color={donutData.color || "#000"}
								name={donutData.name.split(" ")[0]}
								percentage={donutData.percent}></Donut>
							<DonutTitle color={currentCategory.color}>
								{currentSubcategory.shortName || ""}
							</DonutTitle>
						</DonutItem>
						<DonutButtons>
							{currentCategory.children.map((ele, index) => {
								return (
									<DonutButton
										key={index}
										active={currentSubcategoryIndex === index}
										height={`${100 / currentCategory.children.length}%`}
										onClick={() => {
											onClickSubcategoryButtom(ele);
											this.setState({
												currentSubcategoryIndex: index,
												currentSubcategory: ele,
											});
										}}
										color={ele.color}>
										{ele.name}
									</DonutButton>
								);
							})}
						</DonutButtons>
					</DonutsContainer>
				) : null}
			</ContainerChart>
		);
	}
}

export default CategoryChart;
