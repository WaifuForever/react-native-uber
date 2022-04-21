import { useNavigation } from "@react-navigation/native";
import { useReducer, useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "uber-X-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance.text}
        </Text>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 p-3 rounded-full`}
          onPress={() => {
            navigation.navigate("NavigateCard");
          }}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        style={tw`flex-1`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-10 ${
              item.id === selected?.id && "bg-gray-200"
            }`}
            onPress={() => {
              setSelected(item);
            }}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <View style={tw`-ml-6 mx-1`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{travelTimeInformation?.duration.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              US${" "}
              {(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  item.multiplier) /
                100
              ).toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
