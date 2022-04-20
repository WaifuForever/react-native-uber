import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { setDestination } from "../slices/navSlice";

import { GOOGLE_MAPS_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-4 text-xl`}>Good Morning, Jojo</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            styles={{
              container: { backgroundColor: "white", paddingTop: 20, flex: 0 },
              textInput: tw`bg-gray-100 rounded-none text-lg`,
              textInputContainer: tw`px-5 pb-0`,
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            minLength={2}
            query={{
              key: GOOGLE_MAPS_KEY,
              language: "en",
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            returnKey={"search"}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
        </View>
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;
