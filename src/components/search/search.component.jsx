import React from "react";
import styled from "styled-components";
import { device } from "../../abstracts/variables";

const SearchBox = ({ searchResults, onSearchChange, onSearchResultClick }) => (
	<Container>
		<Input
			type='search'
			placeholder='Buscar instituições'
			onChange={onSearchChange}
		/>
		{/* <SearchResult>
                {searchResults.map(item => (
                <SearchItem key={item.id} onClick={()=>onSearchResultClick(item)}>{item.NOME}</SearchItem>
                ))}
            </SearchResult> */}
	</Container>
);

export default SearchBox;

const Input = styled.input`
	-webkit-appearance: none;
	border: none;
	outline: none;
	padding: 10px 20px;
	background-color: #ffffff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 -1px 0px rgba(0, 0, 0, 0.02);
	border: 1px solid #dadce0;
	border-radius: 100px;
	line-height: 2.5vmin;
	color: gray;
	margin-bottom: 10px;
	font-size: 1.7vmin;
	width: 100%;

	/* &[type=search] {
    width: 130px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
  } */

	&[type="search"]:focus {
		border: 2px solid #dadce0;
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 90%;
	@media ${device.mobileL} {
		display: none;
	}
`;
const SearchResult = styled.ul`
	background-color: white;
`;

const SearchItem = styled.ul`
	width: 90%;
`;
