import { StackActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";

export default function EditItemBtn()
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
            <Text>edit</Text>
        </TouchableOpacity>
    )
}