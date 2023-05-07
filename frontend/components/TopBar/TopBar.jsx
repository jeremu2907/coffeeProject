import { SearchBar } from "react-native-elements";
import { StyleSheet } from 'react-native';
import React, {useState} from 'react';

export default function TopBar()
{
    const [search, setSearch] = useState("");

    const updateSearch = (search) => 
    {
        setSearch(search);
    }

    return(
        <SearchBar
            placeholder="Searching For a Drink?"
            onChangeText={updateSearch}
            value={search}
            platform="default"
            clearIcon={false}
            containerStyle={[SearchBoxContainer.container, SearchBoxContainer.shadowProp]}
            inputContainerStyle={SearchBoxContainer.boxStyle}
            inputStyle={SearchBoxContainer.textStyle}
        />
    )
}

const SearchBoxContainer = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,0,0,0)",
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        padding: 0,
        margin: 0
    },
    boxStyle: {
        backgroundColor: "#272727",
        borderRadius: 15,
        margin: 0
    },
    shadowProp: {
        shadowOffset: {width: 0,height: 6},
        shadowOpacity: 0.5,
        shadowColor: "#000000",
        shadowRadius: 8
    },
    textStyle: {
        color: "#ffffff"
    }
});