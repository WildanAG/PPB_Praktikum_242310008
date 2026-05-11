import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { styles } from "../styles/StyleApps";
import SearchBar from "./SearchBar";

const Header = () => {
     const [showSearch, setShowSearch] = useState(false);
    return (
        <View>
            <View style={styles.h_container}>
                <View>
                    <Text style={styles.sub_title}>Good Morning🌤</Text>
                    <Text style={styles.title}>Discover Books</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity style={[styles.btn_icon, styles.shadow]} onPress={() => setShowSearch(!showSearch)}>
                        <Ionicons name="search-outline" size={24} color="gray" />
                    </TouchableOpacity>                
                    <TouchableOpacity style={styles.btn_icon}>
                        <Ionicons name="notifications-outline" size={24} color="gray" />                    
                    </TouchableOpacity>
                </View>           
            </View>
            {showSearch && <SearchBar />}
        </View>
    );
};

export default Header;
