import { SearchBar } from "react-native-elements";
import { StyleSheet, View, Image } from 'react-native';
import React, {useState} from 'react';

export default function TopBar()
{
    const [search, setSearch] = useState("");

    const updateSearch = (search) => 
    {
        setSearch(search);
    }

    return(
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
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
            <View style={SearchBoxContainer.shadowProp}>
                <Image
                    source={require('../../assets/pfp.jpeg')}
                    style={SearchBoxContainer.pfp}
                />
            </View>
        </View>
    )
}

const SearchBoxContainer = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0)",
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        padding: 0,
        margin: 0
    },
    boxStyle: {
        backgroundColor: "#272727",
        height: 40,
        borderRadius: 15,
    },
    shadowProp: {
        shadowOffset: {width: 0,height: 6},
        shadowOpacity: 0.4,
        shadowColor: "#000000",
        shadowRadius: 15
    },
    textStyle: {
        color: "#ffffff"
    },
    pfp: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "white",
        marginLeft: 10
    }
});