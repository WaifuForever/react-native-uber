import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectOrigin } from "../slices/navSlice";

const NavigateCard = () => {
  const origin = useSelector(selectOrigin);
  return (
    <View>
      <Text>Hey</Text>
    </View>
  );
};

export default NavigateCard;
