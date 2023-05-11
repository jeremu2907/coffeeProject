import { ScrollView, useWindowDimensions } from 'react-native';
import React, { useState, useEffect} from 'react';
import DrinkItem from '../DrinkItem/DrinkItem';

export default function DrinkItemContainer(props) 
{
    const [items, setItems] = useState([]);
    const {height, width} = useWindowDimensions();

    const numTypetoString = (types) => 
    {
        const DrinkType = {
            "1" : "hot",
            "2" : "cold",
            "3" : "espresso",
            "4" : "milk",
            "5" : "filtered",
            "6" : "other"
        };

        for(i in types)
        {
            types[i] = DrinkType[types[i]];
        }
        return types.join(", ");
    };
    
    useEffect(() => 
    {
        console.log(props.url)
        fetch(props.url)
            .then(res => 
                {
                    return res.json();
                })
            .then(data => 
                {
                    setItems(data);
                })
            .then(console.log(items))
            .catch(err => {
                console.log(err);
            })
    },[]);

    return(
        <ScrollView
            contentContainerStyle={{
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                maxHeight: height / 3,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {items.map(item => {
                return(
                    <DrinkItem
                        key = {item._id}
                        drinkName = {item.name}
                        type = {numTypetoString(item.type)}
                        wtcRatio = {item.wtc_ratio}
                        mtcRatio = {(item.mtc_ratio)? item.mtc_ratio:"..."}
                    />
                )
            })}
        </ScrollView>
    )
}