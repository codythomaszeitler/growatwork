import "react-native";
import "jest-enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";

export function configureEnzyme() {
  Enzyme.configure({ adapter: new Adapter() });
}
