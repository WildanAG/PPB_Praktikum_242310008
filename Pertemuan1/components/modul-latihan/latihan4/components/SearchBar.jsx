import { View, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { color_list, styles } from "../styles/StyleApps";

const SearchBar = () => {
    return (
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <TextInput 
                placeholder="Search Book...."
                placeholderTextColor="gray"
                style={{ flex: 1, paddingVertical: 10 }}
            />
            <TouchableOpacity>
                <Ionicons name="search-outline" size={20} color={color_list.green}/>
            </TouchableOpacity>
        </View>
    );
}
export default SearchBar;
