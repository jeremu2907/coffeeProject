import { StackActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";

export default function PopScreenBtn()
{
    const navigation = useNavigation();
    const popAction = StackActions.pop(1);

    return(
        <TouchableOpacity 
            style={{
                marginRight: 15
            }}
            onPress={() => navigation.dispatch(popAction)}
        >
            <Text 
                style={{
                    color: "#FF8A00",
                    fontSize: 32,
                    margin: 0,
                    padding: 0,
                    textAlign: "center",
                    fontWeight: "bold"
                }}>
                    {/* &lt; */}
                    ‹
                </Text>
        </TouchableOpacity>
    )
}