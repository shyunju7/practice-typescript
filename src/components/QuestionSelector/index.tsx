import * as React from "react";
import * as S from "./style";
import { questions } from "../../data/questionList";
import { questionTypes } from "../../data/questionTypes";
import { MdSubject } from "@react-icons/all-files/md/MdSubject";
import { MdShortText } from "@react-icons/all-files/md/MdShortText";
import { MdCheckBox } from "@react-icons/all-files/md/MdCheckBox";
import { MdRadioButtonChecked } from "@react-icons/all-files/md/MdRadioButtonChecked";
import { MdArrowDropDownCircle } from "@react-icons/all-files/md/MdArrowDropDownCircle";
import { MdArrowDropDown } from "@react-icons/all-files/md/MdArrowDropDown";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
interface QuestionSelectorProps {
  handleUpdateQuestionType: (value: string) => void;
  questionType: string;
}

const icons = [
  <MdShortText size="20" />,
  <MdSubject size="16" />,
  <MdRadioButtonChecked size="16" />,
  <MdCheckBox size="18" />,
  <MdArrowDropDownCircle size="18" />,
];

const QuestionSelector = ({
  handleUpdateQuestionType,
  questionType,
}: QuestionSelectorProps) => {
  const [currentValue, setCurrentValue] = React.useState(
    questionTypes[questionType]
  );
  const [showOptions, setShowOptions] = React.useState(false);
  const handleOnChangeSelectValue = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const value = target.getAttribute("value");
    const type = target.getAttribute("type");
    if (!value || !type) return;
    setCurrentValue(value || "");
    handleUpdateQuestionType(type || "");
  };

  const handleMakeIcon = () => {
    const selectedType = questions.find((item) => item.qType === questionType);
    if (selectedType) {
      return selectedType.id - 1;
    }

    return 0;
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <S.SelectBox onClick={() => setShowOptions((prev) => !prev)}>
        <div className="label_wrapper">
          <span className="label_wrapper">
            {icons[handleMakeIcon()]}
            <label>{currentValue}</label>
          </span>
          <MdArrowDropDown size="20" />
        </div>
        <S.SelectOptions $show={showOptions ? "true" : "false"}>
          {questions.map((data, index) => (
            <S.Option
              key={data.qType}
              $type={data.qType}
              value={data.name}
              onClick={handleOnChangeSelectValue}
              $current={currentValue === data.name ? "current" : ""}
            >
              {icons[index]} {data.name}
            </S.Option>
          ))}
        </S.SelectOptions>
      </S.SelectBox>
    </StyleSheetManager>
  );
};

export default QuestionSelector;
