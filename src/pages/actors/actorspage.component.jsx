import React from "react";
import styled from "styled-components";
import { device } from "../../abstracts/variables";
import Map from "../../components/map/map.component";
import { dataActors } from "./actors-data";
import { pathAPI } from "../../resources/resources";
import CategoryChart from "../../components/category-chart/category-chart.component";
import Footer from "../../components/footer/footer.component";
import SearchBox from "../../components/search/search.component";
import Legend from "../../components/legend/legend.component";
import HideButton from "../../components/hide-button/hide-button.component";

class ActorsPage extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			markers: [],
			allMarkers: [],
			collapseCategory: false,
			currentCategory: {
				name: "",
			},
			currentCategoryIndex: 0,
			donutData: {
				percent: 0,
				items: 0,
				name: "-",
			},
		};
	}

	componentDidMount() {
		dataActors.children.map((ele, i) => {
			fetch(`${pathAPI}/actors?categoria=${ele.name}`)
				.then(res => res.json())
				.then(d => {
					const { data } = this.state;
					const objData = { ...data };
					objData[ele.name] = d.data.actors.filter(ele => ele.latitude !== "0");
					this.setState({ data: objData });
					const { allMarkers } = this.state;
					const newMarkers = [
						...allMarkers,
						...this.createMarkersByCategory(ele.name, ele.color),
					];
					this.setState({ allMarkers: newMarkers });
					this.setState({ markers: newMarkers });
				});
		});
	}

	onClickCategoryButtom = (d, index) => {
		const { allMarkers, currentCategory } = this.state;

		if (d === currentCategory) {
			this.setState({ currentCategory: { color: "#7a8a97" } });
			this.setState({ currentCategoryIndex: 0 });
			this.setState({ markers: allMarkers });
		} else {
			this.setState({ currentCategory: d, currentCategoryIndex: index });
			const curretMarkers = allMarkers.filter(
				e => e.category.toLowerCase() === d.name.toLowerCase(),
			);
			this.setState({
				markers: curretMarkers,
			});

			this.setState({
				collapseCategory: false,
			});

			this.setState({
				donutData: {
					percent: 100,
					items: curretMarkers.length,
					name: d.shortName,
					color: d.color,
				},
			});
		}
	};

	onClickSubcategoryButtom = d => {
		const { allMarkers, currentCategory, data } = this.state;
		const curretMarkers = allMarkers.filter(e =>
			e.subcategory
				? e.category.toLowerCase() === currentCategory.name.toLowerCase() &&
				  e.subcategory.toLowerCase() === d.id.toLowerCase()
				: false,
		);
		this.setState({
			markers: curretMarkers,
		});

		const items = curretMarkers.length;
		const totalItems = data[currentCategory.name]
			? data[currentCategory.name].length
			: 0;
		this.setState({
			donutData: {
				percent: (100 * items) / totalItems,
				items: curretMarkers.length,
				name: d.shortName,
				color: currentCategory.color,
			},
		});
	};

	createMarkersByCategory = (categoria, color) => {
		const { data } = this.state;
		return data[categoria]
			? data[categoria].reduce((acc, ele, index) => {
					const marker = {};
					if (ele.latitude) {
						marker.key = ele.id;
						marker.position = [
							Number(ele.latitude.replace(",", ".")),
							Number(ele.longitude.replace(",", ".")),
						];
						marker.content = {
							nome: ele.nome,
							campus: ele.campus,
							telefone: ele.telefone,
							email: ele.email,
							site: ele.site,
							cidade: ele.cidade,
							estado: ele.estado,
						};
						marker.category = ele.categoria;
						marker.subcategory = ele.subcategoria;
						marker.color = color;
						return [...acc, marker];
					} else return acc;
			  }, [])
			: [];
	};

	onSearchChange = event => {
		this.setState({ serachField: event.target.value });
		this.setState({ currentCategory: { color: "#7a8a97" } });
		this.setState({ currentCategoryIndex: 0 });

		const { allMarkers } = this.state;

		if (event.target.value.length > 1) {
			this.setState({
				markers: allMarkers.filter(item => {
					const textSearch =
						item.content.nome +
						" " +
						item.content.campus +
						" " +
						item.content.cidade +
						" " +
						item.content.estado;
					return textSearch
						.toUpperCase()
						.normalize("NFD")
						.includes(
							event.target.value
								.toUpperCase()
								.normalize("NFD")
								.trim(),
						);
				}),
			});
		} else this.setState({ markers: allMarkers });
	};
	setCollapseCategory() {
		const { collapseCategory } = this.state;
		this.setState({ collapseCategory: !collapseCategory });
	}

	render() {
		const {
			markers,
			currentCategory,
			currentCategoryIndex,
			donutData,
			collapseCategory,
		} = this.state;
		return (
			<ActorpageContainer>
				<SideNavBar color={currentCategory.color}>
					<HideButton
						active={currentCategoryIndex > 0}
						collapse={collapseCategory}
						color={currentCategory.color}
						onClick={() => this.setCollapseCategory()}></HideButton>
					<DescriptionWrap>
						{/* <img className='logo' src={logo} alt="logo"></img> */}
						<DescriptionTextWrap>
							<DescriptionTitle>{"ATORES DO SEMIÁRIDO"}</DescriptionTitle>
							<Description>
								Instituições que contribuem de diferentes maneiras para o
								desenvolvimento do Semiárido
							</Description>
						</DescriptionTextWrap>
					</DescriptionWrap>
					<SearchBox onSearchChange={this.onSearchChange}></SearchBox>
					<CategoryChart
						items={dataActors}
						onClickCategoryButtom={this.onClickCategoryButtom}
						onClickSubcategoryButtom={this.onClickSubcategoryButtom}
						donutData={donutData}
						currentCategoryIndex={currentCategoryIndex}
						collapseCategory={collapseCategory}
						currentCategory={currentCategory}></CategoryChart>
					<LegendContainer>
						{dataActors.children.map((ele, i) => {
							return (
								<Legend key={i} color={ele.color} name={ele.shortName}></Legend>
							);
						})}
					</LegendContainer>

					<Footer color={currentCategory.color || "#7a8a97"}></Footer>
				</SideNavBar>
				<Map markers={markers}></Map>
			</ActorpageContainer>
		);
	}
}

export default ActorsPage;

const ActorpageContainer = styled.div`
	width: 100%;
	height: 100%;
`;

const SideNavBar = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
	align-items: center;
	width: 35vw;
	max-width: 700px;
	height: 100%;
	overflow: hidden;
	position: absolute;
	bottom: 0;
	right: 0;
	z-index: 10;
	background-color: ${({ color }) => (color ? color : "#778d9b")};
	transition: background-color 0.6s ease-in-out;

	@media ${device.mobileL} {
		padding-top: 10px;
		height: auto;
		width: calc(100vw - 20px);
		background-color: white;
		border-radius: 10px;
		bottom: 10px;
		right: 50%;
		/* border: 3px solid ${({ color }) => (color ? color : "#778d9b")}; */
		transform: translateX(50%);
	}
`;

const DescriptionTitle = styled.p`
	font-family: "Lato", sans-serif;
	font-weight: 400;
	letter-spacing: 0.5rem;
	color: white;
	font-size: 30px;
	text-align: center;
	margin: 10px;
	width: 80%;
`;
const Description = styled.p`
	font-family: "Lato", sans-serif;
	font-weight: 700;
	font-style: italic;
	color: white;
	font-size: 15px;
	text-align: center;
	margin: 10px;
	width: 80%;
`;

const DescriptionWrap = styled.h1`
	display: flex;
	justify-content: space-around;
	/* background-color: white; */
	align-items: center;
	width: 90%;
	@media ${device.mobileL} {
		display: none;
	}
`;

const DescriptionTextWrap = styled.h1`
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* background-color: white; */
	align-items: center;
	width: 100%;
`;

export const LegendContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	position: fixed;
	bottom: 20px;
	border-radius: 10px;
	right: calc(35vw + 10px);
	padding: 1px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 -1px 0px rgba(0, 0, 0, 0.02);
	border: 1px solid #dadce0;
	background-color: #f4f4f4;
	@media ${device.mobileL} {
		display: none;
	}
`;
