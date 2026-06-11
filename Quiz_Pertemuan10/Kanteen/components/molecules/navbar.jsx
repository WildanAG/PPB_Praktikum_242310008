import React from 'react';
import { View } from 'react-native-web';
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoCartSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
    return (
        <View className="bg-pink-400 justify-around items-center h-16 flex-row">
            <SiHomeassistantcommunitystore className="text-white text-2xl" />
            <IoCartSharp className="text-white text-2xl" />
            <FaHistory className="text-white text-2xl" />
            <CgProfile className="text-white text-2xl" />
        </View>
    );
}

export default Navbar;




