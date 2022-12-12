import { IFPSAgeSliderWPProps } from "./FPSAgeTypes";


export function createAgeSliderWPProps( ageSliderWP: IFPSAgeSliderWPProps ) : IFPSAgeSliderWPProps {

  const AgeSliderWPProps: IFPSAgeSliderWPProps = {
    FPSAgeIsVisible: ageSliderWP.FPSAgeIsVisible,
    FPSAgeColumnName: ageSliderWP.FPSAgeColumnName,
    FPSAgeColumnTitle: ageSliderWP.FPSAgeColumnTitle,
    FPSAgeDefault: ageSliderWP.FPSAgeDefault, //Should be index of AgeSliderOption
  }

  return AgeSliderWPProps;

}